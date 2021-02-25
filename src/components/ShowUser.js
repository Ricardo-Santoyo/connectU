import React, { useEffect, useState } from 'react';
import Header from './Header';
//import defaultIcon from '../images/default-user-icon.jpg';
import getApiCall from '../apiCalls/getApiCall';


function ShowUser(props) {
  const [user, setUser] = useState();

  useEffect(() => {
    getApiCall(`http://localhost:3001/api/users/9`)
    .then(data => setUser(data.data))
    .catch(error => error);
  }, []);

  return (
    <div className="Container">

      <Header title={user ? user.attributes.name : 'User'}/>
      {user ?
      <div id="ShowUser">
      </div>
      : null}
    </div>
  );
}

export default ShowUser;