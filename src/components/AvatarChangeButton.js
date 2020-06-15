import React, { useContext } from 'react'
import { Button, message } from 'antd'
import { storage, auth, firestore } from '../firebase'
import { UserContext } from '../contexts/UserContextProvider'

export default function AvatarChangeButton({user}) {
  const { setSignedUser } = useContext(UserContext)

  function handleClick() {
    document.getElementById("fileInput").click()
  }

  function handleUpload(e) {
    const img = e.target.files[0]
    if (!img) return 
    
    const uploadTask = storage.ref(`images/${user.uid}`).put(img)
    const userRef = firestore.collection('users').doc(user.uid)
    uploadTask.on(
      'state_changed',
      snapshot => {},
      error => {
        console.log(error)
      },
      () => {
        storage
          .ref('images')
          .child(user.uid)
          .getDownloadURL()
          .then(url => {
            auth.currentUser.updateProfile({photoURL: url})
            firestore.runTransaction((transaction) => {
              return transaction.get(userRef).then((user) => {
                if (!user.exists)
                  return `Failed to update photoURL`
                transaction.update(userRef, { photoURL: url})
                return `Successfully update photoURL`
              })
            })
              .then(r => {
                setSignedUser(u => ({...u, photoURL: url}))
                message.success(r)
              })
              .catch(e => {
                message.error(e)
              })
          })
      }
    )
  }

  return (
    <>
      <div style={{height: 0, overflow: 'hidden'}}>
        <input type="file" id="fileInput" name="fileInput" onChange={handleUpload}/>
      </div>
      <Button type='dashed' block onClick={handleClick}>アバターを変更</Button>
    </>
  )
}