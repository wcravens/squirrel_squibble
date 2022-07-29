import { slide as Menu } from 'react-burger-menu';
import './Sidebar.css'

const Sidebar = (props) => {
    if (props.isEditor) {
        return (
            <Menu right noOverlay pageWrapId={"page-wrapper"} outerContainerId={"outer-container"}>
                {
                    props.groups.map((group, key) => (
                        <a className="menu-item" href={"#" + group.id}>
                            {group.Title != "" ? group.Title : "No Title"}
                        </a>
                    ))
                }
            </Menu>
        );
    }
    else {
        return (
            <Menu right noOverlay pageWrapId={"page-wrapper"} outerContainerId={"outer-container"}>
                {
                    props.groups.map((group, key) => (
                        <a className="menu-item" href={"#" + group}>
                            {group != "InScope" ? group : "In-Scope"}
                        </a>
                    ))
                }
            </Menu>
        );
    }
};

export default Sidebar