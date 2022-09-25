import React, {useState} from 'react';
import {Button, Form, Input, Select, Upload} from "antd";
import TextArea from "antd/es/input/TextArea";
import {InboxOutlined} from "@ant-design/icons";
import {FirebaseImages} from "../../api/firebaseStorage";
import {useAddPostMutation} from "../../api/api";
import {useSelector} from "react-redux";
import {selectCurrentUser} from "../../store/authSlice";
import {useNavigate} from "react-router-dom";

function Article(props) {
	const [form] = Form.useForm()
	const [addPost,{isSuccess}] = useAddPostMutation()
	const navigate = useNavigate()
	const user = useSelector(selectCurrentUser)
	const handleSubmit = (values) => {
		addPost({...values, user})
	}
	if (isSuccess){
		navigate("/findQuestion")
	}
	return (
		<Form
			form={form}
			style={{marginTop: 20}}
			onFinish={handleSubmit}
			labelCol={{span: 3}}
		>
			<Form.Item
				label="Title"
				name="title"
				rules={[{
					required: true
				}]}
			>
				<Input placeholder="Enter a descriptive title"/>
			</Form.Item>
			<Form.Item
				label="Add an image"
			>
				<Form.Item
					name="images"
					valuePropName="fileList"
					getValueFromEvent={(e) => e.fileList}
					noStyle
				>
					<Upload.Dragger
						name="files"
						listType="picture"
						customRequest={async ({file, onSuccess}) => {
							const res = await FirebaseImages.uploadImages({filename: file.uid, data: file})
							onSuccess(res)
						}}
					>
						<p className="ant-upload-drag-icon">
							<InboxOutlined/>
						</p>
						<p className="ant-upload-text">Click or drag file to this area to upload</p>
						<p className="ant-upload-hint">Support for a single or bulk upload.</p>
					</Upload.Dragger>
				</Form.Item>
			</Form.Item>
			<Form.Item
				name="abstract"
				label="Abstract"
				rules={[{
					required: true
				}]}
			>
				<TextArea rows={4} placeholder="Enter a 1-paragraph abstract"/>
			</Form.Item>
			<Form.Item
				name="content"
				label="Article Text"
				rules={[{
					required: true
				}]}
			>
				<TextArea rows={10} placeholder="Enter a 1-paragraph abstract"/>
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

export default Article;