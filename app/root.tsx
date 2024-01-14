import type { LinksFunction } from "@remix-run/node";
import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration } from "@remix-run/react";

import stylesheet from "~/tailwind.css";
import { MenuItem } from "./components/menu/MenuItem";

export const links: LinksFunction = () => [{ rel: "stylesheet", href: stylesheet }];

export default function App() {
    return (
        <html lang="en">
            <head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <Meta />
                <Links />
            </head>
            <body className="flex min-h-screen flex-col bg-iclip-blue text-white dark:bg-stone-700">
                <header>
                    <nav className="">
                        <ul className="flex h-14 flex-row items-center justify-start gap-2 bg-stone-900 px-8 text-white">
                            <MenuItem to="/">Clip a link</MenuItem>
                            <MenuItem to="/receive">Receive a clip</MenuItem>
                        </ul>
                    </nav>
                </header>
                <main className="flex flex-grow items-center justify-center px-2">
                    <Outlet />
                </main>
                <footer className="flex items-center justify-center py-4 text-center text-sm">
                    <p>
                        Made with ❤️ by{" "}
                        <a
                            href="https://github.com/filiptronicek"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline"
                        >
                            Filip
                        </a>
                    </p>
                </footer>
                <ScrollRestoration />
                <Scripts />
                <LiveReload />
            </body>
        </html>
    );
}
