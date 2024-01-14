import { redirect, type ActionFunctionArgs } from "@remix-run/node";
import { Form, useNavigation } from "@remix-run/react";
import { UrlInput } from "~/components/input/UrlInput";
import { createClip } from "~/utils/api";

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
        <section className="flex h-full w-full flex-grow items-center justify-center">
            <Form method="post" className="">
                <h1 className="my-4 text-5xl font-bold">Paste your link here!</h1>
                <UrlInput isLoading={isSubmitting} />
            </Form>
        </section>
    );
}
