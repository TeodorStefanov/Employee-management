export const emailValidation = (val) => {
  const regEx =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!val.match(regEx)) {
    return '"Please enter correct email address"';
  }
};
export const phoneNumberValidation = (val) => {
  const regEx = /^[\d]{3,32}$/g;
  if (!val.match(regEx)) {
    return "Phone Number must be between 3 and 32 digits";
  }
};
export const salaryValidation = (val) => {
  const regEx = /^\d*\.?\d*$/;
  if (!val.match(regEx)) {
    return "Plese enter valid Salary";
  }
};
export const dateOfBirthValidation = (val) => {
  const date1 = new Date(val);
  const date2 = new Date();
  if (date1 > date2) {
    return "Please enter correct Date of Birth";
  }
};
