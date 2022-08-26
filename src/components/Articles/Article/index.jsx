import React from 'react';
import styles from "./index.module.less";
import {Card, Col, Row} from "antd";
import MyImage from "../../MyImage";

function Article({article}) {
    return (
        <Col className={styles.col} sm={24} md={12} xl={8}>
            <Card
                hoverable={true}
                // loading={true}
                cover={
                    <MyImage
                        style={{
                            height: 250,
                            width: "100%"
                        }}
                        src={article.download_url}
                    />
                }
            >
                <div>
                    <div className={styles.title}>#{article.id}</div>
                    <div className={styles.description}>This is the photo description. This is the photo description.
                    </div>
                    <div className={styles.info}>
                        <Row>
                            <Col span={8}><img src="/images/star.svg"
                                               alt=""/> {Math.round((Math.random() * 4 + 1) * 10) / 10}</Col>
                            <Col span={16}>{article.author}</Col>
                        </Row>
                    </div>
                </div>
            </Card>
        </Col>
    );
}

export default Article;