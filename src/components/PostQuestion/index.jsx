import React from 'react';
import {Button, Form, Input, Select} from "antd";
import TextArea from "antd/es/input/TextArea";
import {useAddPostMutation} from "../../api/api";
import {useSelector} from "react-redux";
import {selectCurrentUser} from "../../store/authSlice";
import {useNavigate} from "react-router-dom";

function Question() {
	const [addPost,{isSuccess}] = useAddPostMutation()
	const user = useSelector(selectCurrentUser)
	const navigate = useNavigate()
	const handleSubmit = (values) => {
		addPost({...values, user})
	}
	if (isSuccess) {
		navigate("/findQuestion")
	}
	return (
		<Form
			style={{marginTop: 20}}
			onFinish={handleSubmit}
			name="question"
		>
			<Form.Item
				label="Title"
				name="title"
				rules={[{
					required: true
				}]}
			>
				<Input placeholder="Start your question with how, what, why, etc."/>
			</Form.Item>
			<Form.Item>
				Describe your problem
				<Form.Item
					name="problem"
					rules={[{
						required: true
					}]}
				>
					<TextArea rows={10}/>
				</Form.Item>
			</Form.Item>
			<Form.Item
				label="Tags"
				name="tags"
				rules={[
					({getFieldValue}) => ({
						validator(_, value) {
							if (!value || getFieldValue('tags').length > 2) {
								return Promise.resolve();
							}
							return Promise.reject(new Error('You must to enter at least three tags.'));
						},
					}),
				]}
			>
				<Select
					mode="tags"
					style={{width: '100%'}}
					placeholder="Please add up to 3 tags to describe what your question is about e.g.,Java"
					open={false}
				>
				</Select>
			</Form.Item>
			<Form.Item style={{display: "flex", justifyContent: "flex-end"}}>
				<Button style={{background: "gray", width: 100}} htmlType="submit">Post</Button>
			</Form.Item>
		</Form>
	);
}

export default Question;