import React from 'react';
import {Button, Form} from "antd";
import TextArea from "antd/es/input/TextArea";

const Editor = ({onChange, onSubmit, submitting, value}) => (
	<>
		<Form.Item>
			<TextArea rows={4} onChange={onChange} value={value}/>
		</Form.Item>
		<Form.Item>
			<Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
				Add Comment
			</Button>
		</Form.Item>
	</>
);

export default Editor;