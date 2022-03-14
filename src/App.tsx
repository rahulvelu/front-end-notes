import React, { useState, useEffect } from "react";
import "./App.css";
// import axios from "axios";
import dummy_notes from "./dummy_notes";
import Note from "./component/Note";
import INote from "./interface/note.interface";

function App() {
  const [noteList, setNoteList] = useState<Array<INote>>([]);
  // let noteList: any[] = [];
  useEffect(() => {
    const lisrFromStorageString = localStorage.getItem("notes");
    if (lisrFromStorageString) {
      const lisrFromStorageArray = JSON.parse(lisrFromStorageString);
      setNoteList(lisrFromStorageArray);
    } else {
      setNoteList(dummy_notes);
    }
  }, []);

  useEffect(() => {
    console.log("saving");
    const noteListString = JSON.stringify(noteList);
    localStorage.setItem("notes", noteListString);
  }, [noteList]);

  // const notes = async () => {
  // console.log('hi')

  // try{
  //   const res = await axios.get('http://localhost:5000/notes')
  //   setNoteList(res.data.notes)
  //   console.log(noteList)
  //   // console.log(res)
  // } catch(err){
  //   console.error(err)
  // }

  // }

  const updateNoteItem = (updateNote: INote) => {
    const updatedList = noteList.map((noteItem: INote) => {
      if (noteItem._id === updateNote._id) {
        return updateNote;
      }
      return noteItem;
    });
    setNoteList(updatedList);
  };
  return (
    <div className="App">
      {/* <div>
        <button onClick={notes}>
          click
        </button>
      </div> */}
      <div>
        <div className="note-list">
          {noteList.map((noteItem, index) => {
            return (
              // <div key={index}>
              //   <h4>{noteItem?.text}</h4>
              //   <h5>{noteItem?.link}</h5>
              // </div>
              <Note note={noteItem} onNoteUpdate={updateNoteItem} key={index} />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
