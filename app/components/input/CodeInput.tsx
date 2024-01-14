type Props = {
    isLoading: boolean;
};
export const CodeInput = ({ isLoading }: Props) => {
    return (
        <input
            type="text"
            name="code"
            pattern="[a-zA-Z0-9]{5}"
            className="h-16 w-56 max-w-xl rounded border-4 border-white px-3 text-center text-5xl text-black shadow-xl"
            placeholder="*****"
            required
            disabled={isLoading}
        />
    );
};
