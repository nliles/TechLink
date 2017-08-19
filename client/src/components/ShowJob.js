import React, { Component } from 'react';
import { render } from 'react-dom';

class ShowJob extends Component {

  constructor(props) {
    super(props);
    console.log(this.props)
    this.state = {
    	id: this.props.match.params.id,
    	position: this.props.match.params.position,
    	company: this.props.match.params.company,
    	location: this.props.match.params.location,
    	description: this.props.match.params.description,
    	salary: this.props.match.params.salary,
    };
  }

	render() {
		return(
	      <div className="jobList">
	        <h2 className="activity">{this.state.position.toUpperCase()}</h2><br/>
	        	<div className="jobs">
        				<div className="job">
	        				<p>{this.state.company} - {this.state.location}</p>
	        				<p className="description">{this.state.description}</p>
	        				<p>{this.state.salary}</p>
	        				<p>{this.state.created_at}</p>
	        			</div>
		      	</div>

	      </div>
      ) 
	}
}


export default ShowJob;