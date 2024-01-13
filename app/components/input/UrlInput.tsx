type Props = {
  isLoading: boolean;
};
export const UrlInput = ({ isLoading }: Props) => {
  return (
    <input
      type="url"
      name="url"
      className="border-4 border-white rounded-3xl px-3 text-black max-w-xl w-full h-12 shadow-xl"
      placeholder="https://youtu.be/dQw4w9WgXcQ"
      required
      disabled={isLoading}
    />
  );
};
