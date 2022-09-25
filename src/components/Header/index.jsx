import React from 'react';
import {Menu} from "antd";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {selectCurrentHeader, selectMenus, setCurrent} from "../../store/headerSlice";



function Header(props) {
	const current = useSelector(selectCurrentHeader)
	const menus = useSelector(selectMenus)
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const handleClick = e => {
		dispatch(setCurrent({current: e.key}))
		let menu = menus[parseInt(e.key)]
		if (menu === "home") {
			return navigate("/")
		}
		navigate(`/${menu}`)
	};
	const items = menus.map((value, index) => ({label: value[0].toUpperCase() + value.slice(1), key: index}))
	return (
		<Menu mode="horizontal" selectedKeys={[current]} onClick={handleClick} items={items}></Menu>
	);
}

export default Header;