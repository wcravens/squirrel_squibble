import { slide as Menu } from 'react-burger-menu';
import './Sidebar.css'

const Sidebar = (groups) => {
    return (
        <Menu right noOverlay pageWrapId={"page-wrapper"} outerContainerId={"outer-container"}>
            {
                groups.groups.map((group, key) => (
                    <a className="menu-item" href={"#" + group.Title}>
                        {group.Title}
                    </a>
                ))
            }
        </Menu>
    );
};

export default Sidebar