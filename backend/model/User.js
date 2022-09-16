const {db} = require("../config/firebase")
const md5 = require("md5")
const {FieldValue} = require('firebase-admin/firestore');

class User {
	static #users = db.collection("users")

	static async #getUserIdByField(fieldName, fieldValue) {
		let userId
		const snapshot = await User.#users.where(fieldName, "==", fieldValue).get()
		if (snapshot.empty) {
			userId = ""
		} else {
			snapshot.forEach(doc => {
				const data = doc.data()
				if (data[fieldName] === fieldValue) {
					userId = doc.id
				}
			})
		}
		return userId
	}

	static async addUser({username, email, password}) {
		const userId = md5(email)
		return await User.#users.doc(userId).set({
			username,
			email,
			password,
			refreshToken: [],
			timestamp: FieldValue.serverTimestamp()
		})

	}

	static async modifyUser({email, username}, data) {
		let userId
		if (email) {
			userId = md5(email)
		} else {
			userId = await User.#getUserIdByField("username", username)
		}
		if (!userId) throw Error("User not found")
		return await User.#users.doc(userId).update({
			...data,
			timestamp: FieldValue.serverTimestamp(),
		})
	}

	static async deleteUser(email) {
		const userId = await User.#getUserIdByField("email", email)
		if (!userId) throw Error("User not found")
		return await User.#users.doc(userId).delete()
	}

	static async getUser({email, username}) {
		let userId
		if (email) {
			userId = await User.#getUserIdByField("email", email)
		} else {
			userId = await User.#getUserIdByField("username", username)
		}
		if (!userId) return null
		const user = await User.#users.doc(userId).get()
		return user.data()
	}

	static async findUserByToken(refreshToken) {
		const snapshot = await User.#users.where("refreshToken", "array-contains", refreshToken).get();
		let user = {}
		if (!snapshot.empty) {
			snapshot.forEach(doc => {
				user = doc.data()
			})
		}
		return user
	}
}


module.exports = {
	User
}

