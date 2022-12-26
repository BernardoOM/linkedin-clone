import React, { useState, useEffect } from "react"
import "./Feed.css"
import CreateIcon from "@mui/icons-material/Create"
import InputOption from "../InputOption"
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto"
import SubscriptionsIcon from "@mui/icons-material/Subscriptions"
import EventNoteIcon from "@mui/icons-material/EventNote"
import CalendarViewDayIcon from "@mui/icons-material/CalendarViewDay"
import Post from "../Post"
import { db, getServerTimestamp } from "../../services/firebase"
import { collection, getDocs, addDoc, query, orderBy } from "firebase/firestore"
import { useSelector } from "react-redux"
import { selectUser } from "../../features/userSlice"
import FlipMove from "react-flip-move"

function Feed() {
    const user = useSelector(selectUser)
    const [input, setInput] = useState("")
    const [posts, setPosts] = useState([])

    useEffect(() => {
        ;(async () => {
            const posts = await getPosts()
            setPosts(posts)
        })()
    }, [posts])

    async function getPosts() {
        const postsCol = collection(db, "posts")
        const q = query(postsCol, orderBy("timestamp", "desc"))
        const postSnapshot = await getDocs(q)
        const postList = postSnapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
        }))
        return postList
    }

    const sendPost = (e) => {
        e.preventDefault()
        const postsCol = collection(db, "posts")
        addDoc(postsCol, {
            name: user.displayName,
            description: user.email,
            message: input,
            photoUrl: user.profileURL || "",
            timestamp: getServerTimestamp(),
        })

        setInput("")
    }

    return (
        <div className="feed">
            <div className="feed__inputContainer">
                <div className="feed__input">
                    <CreateIcon />
                    <form>
                        <input
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            type="text"
                            placeholder="What do you want to talk about?"
                        />
                        <button onClick={sendPost} type="submit">
                            Send
                        </button>
                    </form>
                </div>
                <div className="feed__inputOptions">
                    <InputOption Icon={InsertPhotoIcon} title="Photo" color="#378fe9" />
                    <InputOption Icon={SubscriptionsIcon} title="Video" color="#5f9b41" />
                    <InputOption Icon={EventNoteIcon} title="Event" color="#c37d16" />
                    <InputOption Icon={CalendarViewDayIcon} title="Write article" color="#e16745" />
                </div>
            </div>
            <FlipMove>
                {posts.map(({ id, data: { name, description, message, photoUrl } }) => {
                    return (
                        <Post
                            key={id}
                            name={name}
                            description={description}
                            message={message}
                            photoUrl={photoUrl}
                        />
                    )
                })}
            </FlipMove>
        </div>
    )
}

export default Feed
