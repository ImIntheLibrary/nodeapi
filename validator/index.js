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



	//continue to next middleware

	

/*
request(routes).get('/').end() // status not a function
request(app.use(routes)).get('/').end() // works
exports.createPostValidator = (res, req, next) => {
	check('title', "Write a title");
	check('title', 'Title must be 4-150 characters').isLength({
		min: 4,
		max: 150
	})

	//eq.checkBody('greetings').isLength({min: 1}) to await check('greetings').notEmpty().run(req)
	check('body', "Write a body").notEmpty();
	check('body', 'Body must be 4-150 characters').isLength({
		min: 4,
		max: 2000
	});
	//check for errors
	const errors = req.validationErrors()
	//if error show the first one has they happen
	if (errors) {
		const firstError = errors.map((error) => error.msg)[0]
		return res.status(400).json({error: firstError})
	}


	//continue to next middleware
	next();
	
}
*/