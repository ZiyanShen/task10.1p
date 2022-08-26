import React from 'react';
import {Button, Form, Input} from "antd";
import TextArea from "antd/es/input/TextArea";

function Question(props) {
    return (
        <Form style={{marginTop: 20}}>
            <Form.Item
                label="Title"
            >
                <Input placeHolder="Start your question with how, what, why, etc."/>
            </Form.Item>
            <Form.Item>
                Describe your problem
                <TextArea rows={10}/>
            </Form.Item>
            <Form.Item label="Tags">
                <Input placeHolder="Please add up to 3 tags to describe what your question is about e.g.,Java"/>
            </Form.Item>
            <Form.Item style={{display:"flex",justifyContent:"flex-end"}}>
                <Button style={{background:"gray",width:100}}>Post</Button>
            </Form.Item>
        </Form>
    );
}

export default Question;