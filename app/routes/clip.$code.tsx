import { json, type LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData, useParams } from "@remix-run/react";
import { getClip } from "~/utils/api";

export async function loader({ params }: LoaderFunctionArgs) {
    if (!params.code) {
        throw new Error("Code is required");
    }
    const url = await getClip(params.code);

    return json({ url }, { headers: { "Cache-Control": "s-maxage=3600" }, status: url ? 200 : 404 });
}

export default function Index() {
    const { code } = useParams();
    const { url } = useLoaderData<typeof loader>();

    return (
        <div className="align-center flex flex-col items-center justify-center space-y-2">
            {url ? (
                <>
                    <span>The code</span>
                    <span className="font-mono text-4xl">{code}</span>
                    <span>is</span>
                    <a href={url} className="max-w-[90vw] truncate text-lg underline md:max-w-lg">
                        {url}
                    </a>
                </>
            ) : (
                <>
                    <span>The code</span>
                    <span className="font-mono text-4xl">{code}</span>
                    <span>was not found. It may have expired</span>
                </>
            )}
        </div>
    );
}
