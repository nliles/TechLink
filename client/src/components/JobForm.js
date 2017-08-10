import React, { Component } from 'react';
import { render } from 'react-dom';

class JobForm extends Component {
	render() {
		return(
	      <form className="form"> 
	        <h2>Post a Job</h2><br/>
	        <input type="text" name="position" className="input" placeholder="Position"/><br/><br/>
	        <input type="text" name="company" className="input" placeholder="Company"/><br/><br/>
	        <input type="text" name="location" className="input" placeholder="Location"/><br/><br/>
	        <textarea name="description" className="input" placeholder="Description"></textarea><br/><br/>
	        <label for="salary">Salary:</label><br/>
			<div className="salaryOptions">
		        <div className="radioDiv">
				    <input type="radio" name="salary" className="radio" value="0-30k"  checked={false}/> "0-30k"
			    </div>
			    <div className="radioDiv">
				    <input type="radio" name="salary" className="radio" value="31-60k"/>  "31-60k"
			    </div>
			    <div className="radioDiv">
				    <input type="radio" name="salary" className="radio" value="other"/>  "61-100k"
			    </div>
			    <div className="radioDiv">
				    <input type="radio" name="salary" className="radio" value="other"/>  "101k+"
			    </div><br/> 
		    </div> 

	        <button type="submit" className="button">Submit → </button>
	      </form>
      ) 
	}
}

export default JobForm;
