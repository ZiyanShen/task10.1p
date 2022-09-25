import React, {useState} from 'react';
import CommentList from "./CommentList";
import {Avatar, Comment} from "antd";
import Editor from "./Editor";
import moment from "moment";

function MyComment({postId}) {
	const [comments, setComments] = useState([]);
	const [value, setValue] = useState('');
	const [submitting, setSubmitting] = useState(false);
	// submit comments
	const handleSubmit = () => {
		if (!value) return;
		setSubmitting(true);
		setTimeout(() => {
			setSubmitting(false);
			setValue('');
			setComments([
				...comments,
				{
					author: 'Han Solo',
					avatar: 'https://joeschmoe.io/api/v1/random',
					content: <p>{value}</p>,
					datetime: moment(new Date()).fromNow(),
				},
			]);
		}, 1000);
	};
	const handleChange = (e) => {
		setValue(e.target.value);
	};

	return (
		<>
			{comments.length > 0 && <CommentList comments={comments}/>}
			<Comment
				avatar={<Avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo"/>}
				content={
					<Editor
						onChange={handleChange}
						onSubmit={handleSubmit}
						submitting={submitting}
						value={value}
					/>
				}
			/>
		</>
	);
}

export default MyComment;