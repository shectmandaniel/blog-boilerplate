const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const commentsByPostId = {};

app.get('/posts/:id/comments', (req, res) => {
  res.send(commentsByPostId[req.params.id] || []);
});

app.get('/posts/comments', (req, res) => {
  res.send(commentsByPostId);
});

app.post('/posts/:id/comments', async (req, res) => {
  const id = randomBytes(4).toString('hex');
  const { content } = req.body;
  const postId = req.params.id;

  const comments = commentsByPostId[postId] || [];
  comments.push({ id, content, status: 'pending' });
  commentsByPostId[postId] = comments;

  await axios
    .post('http://event-bus-srv:4005/events', {
      type: 'CommentCreated',
      data: {
        id,
        content,
        postId,
        status: 'pending',
      },
    })
    .catch((err) => {
      console.log(err);
    });

  res.status(201).send(comments);
});

app.post('/events', async (req, res) => {
  console.log('Received Event', req.body);
  const { type, data } = req.body;
  if (type === 'CommentModerated') {
    const { id, postId, status, content } = data;
    const comments = commentsByPostId[postId];
    const comment = comments.find((comment) => {
      return comment.id === id;
    });
    comment.status = status;
    await axios
      .post('http://event-bus-srv:4005/events', {
        type: 'CommentUpdated',
        data: {
          id,
          postId,
          status,
          content,
        },
      })
      .catch((err) => {
        console.log(err);
      });
  }
});

app.listen(4001, () => {
  console.log('Listening on 4001');
});
