import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import "./App.css"
import { login, logout, selectUser } from "./features/userSlice"
import Feed from "./components/Feed"
import { auth } from "./services/firebase"
import Header from "./components/Header"
import Login from "./components/Login"
import SideBar from "./components/SideBar"
import Widgets from "./components/Widgets"

function App() {
    const user = useSelector(selectUser)
    const dispatch = useDispatch()

    useEffect(() => {
        auth.onAuthStateChanged((userCredential) => {
            if (userCredential) {
                //user is logged in
                dispatch(
                    login({
                        email: userCredential.email,
                        uid: userCredential.uid,
                        displayName: userCredential.displayName,
                        photoURL: userCredential.photoURL,
                    })
                )
            } else {
                //user is logged out
                dispatch(logout())
            }
        })
    }, [dispatch])

    return (
        <div className="app">
            <Header />
            {!user ? (
                <Login />
            ) : (
                <div className="app__body">
                    <SideBar />
                    <Feed />
                    <Widgets />
                </div>
            )}
        </div>
    )
}

export default App
