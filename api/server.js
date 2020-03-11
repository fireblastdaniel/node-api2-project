const express = require('express');

const blogPostRouter = require('../post/post-router');
//const commentRouter = require('../comment/comment-router');

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
  const query = req.query;

  console.log('query', query);
  res.status(json.query);
});

server.use('/api/posts', blogPostRouter);
//server.use('api/comments', commentRouter);

module.exports = server;
