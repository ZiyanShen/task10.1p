const axios = require("axios")
const photo = async (req, res) => {
	const {limit, page} = req.query
	const response = await axios.get(`https://picsum.photos/v2/list?page=${page}&limit=${limit}`)
	res.status(200).json(response.data)
}
module.exports = {
	photo
}