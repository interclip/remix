import { LoaderFunctionArgs, type ActionFunctionArgs } from "@remix-run/node";
import { useLoaderData, useParams } from "@remix-run/react";

export const getClip = async (code: string): Promise<string | null> => {
  const endpoint = new URL("https://server.interclip.app/api/get");
  endpoint.searchParams.set("code", code);

  const response = await fetch(endpoint, {
    method: "GET",
  });
  if (!response.ok) {
    switch (response.status) {
      case 404:
        return null;
      case 403:
        throw new Error("Invalid code");
      default:
        throw new Error(response.statusText);
    }
  }
  const data = await response.json();

  return data.result;
};

export async function loader({ request, params }: LoaderFunctionArgs) {
  return await getClip(params.code!);
}

export default function Index() {
  const url = useLoaderData<typeof loader>();
  const { code } = useParams();

  return (
    <div className="flex flex-col space-y-2 align-center justify-center items-center">
      {url ? (
        <>
          <span className="text-4xl">{code}</span>
          <span>
            is <a href={url}>{url}</a>
          </span>
        </>
      ) : (
        <>
          <span className="text-4xl">{code}</span>
          <span>Was not found. It may have expired</span>
        </>
      )}
    </div>
  );
}
