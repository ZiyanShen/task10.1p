import React from 'react';
import {Menu} from "antd";
import {useNavigate} from "react-router-dom";

const menus = ["home", "about", "work", "contact"]

function Header(props) {
    const [current, setCurrent] = React.useState("0");
    const navigate = useNavigate()
    const handleClick = e => {
        setCurrent(e.key);
        let menu = menus[parseInt(e.key)]
        if (menu === "home"){
            menu = ""
        }
        navigate(`/${menu}`)
    };
    const items = menus.map((value, index) => ({label: value[0].toUpperCase() + value.slice(1), key: index}))
    return (
        <Menu mode="horizontal" selectedKeys={[current]} onClick={handleClick} items={items}></Menu>
    );
}

export default Header;