import React, {useState} from 'react';
import {Avatar, Card, Col, Row, Tag} from "antd";
import {CommentOutlined, DeleteOutlined} from "@ant-design/icons";
import Meta from "antd/es/card/Meta";
import MyComment from "./MyComment";
import {useDeletePostMutation} from "../../../api/api";


function Question({title, user, tags, postId, data}) {
	const [visible, setVisible] = useState(false)
	const [deletePost] = useDeletePostMutation()
	const content = data?.abstract || data?.problem
	let thumb = ""
	if (data?.images?.length > 0) {
		thumb = data?.images[0]?.thumbUrl
	}

	return (
		<>
			<Card
				style={{
					width: "100%",
					marginBottom: 8
				}}
				actions={[
					<CommentOutlined
						key="comments"
						onClick={() => {
							setVisible(!visible)
						}}
						style={
							visible ? {color: "#3ace23"} : {}
						}
					/>,
					<DeleteOutlined
						key="delete"
						onClick={()=>{
							deletePost({postId})
						}}
					/>,
				]}
				title={title}
			>
				<Meta
					avatar={<Avatar src="https://joeschmoe.io/api/v1/random"/>}
					title={user}
					style={{
						marginBottom: 4
					}}
					description={tags.map(tag => (<Tag color="green" key={tag}>{tag}</Tag>))}
				/>
				<Row gutter={{xs: 8, sm: 16, md: 24}}>
					<Col
						span={thumb ? 6 : 0}
					>
						{thumb ? <img
							style={{
								width: "100%",
								height: "100%"
							}}
							alt="example"
							src={thumb}
						/> : ""}
					</Col>
					<Col span={thumb ? 18 : 24}
					     style={{
						     height: 120,
						     overflow: "hidden",
						     textOverflow: "ellipsis"
					     }}
					>
						{
							content && content.length > 100 ? content.slice(0, 100) + "......" : content
						}
					</Col>
				</Row>
			</Card>

			{visible ? (
				<MyComment postId={postId}/>
			) : ""}
		</>
	);
}

export default Question;