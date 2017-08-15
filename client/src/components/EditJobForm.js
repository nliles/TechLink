import React, { Component } from 'react';
import { render } from 'react-dom';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { addJob, removeJob } from '../redux/jobs' 


class EditJobForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
    	position: this.props.match.params.position,
    	company: '',
    	location: '',
    	description: '',
    	salary: ''
    };
  }

	editJob(e, id) {
		e.preventDefault();
		console.log("hi")

		var position = this.state.position; 
		var company = this.state.company;
		var location = this.state.location;
		var description = this.state.description;
		var salary = this.state.salary;
		var id = this.props.match.params.id

		fetch(`/jobs/${id}.json`, {  
		  method: 'PUT',
		  credentials: 'same-origin',
		  headers: {
		    Accept: 'application/json',
		    'Content-Type': 'application/json',
		  },
		  body: JSON.stringify({ job: {position, company, location, description, salary} })
		})
      .then(() => this.setState({ success: 'Successfully created!' }))
      .catch(() => this.setState({ error: 'Something went wrong' }))
	  }

	autocomplete(input) {
		if(!input) return;
		new window.google.maps.places.Autocomplete(input);
		input.addEventListener('keydown', (e) => {
			if(e.keyCode === 13) e.preventDefault();
		})
	}


	render() {
		console.log(this.props.match.params.position)
		return(
	      <form className="form" onSubmit={(e) => this.editJob(e)}> 
	        <h2>Edit Job</h2><br/>
	        <input ref="details" onChange={e => this.setState({ position: e.target.value})} value={this.state.position} type="text" name="position" className="input" placeholder="Position" /><br/><br/>
	        <input onChange={e => this.setState({ company: e.target.value})} value={this.state.company} type="text" name="company" className="input" placeholder="Company"/><br/><br/>
	        <input onChange={e => this.setState({ location: e.target.value})} value={this.state.location} type="text" name="location" className="input" placeholder="Location" onClick={e => this.autocomplete(e.target)} /><br/><br/>
	        <textarea onChange={e => this.setState({ description: e.target.value})} value={this.state.description} name="description" className="input textarea" placeholder="Description" ></textarea><br/><br/>
	        <label>Salary:</label><br/>
			<div className="salaryOptions" onClick={e => this.setState({ salary: e.target.value})}>
		        <div className="radioDiv">
				    <input type="radio" name="salary" className="radio" value="0-$30,000" /> "0-$30k"
			    </div>
			    <div className="radioDiv">
				    <input type="radio" name="salary" className="radio" value="$31,000-$60,000"/> "$31-$60k"
			    </div>
			    <div className="radioDiv">
				    <input type="radio" name="salary" className="radio" value="$61,000-$99,000"/> "$61-$100k"
			    </div>
			    <div className="radioDiv">
				    <input type="radio" name="salary" className="radio" value="$100,000+"/> "$100k+"
			    </div><br/> 
		    </div> 

	        <button type="submit" className="button">Submit → </button>
	      </form>
      ) 
	}
}

export default EditJobForm;