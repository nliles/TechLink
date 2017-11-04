import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { render } from 'react-dom';
import { bindActionCreators } from 'redux'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { addJob, removeJob, editJob } from '../actions/jobActions' 

function mapStateToProps(state) {
  return {
    jobs: state.jobs.jobs
  };
}


const mapDispatchToProps = dispatch => bindActionCreators({
  addJob, 
  removeJob,
  editJob
}, dispatch)


class EditJobForm extends Component {

	static propTypes = {
	  jobs: PropTypes.array.isRequired,
	  addJob: PropTypes.func.isRequired,
	  removeJob: PropTypes.func.isRequired,
	  editJob: PropTypes.func.isRequired
	}

  constructor(props) {
    super(props);
    this.state = {
    	userId: '',
    	position: '',
    	company: '',
    	location: '',
    	description: '',
    	salary: '',
    	redirectToNewPage: false		
    };
  }

  componentDidMount() {
    fetch(`/jobs/${this.props.match.params.id}`)
          .then((response) => response.json())
          .then((json) => this.setState({ userId: json.user_id, position: json.position, company: json.company, location:json.location,
            description: json.description, salary: json.salary})
          )
    }

	editJob(e) {
		e.preventDefault();
		const { position, company, location, description, salary } = this.state
		const job = { job: {position, company, location, description, salary} }
		var user_id = window.localStorage.getItem("user_id")
		if (parseInt(user_id) === this.state.userId ) {
			this.apiEditJob(job)
		} else {
			alert("You are not authorized to edit this job")
		}	
	}

	apiEditJob(job) {
	const jobId = this.props.match.params.id
		fetch(`/jobs/${jobId}`, {  
		  method: 'PUT',
		  headers: {
		    Accept: 'application/json',
		    'Content-Type': 'application/json',
		  },
		  body: JSON.stringify(job)
		})
		.then(response =>  {
			if(!response.ok) { alert('Something went wrong. Please try again.')}
			response => response.json()
		    .then((data) => {this.props.editJob(data) })
		    this.setState({ redirectToNewPage: true })
	    })

	}

	autocomplete(input) {
		if(!input) return;
		new window.google.maps.places.Autocomplete(input);
		input.addEventListener('keydown', (e) => {
			if(e.keyCode === 13) e.preventDefault();
		})
	}

	render() {
	   if (this.state.redirectToNewPage) {
	     return (
	     <Redirect to="/"/>
	     )
	   } else {
		return(
			<div>
				<form className="form" className="centerForm" onSubmit={(e) => this.editJob(e)}> 
			        <h2>Edit Job </h2><br/>
			        <input ref="details" onChange={e => this.setState({ position: e.target.value})} value={this.state.position} type="text" name="position" className="input"/><br/><br/>
			        <input onChange={e => this.setState({ company: e.target.value})} value={this.state.company} type="text" name="company" className="input" /><br/><br/>
			        <input onChange={e => this.setState({ location: e.target.value})} value={this.state.location} type="text" name="location" className="input" onClick={e => this.autocomplete(e.target)} /><br/><br/>
			        <textarea onChange={e => this.setState({ description: e.target.value})} value={this.state.description} name="description" className="input textarea" ></textarea><br/><br/>
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
			</div>
	      
	      )}
	}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditJobForm)