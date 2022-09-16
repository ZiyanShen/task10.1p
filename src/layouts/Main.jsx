import React from 'react';
import {Layout} from "antd";
import styles from "./main.module.less";
import Header from "../components/Header";
import {Outlet} from "react-router-dom"
import Footer from "../components/Footer";
import Email from "../components/Email";


function Main() {
    return (
        <Layout>
            <Layout.Header className={styles.header}>
                <Header/>
            </Layout.Header>
            <Layout.Content style={{margin: '0px 50px 20px', overflow: 'initial'}}>
                <div>
                    <Outlet/>
                </div>
            </Layout.Content>
            <Layout.Footer>
                <Email/>
                <Footer/>
            </Layout.Footer>
        </Layout>
    );
}

export default Main;