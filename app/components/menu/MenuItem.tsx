import { Link } from "@remix-run/react";
import { type PropsWithChildren } from "react";

type Props = {
    to: string;
};
export const MenuItem = ({ children, ...props }: PropsWithChildren<Props>) => (
    <li>
        <Link className="p-4 font-bold hover:underline" {...props}>
            {children}
        </Link>
    </li>
);
