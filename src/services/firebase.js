import { firebase, FieldValue } from "../lib/firebase";

export async function userDoesExist (userName) {
    const res =
        await firebase.firestore().collection("users")
            .where("username", "==", userName)
            .get();
    
    return res.docs.map((user) => user.data.length > 0)
}
