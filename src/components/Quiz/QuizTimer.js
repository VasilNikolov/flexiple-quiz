import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

export default class QuizTimer extends PureComponent {

	static propTypes = {
		completeHandler: PropTypes.func.isRequired,
	}

	state = {
		timeRemaining: 60,
	}

	componentDidMount() {
		this.startTimer()
	}

	startTimer() {
		this.interval = setInterval(() => this.setState({ timeRemaining: this.state.timeRemaining - 1 }), 1000)
	}

	componentDidUpdate() {
		if(this.state.timeRemaining === 0) {
			this.props.completeHandler('timer')
		}
	}

	componentWillUnmount() {
		clearInterval(this.interval)
	}

	render() {
		return (
			<h4>Time remaining: {this.state.timeRemaining}</h4>
		)
	}
}