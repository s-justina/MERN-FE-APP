import {MainHeader} from "./MainHeader";
import {Link} from "react-router-dom";
import {SideDrawer} from "./SideDrawer";
import {NavLinks} from "./NavLinks";
import "./MainNavigation.css"
import {useState} from "react";
import Backdrop from "../UIElements/Backdrop";

export const MainNavigation = () => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false)

    const openDrawerHandler = () => setIsDrawerOpen(true)


    const closeDrawerHandler = () => setIsDrawerOpen(false)

    return (
        <>
            {isDrawerOpen && <Backdrop onClick={closeDrawerHandler}/>}
            <SideDrawer show={isDrawerOpen} onClick={closeDrawerHandler}>
                <nav className="main-navigation__drawer-nav">
                    <NavLinks/>
                </nav>
            </SideDrawer>
            <MainHeader>
                <button className="main-navigation__menu-btn" onClick={openDrawerHandler}>
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
                <h2 className="main-navigation__title">
                    <Link to="/">Your places</Link>
                </h2>
                <nav className="main-navigation__header-nav">
                    <NavLinks/>
                </nav>
            </MainHeader>
        </>)
}