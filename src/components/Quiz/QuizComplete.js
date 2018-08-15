import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
	Card,
	CardContent,
	Typography,
} from '@material-ui/core'

export default class QuizComplete extends Component {

	static propTypes = {
		correctAnswers: PropTypes.number.isRequired,
		condition: PropTypes.string,
		name: PropTypes.string,
	}

	render() {
		let { condition, correctAnswers, name } = this.props

		let title = ''

		if (condition === 'timer') {
			title = 'You have ran out of time!'
		} else if (condition === 'complete') {
			title = 'You completed the quiz in time!'
		}

		return (
			<Card>
				<CardContent>
					<h3>{title}</h3>
					<Typography>Congratulations <b>{name}</b>!</Typography>
					<Typography>You have correctly answered <b>{correctAnswers}</b> out of 20 questions!</Typography>
				</CardContent>
			</Card>
		)
	}
}