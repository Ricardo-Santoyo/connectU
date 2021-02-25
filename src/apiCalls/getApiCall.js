import handleErrors from './handleErrors';

async function getApiCall(url) {
  const token = localStorage.getItem('token');

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    await handleErrors(response);
    const data = response.json();
    return data;
  } catch (error) {
    return console.log(error);
  }
};

export default getApiCall;