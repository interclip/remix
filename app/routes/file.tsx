import { useCallback, useMemo, useState } from "react";
import { useDropzone } from "react-dropzone-esm";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "~/components/ui/Dialog";
import { UploadFileError, createClip, uploadFile } from "~/utils/api";
import { cn } from "~/utils/cn";
import type { ProgressEvent } from "~/utils/api";
import { formatBytes, formatPercent } from "~/utils/formatters";
import { redirect, useFetcher } from "@remix-run/react";
import type { ActionFunctionArgs } from "@remix-run/node";
import { Button } from "~/components/ui/Button";

export async function action({ request }: ActionFunctionArgs) {
    const formData = await request.formData();
    const url = formData.get("url")?.toString();
    if (!url) {
        throw new Error("URL is required");
    }

    return redirect(`/clip/${await createClip(url)}`);
}

export default function Index() {
    const clip = useFetcher();

    // we'd like to reset the controller after a reset because if we don't, subsequent uploads will fail
    const [resetAbortController, setResetAbortController] = useState(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const abortController = useMemo(() => new AbortController(), [resetAbortController]);
    const abort = useCallback(() => abortController.abort(), [abortController]);

    const onProgress = useCallback((progress: ProgressEvent) => {
        setDialogOpen(true);
        switch (progress.stage) {
            case "start":
                setDialogTitle("Uploading file");
                setDialogMessage("Starting upload...");
                break;
            case "progress":
                setDialogTitle("Uploading file");
                setDialogMessage(
                    `Uploading file... ${progress.progress ? `${formatPercent(progress.progress)}%` : ""}`,
                );
                break;
            case "end":
                setDialogMessage("Creating clip...");
        }
    }, []);

    const onDrop = useCallback(
        (acceptedFiles: File[]) => {
            void (async () => {
                if (acceptedFiles.length !== 1) {
                    setDialogTitle("There is an issue with your file");
                    setDialogMessage(
                        "You can only send one file at a time. To upload multiple files at once, you can zip them up locally.",
                    );
                    setDialogOpen(true);
                    return;
                }

                const file = acceptedFiles[0];

                const maxFileSize = 1024 * 1024 * 1024; // 1GB
                if (file.size > maxFileSize) {
                    setDialogTitle("There is an issue with your file");
                    setDialogMessage(
                        `The file you are trying to send is too large. The maximum file size is ${formatBytes(maxFileSize)}.`,
                    );
                    setDialogOpen(true);
                    return;
                }

                setIsLoading(true);

                const fileUrl = await uploadFile({ file, onProgress, abortSignal: abortController.signal }).catch(
                    (e) => {
                        setDialogTitle("There was an issue with uploading your file");
                        if (e instanceof UploadFileError) {
                            setDialogMessage(e.message);
                        } else if (e.name === "AbortError") {
                            setDialogOpen(false);
                        } else {
                            setDialogMessage("An unknown error occurred while uploading the file.");
                        }
                        setDialogOpen(true);
                    },
                );

                // no-op. This was a deliberate abort.
                if (!fileUrl) {
                    setResetAbortController((prev) => !prev);
                    setIsLoading(false);
                    setDialogOpen(false);
                    return;
                }

                // Create the clip and redirect to it.
                const formData = new FormData();
                formData.append("url", fileUrl);
                clip.submit(formData, { method: "post" });
            })();
        },
        [abortController.signal, clip, onProgress, setResetAbortController],
    );

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

    const [isLoading, setIsLoading] = useState(false);

    const [errorDialogOpen, setDialogOpen] = useState(false);
    const [dialogTitle, setDialogTitle] = useState("");
    const [dialogMessage, setDialogMessage] = useState("");

    return (
        <div className="w-full max-w-xl text-center">
            <h1 className="my-2 text-4xl font-bold">Send a file</h1>
            <p className="mb-8 text-sm">Input the 5 character code of a clip you want to receive.</p>
            <div
                {...getRootProps()}
                className={cn(
                    "flex h-64 w-full flex-col items-center justify-center border-2 border-dashed border-white",
                    isDragActive && "opacity-50",
                )}
            >
                <input {...getInputProps()} />
                <span>Drag a file here or click to select</span>
            </div>

            <Dialog open={errorDialogOpen} onOpenChange={!isLoading ? setDialogOpen : abort}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{dialogTitle}</DialogTitle>
                        <DialogDescription>{dialogMessage}</DialogDescription>
                        <Button onClick={abort}>Cancel</Button>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    );
}
