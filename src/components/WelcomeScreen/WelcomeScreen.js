import React, { Component } from 'react'
import { Grid, FormGroup, TextField, Select, MenuItem, Button, InputLabel, FormControl } from '@material-ui/core'
import axios from "axios";
import Loader from 'react-loader-spinner'
import PropTypes from 'prop-types'
import CategorySelect from '../../common/CategorySelect'

export default class WelcomeScreen extends Component {

	static propTypes = {
		completeHandler: PropTypes.func.isRequired,
	}

	state = {
		categories: [],
		category: 0,
		loading: true,
		name: '',
		email: '',
		phone: '',
	};

	componentDidMount() {
		let categories = axios.get('https://opentdb.com/api_category.php');
		categories.then(response => {
			this.setState({ categories: response.data.trivia_categories, loading: false, category: response.data.trivia_categories[0].id })
		})
	}

	changeCategory = (e) => {
		this.setState({category: e.target.value})
	}

	detailsChangeHandler = (e) => {
		this.setState({ [e.target.name]: e.target.value })
	}

	submitHandler = (e) => {
		e.preventDefault();
		this.props.completeHandler({ category: this.state.category, name: this.state.name, email: this.state.email, phone: this.state.phone })
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
				  <h2>Welcome!</h2>
				  <div style={{padding: '20px'}}>
					  <Grid
						  container
						  justify="center"
						  alignItems="center"
						  spacing={40}
					  >
						  <Grid item xs={3}>
							  <form onSubmit={this.submitHandler}>
								  <FormGroup>
									  <TextField label={'Name:'} name={'name'} value={this.state.name} onChange={this.detailsChangeHandler}/>
								  </FormGroup>
								  <FormGroup>
									  <TextField label={'Email:'} name={'email'} value={this.state.email} onChange={this.detailsChangeHandler}/>
								  </FormGroup>
								  <FormGroup>
									  <TextField label={'Phone number:'} name={'phone'} value={this.state.phone} onChange={this.detailsChangeHandler}/>
								  </FormGroup>
								  <FormGroup>
										<CategorySelect categories={this.state.categories} handler={this.changeCategory} value={this.state.category} />
								  </FormGroup>
								  <Button type={'submit'}>Submit</Button>
							  </form>
						  </Grid>
					  </Grid>
				  </div>
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
