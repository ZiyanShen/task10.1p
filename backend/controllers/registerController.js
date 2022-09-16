const {User} = require('../model/User');
const bcrypt = require('bcrypt');

const handleNewUser = async (req, res) => {
	const {username, email, password} = req.body;
	if (!email || !password || !username) return res.status(400).json({'message': 'name, email and password are required.'});

	// check for duplicate usernames in the db
	const duplicate = await User.getUser({email}) || await User.getUser({username})
	if (duplicate) return res.sendStatus(409); //Conflict

	try {
		//encrypt the password
		const hashedPwd = await bcrypt.hash(password, 10);

		//create and store the new user
		const result = await User.addUser({
			username,
			email,
			password: hashedPwd
		})
		res.status(201).json({success: `New user ${email} created!`, msg: result});
	} catch (err) {
		res.status(500).json({'message': err.message});
	}
}

module.exports = {handleNewUser};