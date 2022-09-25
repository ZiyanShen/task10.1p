const {Post} = require("../model/Post")
const addPost = async (req, res) => {
	const res2 = await Post.addPost({userId: req.userId, post: req.body})
	res.json(res2)

}
const getPost = async (req, res) => {
	console.log(req.query)
	res.json(await Post.getPosts({...req.query}))
}
const deletePost = async (req, res) => {
	res.json(await Post.deletePosts({...req.query}))
}
module.exports = {
	addPost,
	getPost,
	deletePost
}