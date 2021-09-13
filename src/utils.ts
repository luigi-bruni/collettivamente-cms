import firebase from "firebase/app"

export function isOwner(user?: firebase.User | null) {
  return user?.email === "collettivamente.blog@gmail.com"
}