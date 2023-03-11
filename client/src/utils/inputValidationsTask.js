export const dueDateValidation = (val) => {
  const date1 = new Date(val);
  const date2 = new Date();
  if (date1 > date2) {
    return "Please enter valid Due Date";
  }
};
export const assignedToValidation = async (val) => {
  const promise = await fetch(
    `http://localhost:9000/api/employee/employee?id=${val}`
  )
  if (promise.status !== 200) {
    return "Please enter Employee";
  }
};
