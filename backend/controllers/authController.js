const {User} = require('../model/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const handleLogin = async (req, res) => {
	const cookies = req.cookies;

	const {username, password} = req.body;
	if (!username || !password) return res.status(400).json({'message': 'Username and password are required.'});

	const foundUser = await User.getUser({username})
	if (!foundUser) return res.sendStatus(401); //Unauthorized
	// evaluate password
	const match = await bcrypt.compare(password, foundUser.password);
	if (match) {
		const accessToken = jwt.sign(
			{
				"UserInfo": {
					"username": foundUser.username,
					"email": foundUser.email,
					"userId": foundUser.userId
				}
			},
			process.env.ACCESS_TOKEN_SECRET,
			{expiresIn: '120s'}
		);
		const newRefreshToken = jwt.sign(
			{
				"username": foundUser.username,
				"email": foundUser.email,
				"userId": foundUser.userId
			},
			process.env.REFRESH_TOKEN_SECRET,
			{expiresIn: '7200s'}
		);

		// Changed to let keyword
		// 不包含当前refreshToken的数组
		let newRefreshTokenArray =
			!cookies?.jwt
				? foundUser.refreshToken
				: foundUser.refreshToken.filter(rt => rt !== cookies.jwt);

		// 如果登录时refreshToken存在
		if (cookies?.jwt) {

			/*
			Scenario added here:
				1) 用户已经登录但没有使用refreshToken或用户没有退出登录
				2) refreshToken被偷了
				3) If 1 & 2, reuse detection is needed to clear all RTs when user logs in
			*/
			const refreshToken = cookies.jwt;
			const foundToken = (await User.findUserByToken(refreshToken))?.refreshToken
			// Detected refresh token reuse!
			if (!foundToken) {
				// clear out ALL previous refresh tokens
				newRefreshTokenArray = [];
			}

			res.clearCookie('jwt', {httpOnly: true, sameSite: 'None', secure: true});
		}

		// Saving refreshToken with current user
		foundUser.refreshToken = [...newRefreshTokenArray, newRefreshToken];
		const result = await User.modifyUser({email: foundUser.email}, {refreshToken: foundUser.refreshToken});
		// Creates Secure Cookie with refresh token
		res.cookie('jwt', newRefreshToken, {
			httpOnly: true,
			secure: true,
			sameSite: 'None',
			maxAge: 24 * 60 * 60 * 1000
		});

		// Send authorization roles and access token to user
		res.json({accessToken});

	} else {
		res.sendStatus(401);
	}
}

module.exports = {handleLogin};