import React, { useEffect, useRef, useState } from 'react';

function PostForm(props) {
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

  return (
    <form onSubmit={(e) => props.handleSubmit(value, e)}>
      <textarea
        ref={textareaRef}
        onChange={(e) => {setCharCount(300 - e.target.value.length); setValue(e.target.value)}}
        placeholder={props.placeholder}
      />
      <div>
        <span className={charCount <= 20 ? "redText" : null}>{charCount}</span>
        <button className={invalidForm ? "invalidForm": "colorButton"} type="submit">Post</button>
      </div>
    </form>
  );
}

export default PostForm;