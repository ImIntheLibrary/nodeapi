const express = require('express');
const postController = require("../controllers/post");
const validator = require('../validator')
const { check, validationResult } = require('express-validator');

const router = express.Router();

router.get("/", postController.getPosts);
router.post("/post",
	[check('title', "Write a title").notEmpty(),
	check('title', 'Title must be 4-150 characters').isLength({
		min: 4,
		max: 150
	}),

	//eq.checkBody('greetings').isLength({min: 1}) to await check('greetings').notEmpty().run(req)
	check('body', "Write a body").notEmpty(),
	check('body', 'Body must be 4-150 characters').isLength({
		min: 4,
		max: 2000
	}),
	//check for errors
	(req, res, next) => {
		const errors = validationResult(req);
		//if error show the first one has they happen
		//console.log("running", res.status(400).json(errors.array().firstError))
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
router.post("/post", postController.createPost);

module.exports = router;



/*
const getPosts = (req, res) => {
	res.send("hello  world from node js")
}
*/