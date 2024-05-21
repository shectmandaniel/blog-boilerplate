import React, { useState } from 'react';
import axios from 'axios';

export default function CommentCreate({ postId }) {
  const [content, setContent] = useState('');

  const onSubmit = async (event) => {
    event.preventDefault();
    console.log('postId:', postId);
    console.log('on submit content:', content);
    await axios.post(`http://posts.com/posts/${postId}/comments`, {
      content,
    }).catch((err) => {
      console.error('Error at onSubmit commentCreate:', err);
    });

    setContent('');
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className="form-floating">
          <label> New Comment</label>

          <input
            type="text"
            className="form-control"
            id="floatingInput"
            placeholder="Enter your comment"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <button className="btn btn-primary mt-3">Submit</button>
      </form>
    </div>
  );
}
