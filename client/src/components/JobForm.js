import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { render } from 'react-dom';
import moment from 'moment';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { addJob, removeJob } from '../redux/jobs' 

const mapStateToProps = state => ({
  jobs: state.jobs.jobs
})

const mapDispatchToProps = dispatch => bindActionCreators({
  addJob, 
  removeJob
}, dispatch)

class JobForm extends Component {
	static propTypes = {
	  jobs: PropTypes.array.isRequired,
	  addJob: PropTypes.func.isRequired,
	  removeJob: PropTypes.func.isRequired,
	}

	constructor() {
		super();
		this.state = {
			salary: "0-$30,000"
		}
	}

	setSalary(e) {
		const salary = e.target.value;
		this.setState({
			salary
		});
	}

	addJob(e) {
		// e.preventDefault();
		var position = this.position.value; 
		var company = this.company.value;
		var location = this.location.value;
		var description = this.description.value;
		var salary = this.state.salary;

		fetch('http://localhost:3001/jobs.json', {  
		  method: 'POST',
		  credentials: 'same-origin',
		  headers: {
		    Accept: 'application/json',
		    'Content-Type': 'application/json',
		  },
		  body: JSON.stringify({ job: {position, company, location, description, salary} })
		})
	}

	autocomplete(input) {
		if(!input) return;
		const dropdown = new window.google.maps.places.Autocomplete(input);
		input.addEventListener('keydown', (e) => {
			if(e.keyCode === 13) e.preventDefault();
		})
	}


	render() {
		return(
	      <form className="form" onSubmit={(e) => this.addJob(e)}> 
	        <h2>Post a Job</h2><br/>
	        <input ref={(input) => this.position=input} type="text" name="position" className="input" placeholder="Position" /><br/><br/>
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(JobForm)
