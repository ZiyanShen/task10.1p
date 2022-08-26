import React from 'react';
import {Button, Form, Input} from "antd";
import TextArea from "antd/es/input/TextArea";

function Article(props) {
    return (
        <Form style={{marginTop: 20}}>
            <Form.Item
                label="Title"
            >
                <Input placeHolder="Enter a descriptive title"/>
            </Form.Item>
            <Form.Item>
                Abstract
                <TextArea rows={4} placeHolder="Enter a 1-paragraph abstract"/>
            </Form.Item>
            <Form.Item>
                Article Text
                <TextArea rows={10} placeHolder="Enter a 1-paragraph abstract"/>
            </Form.Item>
            <Form.Item label="Tags">
                <Input placeHolder="Please add up to 3 tags to describe what your question is about e.g.,Java"/>
            </Form.Item>
            <Form.Item style={{display: "flex", justifyContent: "flex-end"}}>
                <Button style={{background: "gray", width: 100}}>Post</Button>
            </Form.Item>
        </Form>
    );
}

export default Article;