async function apiCall(url, method) {
  const token = localStorage.getItem('token');

  try {
    const response = await fetch(url, {
      method: method,
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    const data = response.json();
    return data;
  } catch (error) {
    throw new Error(error);
  }
};

export default apiCall;