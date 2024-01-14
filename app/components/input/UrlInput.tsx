import { useId } from "react";

type Props = {
    isLoading: boolean;
};
export const UrlInput = ({ isLoading }: Props) => {
    const id = useId();

    return (
        <>
            <label htmlFor={id} className="sr-only">
                The URL you would like to create a clip for.
            </label>

            <input
                type="url"
                name="url"
                id={id}
                className="h-12 w-full max-w-xl rounded-3xl border-4 border-white px-3 text-black shadow-xl"
                placeholder="https://youtu.be/dQw4w9WgXcQ"
                required
                disabled={isLoading}
            />
        </>
    );
};
