const express = require('express');

const Posts = require('../data/db');

const router = express.Router();

//201 - saves new post, returns newly created post
//400 - missing title/contents error { errorMessage: 'Please provide title and contents for the post.' }
//500 - catch error { error: 'There was an error while saving the post to the database.' }
//WORKING
router.post('/', (req, res) => {
  const inputPost = req.body;
  if (!inputPost.title || !inputPost.contents)
    res.status(400).json({
      errorMessage: 'Please provide title and contents for the post.'
    });
  else
    Posts.insert(req.body)
      .then(post => {
        console.log;
        newPost = { ...inputPost, ...post };
        res.status(201).json(newPost);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: 'There was an error while saving the post to the database.'
        });
      });
});

//201 - saves new comment, returns newly created comment
//400 - missing text error { errorMessage: 'Please provide text for the comment.' }
//404 - id dne error { message: 'The post with the specified ID does not exist.' }
//500 - catch error { error: 'There was an error while saving the post to the database.' }
//WORKING
router.post('/:id/comments', (req, res) => {
  const { id } = req.params;
  let idDoesExist = false;
  let newComment = { ...req.body, post_id: id };
  Posts.findById(id)
    .then(post => {
      post.length !== 0 ? (idDoesExist = true) : null;
      if (!idDoesExist)
        res
          .status(404)
          .json({ message: 'The post with the specified ID does not exist.' });
    })
    .catch(err => console.log(err));
  if (!newComment.text)
    res
      .status(400)
      .json({ errorMessage: 'Please provide text for the comment.' });
  else {
    Posts.insertComment(newComment)
      .then(comment => {
        Posts.findCommentById(comment.id).then(com => (newComment = com));
        res.status(201).json(newComment);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: 'There was an error while saving the comment to the database.'
        });
      });
  }
});

//200 - returns all posts
//500 - catch error { error: 'The posts information could not be retrieved.' }
//WORKING
router.get('/', (req, res) => {
  Posts.find()
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(err => {
      console.log(err);
      res
        .status(500)
        .json({ error: 'The posts information could not be retrieved.' });
    });
});

//200 - returns post at id
//404 - id dne error { message: 'The post with the specified ID does not exist.' }
//500 - catch error { error: 'The post information could not be retrieved.' }
//WORKING
router.get('/:id', (req, res) => {
  const { id } = req.params;
  Posts.findById(id)
    .then(post => {
      post.length !== 0
        ? res.status(200).json(post)
        : res.status(404).json({
            message: 'The post with the specified ID does not exist.'
          });
    })
    .catch(err => {
      console.log(err);
      res
        .status(500)
        .json({ error: 'The post information could not be retrieved.' });
    });
});

//200 - returns comments for post at id
//404 - id dne error { message: 'The post with the specified ID does not exist.' }
//500 - catch error { error: 'The post information could not be retrieved.' }
//WORKING
router.get('/:id/comments', (req, res) => {
  const { id } = req.params;
  let idDoesExist = false;

  Posts.findById(id).then(post =>
    post.length !== 0 ? (idDoesExist = true) : null
  );

  Posts.findPostComments(id)
    .then(comments => {
      if (idDoesExist) {
        res.status(200).json(comments);
      } else {
        res
          .status(404)
          .json({ message: 'The post with the specified ID does not exist.' });
      }
    })
    .catch(err => {
      console.log(err);
      res
        .status(500)
        .json({ error: 'The post information could not be retrieved.' });
    });
});

//200 - returns deleted post at id
//404 - id dne error { message: 'The post with the specified ID does not exist.' }
//500 - catch error { error: 'The post could not be removed.' }
//WORKING
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  let removedPost = {};
  Posts.findById(id).then(post => {
    console.log(post);
    removedPost = post;
  });
  Posts.remove(id)
    .then(numRemoved => {
      if (numRemoved) {
        res.status(200).json(removedPost);
      } else {
        res
          .status(404)
          .json({ message: 'The post with the specified ID does not exist.' });
      }
    })
    .catch(err =>
      res.status(500).json({ error: 'The post could not be removed.' })
    );
});

//200 - update post and return newly updated post
//400 - missing title or contents error { errorMessage: 'Please provide title and contents for the post.' }
//404 - id dne error { message: 'The post with the specified ID does not exist.' }
//500 - catch error { error: 'The post information could not be modified.' }
//WORKING
router.put('/:id', (req, res) => {
  const { id } = req.params;
  let updatedPost = req.body;
  let idDoesExist = false;
  Posts.findById(id).then(post =>
    post.length !== 0
      ? (idDoesExist = true)
      : res
          .status(404)
          .json({ message: 'The post with the specified ID does not exist.' })
  );
  if (!updatedPost.title || !updatedPost.contents) {
    res.status(400).json({
      errorMessage: 'Please provide title and contents for the post.'
    });
  } else {
    Posts.update(id, updatedPost)
      .then(changedCount => {
        Posts.findById(id).then(post => {
          if (changedCount) res.status(200).json(post);
        });
      })
      .catch(err =>
        res
          .status(500)
          .json({ error: 'The post information could not be modified.' })
      );
  }
});

module.exports = router;
