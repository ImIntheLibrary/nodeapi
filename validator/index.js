//This is supposed to do the error handling. V6 of express-validator sucks and I was running out of time,
//so I put that in the routes folder. Don't kill me please. Feel free to fix this if yo usee an easy way.
const { check, validationResult } = require('express-validator');
const createPostValidator = (err, res, req, next) => {
	check('title', "Write a title").notEmpty().run(req);
	check('title', 'Title must be 4-150 characters').isLength({
		min: 4,
		max: 150
	}).run(req);

	//eq.checkBody('greetings').isLength({min: 1}) to await check('greetings').notEmpty().run(req)
	check('body', "Write a body").notEmpty().run(req);
	check('body', 'Body must be 4-150 characters').isLength({
		min: 4,
		max: 2000
	}).run(req);
	//check for errors
	const errors = validationResult(req)
	//if error show the first one has they happen
	//console.log("running", res.status(400).json(errors.array().firstError))
	if (errors.notEmpty) {
		return res.status(400).json({ errors: errors.array() });
	}
	else{
		return next();
		//return res.status(400).json({error: firstError})
	}
	
}



	