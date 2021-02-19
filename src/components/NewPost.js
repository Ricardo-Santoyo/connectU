import React, { useEffect, useRef, useState } from 'react';
import defaultIcon from '../images/default-user-icon.jpg';
import handleErrors from '../apiCalls/handleErrors';

function NewPost(props) {
  const textareaRef = useRef(null)
  const [value, setValue] = useState('');
  const [charCount, setCharCount] = useState(300);
  const [invalidForm, setInvalidForm] = useState(true);

  useEffect(() => {
    textareaRef.current.style.height = 'auto';
    textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;

    if (/\S/.test(value) && charCount >= 0) {
      setInvalidForm(false);
    } else {
      setInvalidForm(true);
    }
  }, [value, charCount]);

  function handleSubmit(e) {
    e.preventDefault();
    const data = {post: {body: value}}
    fetch(`http://localhost:3001/api/users/${props.userID}/posts`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${props.token}`
      },
      body: JSON.stringify(data)
    })
    .then(handleErrors)    
    .then(response => response.json())
    .then(data => props.setPostsData([data.data, ...props.postsData]))
    .catch(error => console.log(error))
  };

  return (
    <div id="NewPost">
      <img src={defaultIcon} alt='User Icon' className="PostUserIcon"></img>
      <form onSubmit={handleSubmit}>
        <textarea
          ref={textareaRef}
          onChange={(e) => {setCharCount(300 - e.target.value.length); setValue(e.target.value)}}
          placeholder="What's happening?"
        />
        <div>
          <span className={charCount <= 20 ? "redText" : null}>{charCount}</span>
          <button className={invalidForm ? "invalidForm": "colorButton"} type="submit">Post</button>
        </div>
      </form>
    </div>
  );
}

export default NewPost;