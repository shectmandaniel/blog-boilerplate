import React, { useState } from 'react';
import axios from 'axios';

export default function PostCreate() {
  const [title, setTitle] = useState('');

  const onSubmit = async (event) => {
    event.preventDefault();
    await axios.post('http://localhost:4000/posts', {
      title,
    });

    setTitle('');
  };

  return (
    <div>
      <h1>Create Post</h1>
      <form onSubmit={onSubmit}>
        <div className="form-floating">
          <label> Title</label>

          <input
            type="text"
            className="form-control"
            id="floatingInput"
            placeholder="Enter your title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <button className="btn btn-primary mt-3">Submit</button>
      </form>
    </div>
  );
}
