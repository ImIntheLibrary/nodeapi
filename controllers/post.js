const Post = require('../models/post');


exports.getPosts = (req, res) => {
	//handle GET requests
	const posts = Post.find().select("_id title body")
	.then(posts => {
		res.status(200).json({posts});
	})
	.catch(err => console.log(err))
};

exports.createPost = (req, res) => {
	//'create' post.
	const post = new Post(req.body);
	console.log("CREATING POST", post);
	console.log("CREATING POST: ", req.body);
	post.save()
	.then(result => {
		res.json({
			post: result
		});
	})

	
}