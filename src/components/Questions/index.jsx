import React, {useEffect} from 'react';
import {selectPostsQuery, useGetPostMutation} from "../../api/api";
import {Col, Row} from "antd";
import SearchBar from "../SearchBar";
import Filter from "./Filter";
import Question from "./Question";
import {useSelector} from "react-redux";
import {selectPosts} from "../../store/postSlice";


function Questions() {
	const [getPost] = useGetPostMutation()
	const questions = useSelector(selectPosts)
	useEffect(() => {
		getPost()
	}, [])
	return (
		<>
			<SearchBar/>
			<Row
				style={{paddingTop: 12}}
			>
				<Col span={18} key="1">
					{questions ? questions.map(question => {
						return <Question {...question} key={question.postId}/>
					}) : ""}
				</Col>
				<Col span={6} key="2">
					<Filter/>
				</Col>
			</Row>
		</>

	);
}

export default Questions;