import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export type PropsWithClassName<Props = unknown> = {
    className?: string;
} & Props;

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}
