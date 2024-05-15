const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const postsWithComments = {};

app.get('/posts', (req, res) => {
  res.send(postsWithComments);
});

app.post('/events', async (req, res) => {
  const { type, data } = req.body;
  handleEvent(type, data);
  res.send({ content: req.body });
});

app.listen(4002, async () => {
  console.log('Listening on 4002');

  // Fetch all events from event-bus
  const res = await axios.get('http://localhost:4005/events');
  for (let event of res.data) {
    handleEvent(event.type, event.data);
  }
});

function handleEvent(type, data) {
  if (type === 'PostCreated') {
    const { id, title } = data;
    postsWithComments[id] = { id, title, comments: [] };
  }
  if (type === 'CommentCreated') {
    const { id, content, postId, status } = data;
    const post = postsWithComments[postId];
    post.comments.push({ id, content, status });
  }

  if (type == 'CommentUpdated') {
    const { id, content, postId, status } = data;
    const post = postsWithComments[postId];
    const comment = post.comments.find((comment) => {
      return comment.id === id;
    });
    comment.status = status;
    comment.content = content;
  }
}
