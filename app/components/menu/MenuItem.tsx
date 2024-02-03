import { Link } from "@remix-run/react";
import { type PropsWithChildren } from "react";

type Props = {
    to: string;
    className?: string;
};
export const MenuItem = ({ children, className, ...props }: PropsWithChildren<Props>) => (
    <li className={className}>
        <Link className="font-bold hover:underline" prefetch="intent" {...props}>
            {children}
        </Link>
    </li>
);
