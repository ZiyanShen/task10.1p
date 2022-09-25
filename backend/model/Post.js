const {db} = require("../config/firebase")
const {FieldValue, Timestamp} = require('firebase-admin/firestore');

class Post {
	static #posts = db.collection("posts")

	static async addPost({userId, post}) {
		const {title, tags, user, ...extras} = post
		return await Post.#posts.add({
			userId,
			title,
			tags,
			user,
			data: JSON.stringify(extras),
			timestamp: FieldValue.serverTimestamp()
		})

	}

	static async getPosts(filter) {
		const {title, tags, userId, dateRange} = filter
		let posts = Post.#posts
		if (filter.timestamp) {
			let timestamp
			const [seconds, nanoseconds] = filter.timestamp
			if (seconds) {
				timestamp = new Timestamp(seconds, nanoseconds || 0)
			}
			if (timestamp) {
				posts = Post.#posts.where("timestamp", ">=", timestamp)
			}
		}
		if (dateRange && dateRange.length >= 2) {
			const min = new Timestamp(Number(dateRange[0]), 0)
			const max = new Timestamp(Number(dateRange[1]), 0)
			console.log(min.toDate(), max)
			posts = Post.#posts.where("timestamp", ">=", min).where("timestamp", "<=", max)
		}
		if (title) {
			posts = Post.#posts.where("title", ">=", title).where("title", '<=', title + '\uf8ff')
		}
		if (tags && Object.entries(tags).length > 0) {
			tags.forEach(tag => {
				posts = Post.#posts.where("tags", "array-contains", tag)
			})
		}

		if (userId) {
			posts = Post.#posts.where("userId", "==", userId)
		}
		const snapshot = await posts.get()
		const datas = []
		if (!snapshot.empty) {
			snapshot.forEach(doc => {
				datas.push({...doc.data(), postId: doc.id})
			})
		}
		return datas
	}

	static async deletePosts({postId}) {
		return await Post.#posts.doc(postId).delete()
	}


}


module.exports = {
	Post
}