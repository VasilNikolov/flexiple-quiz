import React, { Component } from 'react'
import { Grid, FormGroup, TextField, Button, Typography } from '@material-ui/core'
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
	}

	componentDidMount() {
		let categories = axios.get('https://opentdb.com/api_category.php');
		categories.then(response => {
			this.setState({ categories: response.data.trivia_categories, loading: false, category: response.data.trivia_categories[0].id })
		}).catch(err => {
			alert(err)
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

	  let content = [],
	      disabled = true

	  if (this.state.name) {
	  	disabled = false
	  }

	  if (this.state.loading) {
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
	  	content = (
			  <div className='p-20'>
				  <h2>Welcome!</h2>
				  <Typography>You have 60 seconds to answer as many questions as you can!</Typography>
				  <div>
					  <Grid
						  container
						  justify="center"
						  alignItems="center"
						  spacing={40}
					  >
						  <Grid item xs={12} sm={6} lg={3} xl={2}>
							  <form onSubmit={this.submitHandler}>
								  <FormGroup>
									  <TextField required label={'Name:'} name={'name'} value={this.state.name} onChange={this.detailsChangeHandler}/>
								  </FormGroup>
								  <FormGroup>
									  <TextField label={'Email:'} name={'email'} value={this.state.email} onChange={this.detailsChangeHandler}/>
								  </FormGroup>
								  <FormGroup>
									  <TextField label={'Phone number:'} name={'phone'} value={this.state.phone} onChange={this.detailsChangeHandler}/>
								  </FormGroup>
								  <FormGroup className='mt-20'>
										<CategorySelect categories={this.state.categories} handler={this.changeCategory} value={this.state.category} />
								  </FormGroup>
								  <Button type={'submit'} disabled={disabled} className='mt-20'>Submit</Button>
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
