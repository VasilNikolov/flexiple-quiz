import React, { Component } from 'react'
import axios from "axios";
import Loader from 'react-loader-spinner'
import PropTypes from 'prop-types'
import QuizCard from './QuizCard'
import QuizTimer from './QuizTimer'
import QuizComplete from './QuizComplete'

export default class Quiz extends Component {

	static propTypes = {
		category: PropTypes.number.isRequired,
		name: PropTypes.string.isRequired,
	}

	state = {
		questions: [],
		counter: 0,
		correct: 0,
		condition: '',
		loading: true,
		showComplete: false
	};

	componentDidMount() {
		let questions = axios.get(`https://opentdb.com/api.php?amount=20&category=${this.props.category}`);

		questions.then(response => {
			this.setState({questions: response.data.results, loading: false})
		}).catch(err => {
			alert(err)
		})
	}

	nextQuiestion = result => {
		let newState = {
			...this.state,
			counter: this.state.counter + 1,
			correct: this.state.correct + result,
			condition: 'complete',
		}

		if (newState.counter === 20) {
			this.setState(newState)
			this.completeQuiz('complete')
		} else {
			this.setState(newState)
		}
	}

	completeQuiz = (condition) => {
		this.setState({ condition: condition, showComplete: true })
	}

	render() {
		let { name } = this.props

		let content = []

		if (this.state.loading === true && this.state.questions.length === 0) {
			content = (
				<div className={'loader'}>
					<Loader
						type="Ball-Triangle"
						color="#436e8e"
						height="100"
						width="100"
					/>
				</div>
			)
		} else {
			if (this.state.showComplete && this.state.condition !== '') {
				content = (
					<div>
						<QuizComplete condition={this.state.condition} correctAnswers={this.state.correct} name={name}/>
					</div>
				)
			} else {
				content = (
					<div>
						<h2>Quiz</h2>
						<QuizTimer completeHandler={this.completeQuiz} />
						<QuizCard {...this.state.questions[this.state.counter]} questionNumber={this.state.counter} nextHandler={this.nextQuiestion} />
					</div>
				)
			}
		}

		return (
			<div>
				{content}
			</div>
		)
	}
}
