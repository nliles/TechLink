export default (stateObj, job, cb, cbs) => {

        fetch(stateObj.isEditing ? `/jobs/${stateObj.id}` : '/jobs', {  
          method: stateObj.isEditing ? 'PUT' : 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(job)
        })
        .then(response => response.json())
        .then((response) => {
            cb(response);
            let newState = Object.assign({}, stateObj);
            newState = { position: '', company: '', location: '', description: '', salary: '', redirectToNewPage: stateObj.isEditing },
            cbs(newState)
        })
        .catch(err => console.log(err));    
}
