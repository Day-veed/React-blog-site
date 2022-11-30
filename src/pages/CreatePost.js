import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';
import { db, timestamp } from '../firebase';
import SignInOutContainer from './SignInOutContainer';
import { useNavigate } from 'react-router-dom';
import firebase from 'firebase/compat/app';

function CreatePost() {

    const user = useSelector(selectUser);
    const navigate = useNavigate()

    const [title, setTitle] = useState("");
    const [pstText, setPostText] = useState("");

    const createpost = async (e) => {
        e.preventDefault();

        await db.collection('posts').add({
            author: user.displayName,
            id: user.uid,
            description: user.email,
            title: title,
            message: pstText,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });
        setTitle("");
        setPostText("");
        navigate("/")
    };
  return (
    <div>
      {!user ? (
        <SignInOutContainer />
      ) : (
        <>
        <h5>{user.email}</h5>
        <h2>{user.displayName}</h2>
        <div className='createPostPage'>
            <div className='cpContainer'>
                <h1>Create A Post</h1>
                <div className='inputGp'>
                    <label>Title:</label>
                    <input placeholder='Title...' onChange={(e) => {setTitle(e.target.value);}}/>
                </div>
                <div className='inputGp'>
                    <label>Post:</label>
                    <input placeholder='Post...' onChange={(e) => {setPostText(e.target.value);}}/>
                </div>
                <button onClick={createpost}>Submit Post</button>
            </div>
        </div>
        </>
      )}
    </div>
  )
}

export default CreatePost
