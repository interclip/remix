import { json, redirect, type LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getClip, InputValidationError } from "~/utils/api";

export async function loader({ params }: LoaderFunctionArgs) {
    if (!params.code) {
        throw new Error("Code is required");
    }

    try {
        const url = await getClip(params.code);
        if (!url) {
            return json({ error: "Clip not found", status: 404 });
        }

        return redirect(url);
    } catch (e) {
        if (e instanceof InputValidationError) {
            throw new Response(null, {
                status: 404,
                statusText: "Not Found",
            });
        }

        throw e;
    }
}

export default function ClipRedirect() {
    const loaderData = useLoaderData<typeof loader>();

    return <section className="flex h-full w-full flex-grow items-center justify-center">{loaderData.error}</section>;
}
