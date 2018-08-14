import React, { Component } from 'react'
import axios from "axios";
import Loader from 'react-loader-spinner'
import PropTypes from 'prop-types'

export default class Quiz extends Component {

	static propTypes = {
		category: PropTypes.number.isRequired,
		completeHandler: PropTypes.func.isRequired,
	}

	state = {
		questions: [],
		loading: true,
	};

	componentDidMount() {
		let questions = axios.get(`https://opentdb.com/api.php?amount=20&category=${this.props.category}`);

		questions.then(response => {
			console.log(response.data.results)
			this.setState({questions: response.data.results, loading: false})
		})

	}

	render() {

		let content = [];

		if (this.state.loading) {
			content = ( <Loader
				type="Puff"
				color="#00BFFF"
				height="100"
				width="100"
			/>)
		} else {
			content = (
				<div>
					<h2>Quiz</h2>
				</div>
			)
		}

		return (
			<div>
				{content}
			</div>
		)
	}
}
