async function apiCall(url, method, body) {
  const token = localStorage.getItem('token');

  try {
    const response = await fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: body
    });
    const data = response.json();
    return data;
  } catch (error) {
    throw new Error(error);
  }
};

export default apiCall;