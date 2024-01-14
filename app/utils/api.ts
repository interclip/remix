type GenericApiResponse = {
    status: "success" | "error";
    result: string;
};

/**
 * Creates a clip from a given URL.
 * @returns The code of the created clip.
 */
export const createClip = async (url: string): Promise<string> => {
    const endpoint = "https://server.interclip.app/api/set";
    const response = await fetch(endpoint, {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        },
        body: new URLSearchParams({
            url: url,
        }).toString(),
    });

    const data: GenericApiResponse = await response.json();
    if (!response.ok) {
        throw new Error(data.result);
    }

    return data.result;
};

/**
 * Queries the server for a clip.
 * @param code The code of the clip to get.
 * @returns The URL of the clip, or null if the clip was not found.
 */
export const getClip = async (code: string): Promise<string | null> => {
    const endpoint = new URL("https://server.interclip.app/api/get");
    endpoint.searchParams.set("code", code.toLowerCase());

    const response = await fetch(endpoint, {
        method: "GET",
    });

    const data: GenericApiResponse = await response.json();
    if (!response.ok) {
        switch (response.status) {
            case 404:
                return null;
            default:
                throw new Error(data.result);
        }
    }

    return data.result;
};

type UploadFileResponse = {
    url: string;
    fields: Record<string, string>;
};

export type ProgressEvent = {
    stage: "start" | "progress" | "end";
    progress: number | null;
};

export class UploadFileError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "UploadFileError";
    }
}

/**
 * Uploads a file to Interclip files by first getting a presigned S3 URL and then using it to perform a multipart upload.
 * @param file The file to upload.
 * @returns a URL of the uploaded file. If a user aborts the request, null is returned.
 */
export const uploadFile = async (file: File, onProgress: (progress: ProgressEvent) => void): Promise<string | null> => {
    onProgress({ stage: "start", progress: 0 });

    const urlToFetch = new URL("https://iclip.vercel.app");
    urlToFetch.pathname = "api/uploadFile";
    urlToFetch.searchParams.set("name", file.name);
    urlToFetch.searchParams.set("type", file.type);
    urlToFetch.searchParams.set("size", file.size.toString());

    const controller = new AbortController();
    const { signal } = controller;

    const uploadUrlResponse = await fetch(urlToFetch, { signal });

    // Upload the file to the presigned URL
    if (!uploadUrlResponse.ok) {
        const data: GenericApiResponse = await uploadUrlResponse.json();
        switch (uploadUrlResponse.status) {
            case 404:
                throw new UploadFileError("API Endpoint not found");
            case 413:
                throw new UploadFileError(data.result);
            case 500:
                throw new UploadFileError("The server failed to initiate the upload. Please try again later");
            case 503:
                throw new UploadFileError(data.result);
        }

        throw new UploadFileError(await uploadUrlResponse.text());
    }

    onProgress({ progress: 0, stage: "progress" });

    const { url, fields }: UploadFileResponse = await uploadUrlResponse.json();
    const formData = new FormData();

    Object.entries({ ...fields, file }).forEach(([key, value]) => {
        formData.append(key, value);
    });

    const uploadRequest = new XMLHttpRequest();

    uploadRequest.upload.onprogress = (event) => {
        onProgress({ progress: event.loaded / event.total, stage: "progress" });
    };

    uploadRequest.open("POST", url);
    uploadRequest.send(formData);

    return new Promise((resolve, reject) => {
        controller.signal.addEventListener("abort", () => {
            reject("Upload aborted");
        });
        uploadRequest.addEventListener("load", () => {
            const { status } = uploadRequest;
            if (status >= 400) {
                reject(new UploadFileError(uploadRequest.responseText));
            } else {
                onProgress({ stage: "end", progress: 1 });
                return resolve(`https://files.interclip.app/${fields.key}`);
            }
        });

        uploadRequest.onerror = () => {
            reject(new UploadFileError(`Upload failed (${uploadRequest.statusText})`));
        };

        uploadRequest.onabort = () => {
            return null;
        };
    });
};
