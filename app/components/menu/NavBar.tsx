import { MenuItem } from "./MenuItem";

export const NavBar = () => {
    return (
        <nav>
            <ul className="flex h-14 flex-row items-center justify-start gap-2 bg-stone-900 px-8 text-white">
                <MenuItem to="/">Clip a link</MenuItem>
                <MenuItem to="/receive">Receive a clip</MenuItem>
            </ul>
        </nav>
    );
};
