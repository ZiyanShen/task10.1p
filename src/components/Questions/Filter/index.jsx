import React from 'react';
import {Button, Card, DatePicker, Form, Input, Select} from "antd";
import {useGetPostMutation} from "../../../api/api";
import moment from "moment";

const Filter = () => {
	const [getPost] = useGetPostMutation()

	return (
		<Card
			style={{
				marginLeft: 8
			}}
			title="Search Posts"
		>
			<Form
				name="filter"
				onValuesChange={(changedValues, values) => {
					const {dateRange} = values
					console.log(dateRange)
					if (dateRange && dateRange.length >= 2) {
						values.dateRange = dateRange.map(item=>{
							return item.startOf('day').format('X')
						})
					}else {
						values.dateRange = []
					}
					console.log(values)
					getPost(values)
				}}
			>
				<Form.Item
					name="title"
					label="Title"
				>
					<Input placeholder="Search title"/>
				</Form.Item>
				<Form.Item
					name="tags"
					label="Tags"
				>
					<Select
						mode="tags"
						placeholder="filter tags"
						style={{width: '100%'}}
					>
					</Select>
				</Form.Item>
				<Form.Item
					label="Date Range"
					labelCol={{span: 24}}
					name="dateRange"
				>
					<DatePicker.RangePicker/>
				</Form.Item>
			</Form>
		</Card>
	)
}

export default Filter;