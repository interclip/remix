import type { LinksFunction } from "@remix-run/node";
import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

import stylesheet from "~/tailwind.css";
import { MenuItem } from "./components/menu/MenuItem";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
];

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="bg-iclip-blue dark:bg-stone-700 text-white flex flex-col min-h-screen">
        <header>
          <nav className="">
            <ul className="h-14 flex flex-row items-center px-8 bg-stone-900 text-white justify-start gap-2">
              <MenuItem to="/">
                Clip a link
              </MenuItem>
              <MenuItem to="/receive">
                Receive a clip
              </MenuItem>
            </ul>
          </nav>
        </header>
        <main className="flex-grow flex justify-center items-center px-2">
          <Outlet />
        </main>
        <footer className="flex justify-center items-center text-sm text-center py-4">
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
