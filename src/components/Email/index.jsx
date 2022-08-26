import React from 'react';
import styles from "./index.module.less";
import {Button, Col, Form, Input, Row} from "antd";
import {useSendMailMutation} from "../../api/api";

function Email(props) {
    const [form] = Form.useForm();
    const [sendEmail] = useSendMailMutation()
    const onFinish = (value) => {
        const {address} = value
        sendEmail({
            to: address,
            subject: "Welcome",
            content: "Welcome to DEV@Deakin"
        })
    }
    return (
        <Form form={form} name="email" onFinish={onFinish} className={styles.email}>
            <Row>
                <Col span={12} style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                    <label>SIGN UP FOR OUR DAILY INSIDER</label>
                </Col>
                <Col span={8} style={{display: "flex", alignItems: "center", width: "100%"}}>
                    <Form.Item style={{width: "100%"}} name="address" rules={[{type: 'email'}]}>
                        <Input className placeholder="Enter your email"/>
                    </Form.Item>
                </Col>
                <Col span={4} style={{display: "flex", alignItems: "center", paddingLeft: 8}}>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" size="small">
                            Subscribe
                        </Button>
                    </Form.Item>
                </Col>
            </Row>


        </Form>
    );
}

export default Email;