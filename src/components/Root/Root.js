import React from 'react'
import WelcomeScreen from '../WelcomeScreen/WelcomeScreen'
import Quiz from '../Quiz/Quiz'

export default class Root extends React.Component {

	state = {
		showWelcomeScreen: true,
		showQuiz: false,
	};

	welcomeComplete = data => {


		this.setState({ showWelcomeScreen: false, details: data, showQuiz: true })
	}

	quizComplete = data => {
		console.log(data)
	}

	render() {

		return (
			<div>
				{ this.state.showWelcomeScreen ? <WelcomeScreen completeHandler={this.welcomeComplete}/> : ''}
				{ this.state.showQuiz ? <Quiz completeHandler={this.quizComplete} category={this.state.details.category}/> : ''}
			</div>
		)
	}
}