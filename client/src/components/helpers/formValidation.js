export default (fieldName, value, state, cb) => {
    let fieldValidationErrors = state.formErrors;
    let emailValid = state.emailValid;
    let passwordValid = state.passwordValid;
    let positionValid = state.positionValid;
    let companyValid = state.companyValid;
    let locationValid = state.locationValid;
    let descriptionValid = state.descriptionValid;
    let salaryValid = state.salaryValid;

    switch(fieldName) {
      case 'email':
        emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        break;
      case 'password':
        passwordValid = value.length >= 6;
        break;
      case 'position':
        positionValid = value.length > 0;
        break;
      case 'company':
        companyValid = value.length > 0;
        break;
      case 'location':
        locationValid = value.length > 0;
        break;
      case 'description':
        descriptionValid = value.length > 0;
        break;
      case 'salary':
        salaryValid = value.length > 0;
        break;
      default:
        break;
  }
    cb({formErrors: fieldValidationErrors}),
    cb({emailValid: emailValid}),
    cb({passwordValid: passwordValid}),
    cb({positionValid: positionValid}), 
    cb({companyValid: companyValid}),
    cb({locationValid: locationValid}),  
    cb({descriptionValid: descriptionValid})
    cb({salaryValid: salaryValid})
}

