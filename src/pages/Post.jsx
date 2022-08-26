import React, {useState} from 'react';
import Question from "../components/PostQuestion";
import Article from "../components/PostArticle";
import {Radio} from "antd";

const styles = {
    banner: {
        background: "#e3e2e2",
        height: 30,
        fontWeight: "bold",
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        paddingLeft: 3,
    }
}


function Post(props) {
    const [postType, setPostType] = useState(1)
    const onChange = (e) => {
        console.log(e.target.value)
        setPostType(e.target.value)
    }
    return (
        <>
            <div style={styles.banner}>New Post</div>
            <div style={{
                display: "flex",
                alignItems: "center",
                height: 40,
                fontWeight: "bold"
            }}>
                Selecet Post Type:
                <Radio.Group value={postType} onChange={onChange} style={{marginLeft: 10}}>
                    <Radio value={1}>Question</Radio>
                    <Radio value={2}>Article</Radio>
                </Radio.Group>
            </div>
            <div style={styles.banner}>What do you want to ask or share</div>
            {
                postType === 1 ? <Question/> : <Article/>
            }
        </>

    );
}

export default Post;