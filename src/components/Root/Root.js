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

	render() {

		return (
			<div>
				{ this.state.showWelcomeScreen ? <WelcomeScreen completeHandler={this.welcomeComplete}/> : ''}
				{ this.state.showQuiz ? <Quiz category={this.state.details.category} name={this.state.details.name}/> : ''}
			</div>
		)
	}
}