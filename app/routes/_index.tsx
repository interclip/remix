import { redirect, type ActionFunctionArgs } from "@remix-run/node";
import { Form, useNavigation } from "@remix-run/react";
import { UrlInput } from "~/components/input/UrlInput";

const createClip = async (url: string): Promise<string> => {
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
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  const data = await response.json();

  return data.result;
};

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const url = formData.get("url")?.toString();

  if (!url) {
    throw new Error("URL is required");
  }

  const clipCode = await createClip(url);

  return redirect(`/clip/${clipCode}`);
}

export default function Index() {
  const navigation = useNavigation();

  const isSubmitting = navigation.state === "submitting";
  return (
    <Form method="post">
      <h1 className="text-5xl font-bold my-4">Paste your link here!</h1>
      <UrlInput isLoading={isSubmitting} />
    </Form>
  );
}
