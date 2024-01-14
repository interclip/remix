type Props = {
    isLoading: boolean;
};
export const CodeInput = ({ isLoading }: Props) => {
    return (
        <input
            type="text"
            name="code"
            pattern="[a-zA-Z0-9]{5}"
            className="border-4 border-white rounded px-3 text-black text-5xl max-w-xl w-56 text-center h-16 shadow-xl"
            placeholder="*****"
            required
            disabled={isLoading}
        />
    );
};
