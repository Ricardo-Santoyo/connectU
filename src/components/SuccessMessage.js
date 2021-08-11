import React, { useEffect } from 'react';

function SuccessMessage(props) {

  useEffect(() => {
    const timer = setTimeout(() => props.setMessage(null), 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div id="SuccessMessage">{props.message}</div>
  );
}

export default SuccessMessage;