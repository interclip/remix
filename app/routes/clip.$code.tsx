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
    <div className="flex flex-col space-y-2 align-center justify-center items-center">
      {url ? (
        <>
          <span>The code</span>
          <span className="text-4xl font-mono">{code}</span>
          <span>
            is
          </span>
          <a href={url} className="max-w-[90vw] underline text-lg md:max-w-lg truncate">{url}</a>
        </>
      ) : (
        <>
          <span>The code</span>
          <span className="text-4xl font-mono">{code}</span>
          <span>was not found. It may have expired</span>
        </>
      )}
    </div>
  );
}
