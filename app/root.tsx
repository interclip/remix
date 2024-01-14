import type { LinksFunction } from "@remix-run/node";
import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration } from "@remix-run/react";

import stylesheet from "~/tailwind.css";
import { NavBar } from "./components/menu/NavBar";
import { Footer } from "./components/footer/Footer";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone-esm";
import { cn } from "./utils/cn";

export const links: LinksFunction = () => [{ rel: "stylesheet", href: stylesheet }];

export default function App() {
    const onDrop = useCallback((acceptedFiles: File[]) => {
        console.log(acceptedFiles.length);
    }, []);
    const { getRootProps, isDragActive } = useDropzone({ onDrop });

    return (
        <html lang="en">
            <head>
                <title>Interclip</title>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <Meta />
                <Links />
            </head>
            <body
                className={cn(
                    "flex min-h-screen flex-col bg-iclip-blue text-white dark:bg-stone-700",
                    isDragActive && "border-4 border-dashed",
                )}
                {...getRootProps()}
            >
                <header>
                    <NavBar />
                </header>
                <main className="flex flex-grow items-center justify-center px-2">
                    <Outlet />
                </main>
                <Footer />
                <ScrollRestoration />
                <Scripts />
                <LiveReload />
            </body>
        </html>
    );
}
