import React from 'react';
import styles from "./index.module.less"
import {Button, Input} from "antd";
import {SearchOutlined} from "@ant-design/icons"
import {useNavigate} from "react-router-dom";

function SearchBar(props) {
	const navigate = useNavigate()
	const handlePost = () => {
		navigate("/post")
	}
	const handleLogin = () => {
        navigate("/login")
	}
	return (
		<div className={styles.searchBar}>
			<div>DEV@DEKIN</div>
			<Input size="middle" prefix={<SearchOutlined/>}/>
			<Button size="small" onClick={handlePost}>Post</Button>
			<Button size="small" onClick={handleLogin}>Login</Button>
		</div>
	);
}

export default SearchBar;