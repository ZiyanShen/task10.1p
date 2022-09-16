const {User} = require('../model/User');
const jwt = require('jsonwebtoken');

const handleRefreshToken = async (req, res) => {
	const cookies = req.cookies;
	if (!cookies?.jwt) return res.sendStatus(401);
	const refreshToken = cookies.jwt;
	res.clearCookie('jwt', {httpOnly: true, sameSite: 'None', secure: true});

	const foundUser = await User.findUserByToken(refreshToken)

	// Detected refresh token reuse!
	if (!foundUser) {
		jwt.verify(
			refreshToken,
			process.env.REFRESH_TOKEN_SECRET,
			async (err, decoded) => {
				if (err) return res.sendStatus(403); //Forbidden
				// Delete refresh tokens of hacked user
				const hackedUser = await User.getUser({username: decoded.username})
				hackedUser.refreshToken = [];
				const result = await User.modifyUser({username: foundUser.username}, {refreshToken: hackedUser.refreshToken});
			}
		)
		return res.sendStatus(403); //Forbidden
	}

	const newRefreshTokenArray = foundUser.refreshToken.filter(rt => rt !== refreshToken);

	// evaluate jwt
	jwt.verify(
		refreshToken,
		process.env.REFRESH_TOKEN_SECRET,
		async (err, decoded) => {
			if (err) {
				// expired refresh token
				foundUser.refreshToken = [...newRefreshTokenArray];
				const result = await User.modifyUser({username: foundUser.username}, {refreshToken: foundUser.refreshToken});
			}
			if (err || foundUser.username !== decoded.username) return res.sendStatus(403);

			// Refresh token was still valid
			const accessToken = jwt.sign(
				{
					"UserInfo": {
						"username": decoded.username,
						"email": decoded.email
					}
				},
				process.env.ACCESS_TOKEN_SECRET,
				{expiresIn: '10s'}
			);

			const newRefreshToken = jwt.sign(
				{"username": foundUser.username},
				process.env.REFRESH_TOKEN_SECRET,
				{expiresIn: '15s'}
			);
			// Saving refreshToken with current user
			foundUser.refreshToken = [...newRefreshTokenArray, newRefreshToken];
			const result = await User.modifyUser({username:foundUser.username},{refreshToken:foundUser.refreshToken});

			// Creates Secure Cookie with refresh token
			res.cookie('jwt', newRefreshToken, {
				httpOnly: true,
				secure: true,
				sameSite: 'None',
				maxAge: 24 * 60 * 60 * 1000
			});

			res.json({accessToken})
		}
	);
}

module.exports = {handleRefreshToken}