import {useRef} from "react";
import ReactDOM from "react-dom";
import {CSSTransition} from "react-transition-group"
import "./SideDrawer.css";

export const SideDrawer = props => {
    const ref = useRef(null)

    const content = (
        <CSSTransition
            nodeRef={ref}
            in={props.show}
            timeout={200}
            classNames="slide-in-left"
            mountOnEnter
            unmountOnExit
        >
            <aside className="side-drawer" onClick={props.onClick}>{props.children}</aside>
        </CSSTransition>
    )

    return ReactDOM.createPortal(content, document.getElementById("drawer-hook"))
}