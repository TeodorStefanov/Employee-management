export const dueDateValidation = (val) => {
  const date1 = new Date(val);
  const date2 = new Date();
  if (date1 > date2) {
    return "Please enter valid Due Date";
  }
};
