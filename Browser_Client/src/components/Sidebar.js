import { slide as Menu } from 'react-burger-menu';
import './Sidebar.css'

const Sidebar = (props) => {
    if (props.isEditor) {
        return (
            <Menu right noOverlay pageWrapId={"page-wrapper"} outerContainerId={"outer-container"}>
                <a className="menu-item" href={"#" + 'business-context'}>
                    <b>Business Context</b>
                </a>
                {
                    props.groups.map((group, key) => (
                        <a className="menu-item" href={"#" + group}>
                            {group != "InScope" ? props.proper[group] : "In-Scope"}
                        </a>
                    ))
                }
                <br /><br /><br />
                <a className="menu-item" href={"#" + 'decision-factors'}>
                    <b>Scope Groups</b>
                </a>
                {
                    props.titles.map((group, key) => (
                        <a className="menu-item" href={"#" + group.id}>
                            {group.InScope.Title != "" ? group.InScope.Title : "No Title"}
                        </a>
                    ))
                }
            </Menu>
        );
    }
    else {
        return (
            <Menu right noOverlay pageWrapId={"page-wrapper"} outerContainerId={"outer-container"}>
                <a className="menu-item" href={"#" + 'business-context'}>
                    <b>Business Context</b>
                </a>
                {
                    props.groups.map((group, key) => (
                        <a className="menu-item" href={"#" + group}>
                            {group != "InScope" ? props.proper[group] : "In-Scope"}
                        </a>
                    ))
                }
                <br /><br /><br />
                <a className="menu-item" href={"#" + 'decision-factors'}>
                    <b>Decision Factors</b>
                </a>
                {
                    props.decisions.map((group, key) => (
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