import React from 'react';
import Header from './Header';

function Messages() {

  return (
    <div className="Container">
      <Header title="Messages" />
      <div id="Messages">
        <h2 id="NoNotifications">No Messages</h2>
        <button id="LogOut" className="colorButton">Create a Message</button>
      </div>
    </div>
  );
}

export default Messages;