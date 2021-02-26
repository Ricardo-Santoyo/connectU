async function getApiCall(url) {
  const token = localStorage.getItem('token');

  try {
    const response = await fetch(url, {
      method: 'GET',
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

export default getApiCall;