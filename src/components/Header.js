import React from 'react';
import { useHistory } from 'react-router-dom'
import { ReactComponent as ArrowIcon } from '../icons/arrow.svg';

function Header(props) {
  const history = useHistory();

  return (
    <div className="Container">

      <div className="header">
        <ArrowIcon className="BackArrow" onClick={() => history.goBack()} />
        <h1 className="CenterTitle">{props.title}</h1>
        <div id="Temp"></div>
      </div>
    </div>
  );
}

export default Header;