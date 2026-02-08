import React, { useEffect, useState } from 'react'
import axios from "axios"
const App = () => {

  const [notes, setNotes] = useState([])
  const [update, setupdate] = useState("")

  function fetchNotes(){
    axios.get("https://notify-7q9f.onrender.com/notes/").then((res)=>{
      setNotes(res.data.notes)
    })
  }

  useEffect(()=>{
    fetchNotes()
  },[])

 function submitHandler(e){
    e.preventDefault()

    const {title , description} = e.target.elements

    console.log(title.value , description.value)

    axios.post("https://notify-7q9f.onrender.com/notes/",{
      title: title.value,
      description: description.value,
    }).then((res)=>{
      console.log(res.data.message)
      fetchNotes()
    })
    .catch(err=>{console.log(err)})
 }

 function deleteNote(noteId){
    axios.delete("https://notify-7q9f.onrender.com/notes/"+noteId)
    .then((res)=>{
      console.log(res.data.message)
      fetchNotes()
    })
    .catch(err=>{console.log(err)})
 }

 function updateNote(noteId){

    console.log(noteId)

    axios.patch("https://notify-7q9f.onrender.com/notes/"+noteId,{
      description : update
    })
    .then((res)=>{
      console.log(res.data.message)
      fetchNotes()
    })
    .catch(err=>{console.log(err)})
 }

 function removeUpdateHandler(e){
    e.preventDefault()
    const {description} = e.target.elements
    setupdate(description.value)
 }

  return (
    <>
      <form className='' onSubmit={submitHandler}>
        <h1>Create Notes</h1>
        <input name='title' type="text" placeholder='enter test name'/>
        <input name='description' type="text" placeholder='enter description name'/>
        <button className='submit'>Submit</button>
      </form>
      <form className='updatenote' onSubmit={removeUpdateHandler}>
        <h1>Update Notes</h1>
        <input name='description' type="text" placeholder='enter description name'/>
        <button className='submit' >Submit</button>
      </form>
      <div className="notes">
        {notes.map((note,key)=>{
          return(
            <div key={key} className="note">
              <h1>{note.title}</h1>
              <p>{note.description}</p>
              <div className="buttons">
                <button className='delete' onClick={()=>{deleteNote(note._id)}}>Delete</button>
                <button className='update' onClick={()=>{updateNote(note._id)}}>Update</button>
              </div>
            </div>
          )
        })
        }
      </div>
    </>
  )
}

export default App


