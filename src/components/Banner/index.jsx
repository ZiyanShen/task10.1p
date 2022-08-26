import React from 'react';
import styles from "./index.module.less"

function Banner(props) {
    return (
        <div className={styles.banner}>
            <img className="banner_img" src="/images/1821658121680_.pic.jpg" alt=""/>
            <div className="banner_title"> Hey,i'm Ziyan SHEN</div>
        </div>

    );
}

export default Banner;