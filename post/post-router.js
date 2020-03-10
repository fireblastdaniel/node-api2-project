const express = require('express');

const Posts = require('../data/db');

const router = express.Router();

//201 - saves new post, returns newly created post
//400 - missing title/contents error { errorMessage: 'Please provide title and contents for the post.' }
//500 - catch error { error: 'There was an error while saving the post to the database.' }
router.post('/api/posts', (req, res) => {});

//201 - saves enw comment, returns newly created comment
//400 - missing text error { errorMessage: 'Please provide text for the comment.' }
//404 - id dne error { message: 'The post with the specified ID does not exist.' }
router.post('/api/posts/:id/comments', (req, res) => {});

//200 - returns all posts
//500 - catch error { error: 'The posts information could not be retrieved.' }
router.get('/api/posts', (req, res) => {});

//200 - returns post at id
//404 - id dne error { message: 'The post with the specified ID does not exist.' }
//500 - catch error { error: 'The post information could not be retrieved.' }
router.get('/api/posts/:id', (req, res) => {});

//200 - returns comments for post at id
//404 - id dne error { message: 'The post with the specified ID does not exist.' }
//500 - catch error { error: 'The post information could not be retrieved.' }
router.get('/api/posts/:id/comments', (req, res) => {});

//200 - returns deleted post at id
//404 - id dne error { message: 'The post with the specified ID does not exist.' }
//500 - catch error { error: 'The post could not be removed.' }
router.delete('/api/posts/:id', (req, res) => {});

//200 - update post and return newly updated post
//400 - missing title or contents error { errorMessage: 'Please provide title and contents for the post.' }
//404 - id dne error { message: 'The post with the specified ID does not exist.' }
//500 - catch error { error: 'The post information could not be modified.' }
router.put('api/posts/:id', (req, res) => {});
