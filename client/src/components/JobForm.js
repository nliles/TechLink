import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { render } from 'react-dom';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { addJob, removeJob, editJob } from '../redux/jobs' 

const mapStateToProps = state => ({
  jobs: state.jobs.jobs
})

const mapDispatchToProps = dispatch => bindActionCreators({
  addJob, 
  removeJob,
  editJob
}, dispatch)

class JobForm extends Component {
	static propTypes = {
	  jobs: PropTypes.array.isRequired,
	  addJob: PropTypes.func.isRequired,
	  removeJob: PropTypes.func.isRequired
	}

	constructor(props) {
		super(props);
		this.state = {
			position: '',
			company: '',
			location: '',
			description: '',
			salary: ''
		};
	}

	addJob(e) {
		e.preventDefault();
		var user_id = window.localStorage.getItem("user_id")
		var position = this.state.position; 
		var company = this.state.company;
		var location = this.location.value;
		var description = this.state.description;
		var salary = this.state.salary;
		const job = { job: {user_id, position, company, location, description, salary} }
		this.location.value =  '';
		if (user_id) {
			this.apiAddJob(job)
		} else {
	      	this.setState({ position: '', company: '', description: '', salary: ''});
			alert("Please sign in to post a new job listing.")
		}
	}

	apiAddJob(job) {
			fetch('/jobs', {  
			  method: 'POST',
			  headers: {
			    Accept: 'application/json',
			    'Content-Type': 'application/json',
			  },
			  body: JSON.stringify(job)
			})
	      .then(response => response.json())
	      .then(json => this.props.addJob(json),
	       this.state = { position: '', company: '', description: '', salary: ''})		
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
	      <form className="form" onSubmit={(e) => this.addJob(e)}> 
	        <h2>Post a Job</h2><br/>
	        <input onChange={e => this.setState({ position: e.target.value})} value={this.state.position} type="text" name="position" className="input" placeholder="Position" /><br/><br/>
	        <input onChange={e => this.setState({ company: e.target.value})} value={this.state.company} type="text" name="company" className="input" placeholder="Company"/><br/><br/>
	        <input ref={(input) => this.location= input} onClick={e => this.autocomplete(e.target)} onChange={e => this.setState({ location: e.target.value })} type="text" name="location" className="input" placeholder="Location"  /><br/><br/>
	        <textarea onChange={e => this.setState({ description: e.target.value})} value={this.state.description} name="description" className="input textarea" placeholder="Description" ></textarea><br/><br/>
	        <label>Salary:</label><br/>
			<div className="salaryOptions" onClick={e => this.setState({ salary: e.target.value})}>
		        <div className="radioDiv">
				    <input type="radio" name="salary" className="radio" value="0-$30,000" checked={this.state.salary === "0-$30,000"}/> "0-$30k"
			    </div>
			    <div className="radioDiv">
				    <input type="radio" name="salary" className="radio" value="$31,000-$60,000" checked={this.state.salary === "$31,000-$60,000"}/> "$31-$60k"
			    </div>
			    <div className="radioDiv">
				    <input type="radio" name="salary" className="radio" value="$61,000-$99,000" checked={this.state.salary === "$61,000-$99,000"}/> "$61-$100k"
			    </div>
			    <div className="radioDiv">
				    <input type="radio" name="salary" className="radio" value="$100,000+" checked={this.state.salary === "$100,000+"}/> "$100k+"
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
