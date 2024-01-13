import { ActionFunctionArgs, redirect } from "@remix-run/node";
import { Form, useNavigation } from "@remix-run/react";
import { CodeInput } from "~/components/input/CodeInput";

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const code = formData.get("code")?.toString();

  if (!code) {
    throw new Error("Code is required");
  }

  return redirect(`/clip/${code}`);
}

export default function Index() {
  const navigation = useNavigation();

  const isSubmitting = navigation.state === "submitting";
  return (
    <Form method="post" className="flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold my-2">Paste your code here</h1>
      <p className="text-sm mb-8">
        Input the 5 character code of a clip you want to receive.
      </p>
      <CodeInput isLoading={isSubmitting} />
    </Form>
  );
}
