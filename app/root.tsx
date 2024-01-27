import type { LinksFunction } from "@remix-run/node";
import { Links, LiveReload, Meta, type MetaFunction, Outlet, Scripts, ScrollRestoration } from "@remix-run/react";

import stylesheet from "~/tailwind.css";
import { NavBar } from "./components/menu/NavBar";
import { Footer } from "./components/footer/Footer";
import { cn } from "./utils/cn";

export const links: LinksFunction = () => [{ rel: "stylesheet", href: stylesheet }];

export const meta: MetaFunction = () => {
    return [
        { title: "Interclip" },
        {
            property: "og:title",
            content: "Interclip",
        },
        {
            name: "description",
            content: "Interclip is a simple, secure and private URL sharing service.",
        },
        // todo: add these once deployed
        // {
        //     property: "og:image",
        //     content: "https://interclip.app/header.png",
        // },
    ];
};

export default function App() {
    return (
        <html lang="en">
            <head>
                <title>Interclip</title>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <Meta />
                <Links />
            </head>
            <body className={cn("flex min-h-screen flex-col bg-iclip-blue text-white dark:bg-stone-700")}>
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
