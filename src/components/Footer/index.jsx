import React, {Fragment} from 'react';
import styles from "./index.module.less";
import {Col, Row} from "antd";

function Footer(props) {

    return (
        <>
            <Row>
                <Col className={styles.col} sm={24} md={8}>
                    <ul className={styles.ul}>
                        <div>Explore
                        </div>
                        <div><a href="/">Home</a>
                        </div>
                        <div><a href="/">Questions</a>
                        </div>
                        <div><a href="/">Articles</a>
                        </div>
                        <div><a href="/">Tutorials</a>
                        </div>


                    </ul>
                </Col>
                <Col className={styles.col} sm={24} md={8}>
                    <ul className={styles.ul}>
                        <div>Support
                        </div>
                        <div><a href="/">Help</a>
                        </div>
                        <div><a href="/">Contact Us</a>
                        </div>

                    </ul>
                </Col>
                <Col className={styles.col} sm={24} md={8}>
                    <ul className={styles.ul}>
                        <li>Stay connected</li>
                        <li>
                            <a href="https://facebook.com"><img src="/images/facebook-fill.svg" alt=""/></a>
                            <a href="https://twitter.com"><img src="/images/twitter-square-fill.svg" alt=""/></a>
                            <a href="https://instagram.com"> <img src="/images/instagram.svg" alt=""/></a>
                        </li>

                    </ul>
                </Col>
            </Row>
            <div className={styles.info}>
                <div className="title">DEV@Deakin 2022</div>
                <div className="content">
                    <div><a href="/">Privacy Policy</a>
                    </div>
                    <div><a href="/">Terms</a>
                    </div>
                    <div><a href="/">Code of Conduct</a>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Footer;