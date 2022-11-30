import React, { useEffect, useState } from 'react'
import { db } from '../firebase';
import { getDocs, collection, deleteDoc, doc } from "firebase/firestore";
import './Home.css'
import { useDispatch, useSelector } from 'react-redux';
import {login, logout, selectUser } from '../features/userSlice';

function Home() {

    const user = useSelector(selectUser);

    const [postLists, setPostLists] = useState([]);
    const postsCollectionRef = collection(db, "posts");

    useEffect(() => {
        const getPosts = async () => {
            const data = await getDocs(postsCollectionRef);
            setPostLists(data.docs.map((doc) => ({...doc.data(), id: doc.id })));
        }

        getPosts()
        /*db.collection("posts").orderBy("timestamp", "desc").onSnapshot((snapshot) =>
        setPostLists(
            snapshot.docs.map((doc) => ({
                id: doc.id,
                data: doc.data(),
            }))
        )
    );*/
    }, []);

    const deletePost = async (id) => {
        const postDoc = doc(db, "posts", id)
        await deleteDoc(postDoc)
    }
  return (
    <div className='homePage'>
      {postLists.map((post) =>{
        return(
            <div className='post'>
                <div className='postHeader'>
                    <div className='title'> 
                        <h1> {post.title} </h1>
                    </div>
                    <div className='deletePost'>
                        {user && post.id === user.uid && (<button onClick={() => deletePost(post.id)}> &#128465;</button>)}
                    </div>
                </div>
                <div className='postTextContainer'> {post.message} </div>
                <h3>@{post.author}</h3>
            </div>
        )
        })}
    </div>
  )
}

export default Home
