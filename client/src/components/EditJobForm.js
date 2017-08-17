import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { render } from 'react-dom';
import { bindActionCreators } from 'redux'
import { Redirect } from 'react-router-dom'
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


class EditJobForm extends Component {

	static propTypes = {
	  jobs: PropTypes.array.isRequired,
	  addJob: PropTypes.func.isRequired,
	  removeJob: PropTypes.func.isRequired,
	  editJob: PropTypes.func.isRequired
	}

  constructor(props) {
    super(props);
    console.log(props)
    this.state = {
    	position: '',
    	company: '',
    	location: '',
    	description: '',
    	salary: '',
    	redirectToNewPage: false
    };
  }


  getJob(props){
	if (props.jobs.length>0){
	  	let job = props.jobs.find((j)=>{
	  		return j.id === this.props.match.params.id
	})
	if (job) {
	this.setState({
	    	position: job.position,
	    	company: job.company,
	    	location: job.location,
	    	description: job.description
	  	})

	}
  	}  	
  }

  componentDidMount(){
  	this.getJob(this.props)
  }


  componentWillReceiveProps(nextProps){	
  	this.initialize(nextProps)
  }

	editJob(e, id) {
		e.preventDefault();

		var position = this.state.position; 
		var company = this.state.company;
		var location = this.state.location;
		var description = this.state.description;
		var salary = this.state.salary;

		fetch(`/jobs/${id}`, {  
		  method: 'PUT',
		  headers: {
		    Accept: 'application/json',
		    'Content-Type': 'application/json',
		  },
		  body: JSON.stringify({ job: {position, company, location, description, salary} })
		})
      .then((response) => response.json())
      .then((json) => this.props.editJob(json), this.setState({ redirectToNewPage: true }))
      .catch((err) => console.log(err))
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
		   }
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
						    <input type="radio" name="salary" className="radio" value="0-$30,000" /> "0-$30k"
					    </div>
					    <div className="radioDiv">
						    <input type="radio" name="salary" className="radio" value="$31,000-$60,000"/> "$31-$60k"
					    </div>
					    <div className="radioDiv">
						    <input type="radio" name="salary" className="radio" value="$61,000-$99,000" /> "$61-$100k"
					    </div>
					    <div className="radioDiv">
						    <input type="radio" name="salary" className="radio" value="$100,000+" /> "$100k+"
					    </div><br/> 
				    </div> 

			        <button type="submit" className="button">Submit → </button>
			      </form>
			</div>
	      
      ) 
	}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditJobForm)