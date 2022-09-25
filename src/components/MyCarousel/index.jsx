import React, {useRef} from 'react';
import {Carousel} from "antd";
import {usePhotos2Query} from "../../api/api";
import styles from "./index.module.less"

function MyCarousel(props) {
    const page = useRef(Math.round(Math.random() * 9) + 1)
    const {data, isFetching, isSuccess, isError, refetch} = usePhotos2Query({
        page: page.current,
        limit: 5
    })
    let content = ""
    if (isFetching) {
        content = <img className={styles.photo} src="" alt=""/>
    }
    if (isSuccess) {
        content = data.map(item => <img key={item.id} className={styles.photo} src={item.download_url} alt=""/>)
    }
    return (
        <Carousel autoplay className={styles.carousel}>
            {content}
        </Carousel>
    );
}

export default MyCarousel;