import React, {useRef, useState} from 'react';
import {Button, Row} from "antd";
import styles from "./index.module.less"
import {usePhotosQuery} from "../../api/api";
import Article from "./Article";

type photosType = {
    author: string
    download_url: string
    height: number
    width: number
    id: string
    url: string
}

function Articles(props: { title: string }) {
    const {current: page} = useRef<number>(Math.round(Math.random() * 10) + 10)
    const {data: photos, isFetching, isSuccess, isError, refetch} = usePhotosQuery({
        page,
        limit: 12
    })
    const [content2, setContent2] = useState(<></>)
    const [btnHidden, setBtnHidden] = useState(false)
    let content = ""
    let title: JSX.Element = <></>
    let btn: JSX.Element = <></>
    const showAll = () => {
        setContent2(photos.slice(3, 12).map((article: photosType) => (
            <Article key={article.id} article={article}></Article>
        )))
        setBtnHidden(true)
    }
    if (isFetching) {
        content = "Loading"
    }
    if (isSuccess) {
        content = photos.slice(0, 3).map((article: photosType) => (
            <Article key={article.id} article={article}></Article>
        ))
        btn =
            <div className={styles.show}><Button key={props.title} hidden={btnHidden} onClick={showAll} type="primary">See
                All {props.title}</Button></div>
        title = <div className={styles.title}>Featured {props.title}</div>
    }
    return (
        <div>
            {title}
            <Row className={styles.row}>
                {content}
                {content2}
            </Row>
            {btn}
        </div>

    );
}

export default Articles;