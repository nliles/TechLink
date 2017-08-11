import React, { Component } from 'react';
import { render } from 'react-dom';
import $ from 'jquery';
import moment from 'moment'

class JobForm extends Component {
	constructor() {
		super();
		this.state = {
			position: '',
			company: '',
			location: '',
			description: '',
			salary: ''
		}
	}

	setSalary(e) {
		const {value} = e.target;
		this.setState({
			salary: value
		});
	}

	addJob(e) {
		e.preventDefault();
		var position = this.position.value; 
		var company = this.company.value;
		var location = this.location.value;
		var description = this.description.value;
		var salary = this.state.salary;
		var data = {position, company, location, description, salary}
		console.log(data)

		this.setState({position})
		this.setState({company})
		this.setState({location})
		this.setState({description})

	   $.ajax({
	      url: '/jobs.json',
	      dataType: 'json',
	      contentType: 'application/json',
	      type: 'POST',
	      data: JSON.stringify({job: data}),
	      success: function(data) {
	        this.setState({data});
	      }.bind(this),
	      error: function(xhr, status, err) {
	        this.setState({data: err});
	       console.error(this.props.url, status, err.toString());
	      }.bind(this)
	    });

	}


	autocomplete(input) {
		if(!input) return;
		const dropdown = new window.google.maps.places.Autocomplete(input);
		input.addEventListener('keydown', (e) => {
			if(e.keyCode === 13) e.preventDefault();
		})
	}


	render() {
		console.log(this.state)
		return(
	      <form className="form" onSubmit={(e) => this.addJob(e)}> 
	        <h2>Post a Job</h2><br/>
	        <input ref={(input) => this.position=input} type="text" name="position" className="input" placeholder="Position" /><br/><br/>
	        <input ref={(input) => this.company=input} type="text" name="company" className="input" placeholder="Company"/><br/><br/>
	        <input ref={(input) => this.location=input} type="text" name="location" className="input" placeholder="Location" onClick={e => this.autocomplete(e.target)} /><br/><br/>
	        <textarea ref={(input) => this.description=input} name="description" className="input" placeholder="Description" ></textarea><br/><br/>
	        <label>Salary:</label><br/>
			<div className="salaryOptions" onChange={e => this.setSalary(e)}>
		        <div className="radioDiv">
				    <input type="radio" name="salary" className="radio" value="0-$30,000"/> "0-$30k"
			    </div>
			    <div className="radioDiv">
				    <input type="radio" name="salary" className="radio" value="$31,000-$60,000"/> "$31-$60k"
			    </div>
			    <div className="radioDiv">
				    <input type="radio" name="salary" className="radio" value="$61,000-$99,000"/> "$61-$100k"
			    </div>
			    <div className="radioDiv">
				    <input type="radio" name="salary" className="radio" value="$100,000+"/> "$101k+"
			    </div><br/> 
		    </div> 

	        <button type="submit" className="button">Submit → </button>
	      </form>
      ) 
	}
}

export default JobForm;
