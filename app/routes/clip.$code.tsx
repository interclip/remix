import { type LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData, useParams } from "@remix-run/react";
import { getClip } from "~/utils/api";

export async function loader({ params }: LoaderFunctionArgs) {
  if (!params.code) {
    throw new Error("Code is required");
  }

  return await getClip(params.code);
}

export default function Index() {
  const url = useLoaderData<typeof loader>();
  const { code } = useParams();

  return (
    <div className="flex flex-col space-y-2 align-center justify-center items-center">
      {url ? (
        <>
          <span className="text-4xl font-mono">{code}</span>
          <span>
            is <a href={url}>{url}</a>
          </span>
        </>
      ) : (
        <>
          <span className="text-4xl font-mono">{code}</span>
          <span>was not found. It may have expired</span>
        </>
      )}
    </div>
  );
}
