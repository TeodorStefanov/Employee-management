const dataService = async ({ method, url, data }) => {
  try {
    
    const promise = await fetch(`http://localhost:9000/api/${url}`, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    return promise;
  } catch (error) {
    return error;
  }
};

export default dataService;
