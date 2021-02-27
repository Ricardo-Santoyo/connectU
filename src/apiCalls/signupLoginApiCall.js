async function signupLoginApiCall(url, data) {

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    if (response.ok) {
      const jwt = response.headers.get('Authorization').split(' ')[1];
      localStorage.setItem('token', jwt);
      return jwt;
    }
  } catch (error) {
    throw new Error(error);
  }
};

export default signupLoginApiCall;