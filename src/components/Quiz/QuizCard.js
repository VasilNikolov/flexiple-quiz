import React, { PureComponent } from 'react'
import {
	Card,
	CardContent,
	CardActions,
	Radio,
	FormControl,
	FormGroup,
	RadioGroup,
	FormControlLabel,
	Button, Grid
} from '@material-ui/core'
import PropTypes from 'prop-types'

export default class QuizCard extends PureComponent {

	static propTypes = {
		question: PropTypes.string,
		correct_answer: PropTypes.string,
		incorrect_answers: PropTypes.array,
		type: PropTypes.string,
		nextHandler: PropTypes.func.isRequired,
		questionNumber: PropTypes.number
	}

	state = {
		value: '',
		correctPlace: Math.floor(Math.random() * 4)
	}

	handleChange = e => {
		this.setState({ value: e.target.value })
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		if (prevProps !== this.props) {
			this.setState({ value: '' })
		}
	}

	submitHandler = e => {
		e.preventDefault()
		let { nextHandler, correct_answer } = this.props

		if (correct_answer === this.state.value) {
			nextHandler(1)
		} else {
			nextHandler(0)
		}
	}

	decodeHtml(html) {
		var txt = document.createElement("textarea");
		txt.innerHTML = html;
		return txt.value;
	}

	render() {
		let { correct_answer, incorrect_answers, question, type, questionNumber } = this.props

		let incorrect,
				radioValue,
				disabled = true

		if (incorrect_answers && correct_answer) {
			incorrect = incorrect_answers.map(el => <FormControlLabel key={el} value={this.decodeHtml(el)} control={<Radio />} label={this.decodeHtml(el)} />)
			incorrect.splice(this.state.correctPlace, 0, <FormControlLabel key={correct_answer} value={this.decodeHtml(correct_answer)} control={<Radio />} label={this.decodeHtml(correct_answer)} />)
		}

		if (this.state.value) {
			if (type !== 'boolean' || this.state.value !== '') {
				radioValue = this.state.value
			}
			disabled = false
		}

		return (
			<div style={{padding: '20px'}}>
				<Grid
					container
					justify="center"
					alignItems="center"
					spacing={40}
				>
					<Grid item xs={12} sm={7} lg={5} xl={4}>
						<Card>
							<CardContent>
								<form onSubmit={this.submitHandler}>
									<FormGroup>
										<FormControl component="fieldset">
											<h3>{this.decodeHtml(`${questionNumber + 1}. ${question}`)}</h3>
											<RadioGroup
												name="gender1"
												value={radioValue}
												onChange={this.handleChange}
											>
												{incorrect}
											</RadioGroup>
										</FormControl>
									</FormGroup>
									<FormControl>
										<FormControl component="fieldset">
											<Button type={'submit'} disabled={disabled}>Next</Button>
										</FormControl>
									</FormControl>
								</form>
							</CardContent>
							<CardActions/>
						</Card>
					</Grid>
				</Grid>
			</div>
		)
	}
}