import React, { Component } from 'react';
import { render } from 'react-dom';
import $ from 'jquery';

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

	setSalary(category, e) {
		const {value} = e.target;
		switch(category) {
			case 'position':
				this.setState({
					position: value
				});
				break;
			case 'company':
				this.setState({
					company: value
				});
				break;
			case 'location':
				this.setState({
					location: value
				});
				break;
			case 'description':
				this.setState({
					description: value
				});
				break;
			case 'salary':
				this.setState({
					salary: value
				});
			break;
			default:
				return;
		}
	  
	}

	addJob(e) {
		e.preventDefault();
		var position = {position: this.state.position}
		var description = {description: this.state.description}
		console.log(position)
		console.log(description)

	   // $.ajax({
	   //    url: '/jobs',
	   //    dataType: 'json',
	   //    type: 'POST',
	   //    data: job,
	   //    success: function(data) {
	   //      this.setState({data: job});
	   //    }.bind(this),
	   //    error: function(xhr, status, err) {
	   //      this.setState({data: job});
	   //     console.error(this.props.url, status, err.toString());
	   //    }.bind(this)
	   //  });

	}


	autocomplete(input) {
		if(!input) return;
		const dropdown = new window.google.maps.places.Autocomplete(input);
	}


	render() {
		console.log(this.state)
		return(
	      <form className="form" onSubmit={(e) => this.addJob(e)}> 
	        <h2>Post a Job</h2><br/>
	        <input type="text" onChange={e => this.setSalary('position', e)} name="position" className="input" placeholder="Position" /><br/><br/>
	        <input type="text" name="company" className="input" placeholder="Company" onChange={e => this.setSalary('company', e)} /><br/><br/>
	        <input type="text" name="location" className="input" placeholder="Location" onChange={e => this.autocomplete(e.target)} /><br/><br/>
	        <textarea name="description" className="input" placeholder="Description" onChange={e => this.setSalary('description', e)}></textarea><br/><br/>
	        <label>Salary:</label><br/>
			<div className="salaryOptions" onChange={e => this.setSalary('salary', e)}>
		        <div className="radioDiv">
				    <input type="radio" name="salary" className="radio" value="0-30k"/> "0-30k"
			    </div>
			    <div className="radioDiv">
				    <input type="radio" name="salary" className="radio" value="31-60k"/> "31-60k"
			    </div>
			    <div className="radioDiv">
				    <input type="radio" name="salary" className="radio" value="61-100k"/> "61-100k"
			    </div>
			    <div className="radioDiv">
				    <input type="radio" name="salary" className="radio" value="101k+"/> "101k+"
			    </div><br/> 
		    </div> 

	        <button type="submit" className="button">Submit → </button>
	      </form>
      ) 
	}
}

export default JobForm;
