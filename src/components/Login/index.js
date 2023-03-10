import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { login } from "../../features/userSlice"
import {
    auth,
    createUserWithEmailAndPassword,
    updateProfile,
    signInWithEmailAndPassword,
} from "../../services/firebase"
import "./Login.css"

function Login() {
    const [name, setName] = useState("")
    const [profilePic, setProfilePic] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const dispatch = useDispatch()

    const loginToApp = (e) => {
        e.preventDefault()
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                dispatch(
                    login({
                        email: userCredential.user.email,
                        uid: userCredential.user.uid,
                        displayName: userCredential.user.displayName,
                        profileURL: userCredential.user.photoURL,
                    })
                )
            })
            .catch((error) => alert(error))
    }

    const register = () => {
        if (!name) {
            return alert("Please enter a full name!")
        }
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user
                updateProfile(user, {
                    displayName: name,
                    photoURL: profilePic,
                }).then(() => {
                    dispatch(
                        login({
                            email: userCredential.user.email,
                            uid: userCredential.user.uid,
                            displayName: userCredential.user.displayName,
                            photoURL: userCredential.user.photoURL,
                        })
                    )
                })
            })
            .catch((error) => {
                const errorCode = error.errorCode
                const errorMessage = error.message
                alert(`Error code: ${errorCode}, ${errorMessage}`)
            })
    }

    return (
        <div className="login">
            <img
                src="https://upload.wikimedia.org/wikipedia/commons/4/4e/LinkedIn_Logo_%28with_%C2%AE%29.svg"
                alt="linkedin"
            />

            <form>
                <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Full name (required if registering)"
                    type="text"
                />
                <input
                    value={profilePic}
                    onChange={(e) => setProfilePic(e.target.value)}
                    placeholder="Profile pic URL (optional)"
                    type="text"
                />
                <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    type="email"
                />
                <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    type="password"
                />
                <button type="submit" onClick={loginToApp}>
                    Sign In
                </button>
            </form>
            <p>
                Not a member?{" "}
                <span className="login__register" onClick={register}>
                    Register Now
                </span>
            </p>
        </div>
    )
}

export default Login
