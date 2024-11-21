import {Link} from "react-router-dom";
import {FC} from "react";

type NavItemProps = {
    url: string;
    text: string;
}

const NavItem:FC<NavItemProps> = ({url, text}) => {
    return (
        <li className={"text-2xl font-black ml-6 underline"}>
            <Link to={url}>{text}</Link>
        </li>
    );
}

const Header = () => {
    return (
        <>
            <nav className={`w-screen h-10 inline-block border-b-2 mb-4`}>
                <ul className={"flex"}>
                    <NavItem url={"/"} text={"Home"}/>
                    <NavItem url={"/users"} text={"Users"}/>
                    <NavItem url={"/favorite-users"} text={"Favorite users"}/>
                </ul>
            </nav>
        </>
    );
};

export default Header;