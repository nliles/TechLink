import React, { Component } from 'react';
import { render } from 'react-dom';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { addJob, removeJob } from '../redux/jobs' 

class EditJobForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
    	position: this.props.position,
    	company: this.props.company,
    	location: this.props.location,
    	description: this.props.description,
    	salary: this.props.salary
    };
  }

	setSalary(e) {
		const salary = e.target.value;
		this.setState({ salary });
	}

	setPosition(e) {
		const position = e.target.value;
		this.setState({ position });
	}

	editJob(e) {
		e.preventDefault();
		console.log("hi")
		console.log(this.state.id)
		// var position = this.state.position; 
		// var company = this.company.value;
		// var location = this.location.value;
		// var description = this.description.value;
		// var salary = this.state.salary;

		// fetch(`/jobs/${id}.json`, {  
		//   method: 'PUT',
		//   credentials: 'same-origin',
		//   headers: {
		//     Accept: 'application/json',
		//     'Content-Type': 'application/json',
		//   },
		//   body: JSON.stringify({ job: {position, company, location, description, salary} })
		// })
  //     .then(() => this.setState({ success: 'Successfully created!' }))
  //     .catch(() => this.setState({ error: 'Something went wrong' }))
	  }

	autocomplete(input) {
		if(!input) return;
		new window.google.maps.places.Autocomplete(input);
		input.addEventListener('keydown', (e) => {
			if(e.keyCode === 13) e.preventDefault();
		})
	}


	render() {
		return(
	      <form className="form" onSubmit={(e) => this.editJob(e)}> 
	        <h2>Edit Job</h2><br/>
	        <input onChange={e => this.setPosition(e)}type="text" name="position" className="input" placeholder="Position" /><br/><br/>
	        <input ref={(input) => this.company=input} type="text" name="company" className="input" placeholder="Company"/><br/><br/>
	        <input ref={(input) => this.location=input} type="text" name="location" className="input" placeholder="Location" onClick={e => this.autocomplete(e.target)} /><br/><br/>
	        <textarea ref={(input) => this.description=input} name="description" className="input textarea" placeholder="Description" ></textarea><br/><br/>
	        <label>Salary:</label><br/>
			<div className="salaryOptions" onClick={e => this.setSalary(e)}>
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