import { Link } from "@remix-run/react";

export const Footer = () => {
    return (
        <footer className="flex items-center justify-center py-4 text-center text-sm">
            <Link to={"/about"}>About</Link>
            {/* <span className="mx-2">•</span>
            <Link to={"/privacy-policy"}>Privacy Policy</Link> */}
        </footer>
    );
};
