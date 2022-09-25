import {ref, uploadBytes, getBytes} from "firebase/storage";
import {storage} from "./firebase";


// 'file' comes from the Blob or File API

class FirebaseImages {
	static async uploadImages({filename, data}) {
		const storageRef = ref(storage, `images/${filename}`);
		return await uploadBytes(storageRef, data)
	}

	static async getImages({filename}) {
		const storageRef = ref(storage, `images/${filename}`);
		return await getBytes(storageRef)
	}
}

export {
	FirebaseImages
}