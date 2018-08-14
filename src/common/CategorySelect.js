import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {FormControl, InputLabel, MenuItem, Select} from "@material-ui/core";

export default class CategorySelect extends Component {

	static propTypes = {
		categories: PropTypes.array.isRequired,
		handler: PropTypes.func.isRequired,
		value: PropTypes.number.isRequired,
	};

	render() {

		let { categories, handler, value } = this.props;

		let menuItems = categories.map(el => (
			<MenuItem key={el.id} value={el.id}>{el.name}</MenuItem>
		));

		return (
			<FormControl>
				<InputLabel htmlFor="category">Category:</InputLabel>
				<Select
					value={value}
					onChange={handler}
					inputProps={{
						name: 'Category',
						id: 'category',
					}}
				>
					{menuItems}
				</Select>
			</FormControl>
		)
	}
}