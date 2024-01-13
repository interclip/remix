import { redirect, type ActionFunctionArgs } from "@remix-run/node";
import { Form, useNavigation } from "@remix-run/react";

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
  const clipCode = await createClip(url!);

  return redirect(`/new/${clipCode}`);
}

export default function Index() {
  const navigation = useNavigation();

  const isSubmitting = navigation.state === "submitting";
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <h1>Interclip</h1>
      <Form method="post">
        <input type="url" name="url" />
        <button type="submit">
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </Form>
    </div>
  );
}
