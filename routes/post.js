const express = require('express');
const postController = require("../controllers/post");
const validator = require('../validator')
const { check, validationResult } = require('express-validator');

const router = express.Router();
//get posts
router.get("/", postController.getPosts);
//error validation - yes, this is not the ideal way to do it. This is a patch change because of shift to V
//6 of express-validator because I didn't really have time to look over the library.
router.post("/post",
	//checks - these were arbitrary. Some good thigns to check would be for numbers or dates.
	[check('title', "Write a title").notEmpty(),
	check('title', 'Title must be 4-150 characters').isLength({
		min: 4,
		max: 150
	}),

	check('body', "Write a body").notEmpty(),
	check('body', 'Body must be 4-150 characters').isLength({
		min: 4,
		max: 2000
	}),
	//check for errors
	(req, res, next) => {
		const errors = validationResult(req);
		//if error show the first one has they happen
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array().map(error => error.msg)[0] });
		}
		else{
			console.log("No problemo")
			return next();
			//return res.status(400).json({error: firstError})

	}
}
	]);

	//send post
router.post("/post", postController.createPost);

module.exports = router;



/*
const getPosts = (req, res) => {
	res.send("hello  world from node js")
}
*/