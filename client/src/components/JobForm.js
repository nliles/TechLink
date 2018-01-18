import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { addJob, removeJob, editJob } from '../actions/jobActions' 
import JobList  from './JobList';
import autocomplete  from './helpers/Autocomplete';
import validateField from "./helpers/formValidation"
import jobFetch from "./helpers/fetch"


const mapStateToProps = (state) => {
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
    	id: '',
    	userId: '',
    	position: '',
    	company: '',
    	location: '',
    	description: '',
    	salary: '',
    	redirectToNewPage: false,	
    	isEditing: this.props.match ? true : false,
    	formErrors: {position: '', company: '', location: '', description: ''},
        positionValid: false,
        companyValid: false,
        locationValid: false,
        descriptionValid: false,
        salaryValid: false,
        formValid: false,
        showErrors: false
    };     
     this.handleSubmit = this.handleSubmit.bind(this);
     this.handleChange = this.handleChange.bind(this);
     this.handleInvalidSubmit = this.handleInvalidSubmit.bind(this);                 
  }

  componentDidMount() {
	  	if (this.state.isEditing) {
	    fetch(`/jobs/${this.props.match.params.id}`)
	          .then((response) => response.json())
	          .then((json) =>  {
                let newState = Object.assign({}, this.state);
                newState = { userId: json.user_id, id: this.props.match.params.id, position: json.position, company: json.company, 
	                         location:json.location,lat: json.lat, lng: json.lng, description: json.description, salary: json.salary};
                this.setState(newState);
                this.editValid();
            })
	  	} 
    }

    editValid() {
        Object.keys(this.state).map((key, index) => {
		   validateField(key, `${this.state + "." + key}`, this.state, this.handleChange)
		});
    }

	handleSubmit(e) {
		e.preventDefault();
		var user_id = window.localStorage.getItem("user_id")
	    const { position, company, location, lat, lng, description, salary } = this.state
		const job = { job: {user_id, position, company, location, lat, lng, description, salary} }
		if (this.state.isEditing) {
			if (parseInt(user_id) === this.state.userId ) {
				jobFetch(this.state, job, this.handleRedux, this.handleChange);
			} else {
				alert("You are not authorized to edit this job")
			}	
		} 
		else  {
			if (user_id) {
				jobFetch(this.state, job, this.handleRedux, this.handleChange);
			} else {
				let newState = Object.assign({}, this.state);
                newState = { position: '', company: '', description: '', location: '', lat: '', lng: '', salary: ''};
                this.setState(newState);
				alert("Please sign in to post a new job listing.")
			}
		}
	}

	handleRedux = (response) => {
		this.state.isEditing ? this.props.editJob(response) : this.props.addJob(response);
	}

	handleJobChange(e) {
	    const name = e.target.name;
	    const value = e.target.value;
	    this.setState({[name]: value},
	    () => { validateField(name, value, this.state, this.handleChange) });
	}

	handleChange = (arg) => {
	        this.setState(arg, () => {
	        	this.validateForm();	
	        });
		}

	 validateForm() {
	    this.setState({formValid: this.state.positionValid && this.state.companyValid && 
	    this.state.locationValid && this.state.descriptionValid && this.state.salaryValid });
	}

	handleInvalidSubmit(e) {
	    e.preventDefault();
	    this.setState({showErrors: true});
	}

	render() {
        let heading = this.state.isEditing ? `Edit Job` : "Post a New Job";
        let redirect = this.state.redirectToNewPage ? <Redirect to='/' /> : "";
        let submitHandler = this.state.formValid ? this.handleSubmit : this.handleInvalidSubmit;
        let positionError = this.state.showErrors && !this.state.positionValid ? "errorBorder" : "";
        let companyError = this.state.showErrors && !this.state.companyValid ? "errorBorder" : "";
        let locationError = this.state.showErrors && !this.state.locationValid ? "errorBorder" : "";
        let descriptionError = this.state.showErrors && !this.state.descriptionValid ? "errorBorder" : "";
        let salaryError = this.state.showErrors && !this.state.salaryValid ? "labelError" : "";

		return(
			<div>
				<div className='rowC'>
					<div className="jobForm">
						<form className="form" onSubmit={ submitHandler }> 
					        <h2>{heading} </h2><br/>
					        <input ref="details" onChange={e => this.handleJobChange(e)} placeholder="Position" value={this.state.position} 
					        type="text" name="position" className={`${positionError} + input`}/><br/><br/>
					        <input onChange={e => this.handleJobChange(e)} 
					         value={this.state.company} placeholder="Company" type="text" name="company" 
					         className={`${companyError} + input`} /><br/><br/>
					        <input onChange={e => this.handleJobChange(e)} value={this.state.location} 
					         placeholder="Location" type="text" name="location" className={`${locationError} + input`}
					         onFocus={e => autocomplete(e.target, this.state.lat, this.state.lng ,this.handleChange)} /><br/><br/>
					        <textarea onChange={e => this.handleJobChange(e)} value={this.state.description} placeholder="Description" name="description" 
					        className={`${descriptionError} + input + textarea`} ></textarea><br/><br/>
					        <label className={`${salaryError}`}>Salary:</label><br/>
							<div className="salaryOptions" onClick={e => this.handleJobChange(e)}>
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
					        { redirect }
					      </form>
				     </div>
		          <JobList jobs={[]}/>
				</div>
		    </div>  
	      )
	}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditJobForm)