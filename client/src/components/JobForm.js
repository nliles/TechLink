import React, { Component } from 'react';
import { render } from 'react-dom';
import GoogleMapReact from 'google-map-react';
import $ from 'jquery'; 

class JobForm extends Component {
	constructor() {
		super();
		this.state = {
			job: {
				position: '',
				company: '',
				location: '',
				description: '',
				salary: ''
			}
		}
	}

	setSalary(e) {
	  this.setState({ job:{salary:e.target.value}})
	}

    handlePositionChange(e) {
      	  this.setState({ job:{position:e.target.value}})
    }

	addJob(e) {
		e.preventDefault();
		var job = {job: this.state.job}
		console.log(job)

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


	autocomplete(e) {
		// if(!input) return;
		// const dropdown = new google.maps.places.Autocomplete(e.target.value);
		console.log(e.target.value)
		// dropdown.addListener('place_changed', () => {
		// 	const place = dropdown.getPlace();
		// 	latInput.value = place.geometry.location.lat();
		// 	lngInput.value = place.geometry.location.lng();
		// });


		// input.addEventListener('keydown', (e) => {
		// 	if(e.keyCode === 13) e.preventDefault();
		// })
	}


	render() {
		return(
	      <form className="form" onSubmit={(e) => this.addJob(e)}> 
	        <h2>Post a Job</h2><br/>
	        <input type="text" name="position" className="input" placeholder="Position" onChange={ this.handlePositionChange } /><br/><br/>
	        <input type="text" name="company" className="input" placeholder="Company" /><br/><br/>
	        <input type="text" name="location" className="input" placeholder="Location" onChange={ this.autocomplete } /><br/><br/>
	        <textarea name="description" className="input" placeholder="Description"></textarea><br/><br/>
	        <label>Salary:</label><br/>
			<div className="salaryOptions" onChange={event => this.setSalary(event)}>
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
