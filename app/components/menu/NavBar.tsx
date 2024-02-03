import { MenuItem } from "./MenuItem";
import interclipLogo from "~/assets/logo.png";

export const NavBar = () => {
    return (
        <nav>
            <ul className="flex h-14 flex-row items-center justify-start gap-4 bg-stone-900 px-8 text-white">
                <MenuItem to="/" className="hidden sm:block">
                    <img src={interclipLogo} alt="" className="mr-4 aspect-square size-10 object-contain" />
                </MenuItem>
                <MenuItem to="/">Clip a Link</MenuItem>
                <MenuItem to="/file">Send a File</MenuItem>
                <MenuItem to="/receive">Receive a Clip</MenuItem>
            </ul>
        </nav>
    );
};
