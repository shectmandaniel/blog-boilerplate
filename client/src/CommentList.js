import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function CreateComment({ postId }) {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      const res = await axios.get(
        `http://localhost:4001/posts/${postId}/comments`
      );
      setComments(res.data);
    };

    fetchComments();
  }, []);

  const renderedComments = Object.values(comments).map((comment) => {
    return <li key={comment.id}>{comment.content}</li>;
  });

  return <ul>{renderedComments}</ul>;
}
