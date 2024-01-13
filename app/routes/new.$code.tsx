import { LoaderFunctionArgs, type ActionFunctionArgs } from "@remix-run/node";
import { useLoaderData, useParams } from "@remix-run/react";

export const getClip = async (code: string): Promise<string> => {
  const endpoint = new URL("https://server.interclip.app/api/get");
  endpoint.searchParams.set("code", code);

  const response = await fetch(endpoint, {
    method: "GET",
  });
  if (!response.ok) {
    throw new Error(response.statusText);
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
    <div className="flex flex-col space-y-2">
      <span>{code}</span>
      <span>is</span>
      <a href={url}>{url}</a>
    </div>
  );
}
