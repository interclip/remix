import { MenuItem } from "./MenuItem";
import interclipLogo from "~/assets/logo.png";

export const NavBar = () => {
    return (
        <nav>
            <ul className="flex h-14 flex-row items-center justify-start gap-2 bg-stone-900 px-8 text-white">
                <MenuItem to="/">
                    <img src={interclipLogo} alt="iclip logo" className="mr-4 size-10" />
                </MenuItem>
                <MenuItem to="/">Clip a link</MenuItem>
                <MenuItem to="/receive">Receive a clip</MenuItem>
            </ul>
        </nav>
    );
};
