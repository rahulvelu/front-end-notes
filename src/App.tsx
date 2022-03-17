import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import dummy_notes from "./dummy_notes";
import Note from "./component/Note";
import INote from "./interface/note.interface";
import { getNotes, createNotes, deleteNotes, updateNotes } from "./service/noteService";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';


function App() {
  const [noteList, setNoteList] = useState<Array<INote>>([]);
  const [showAddNoteModal, setShowAddNoteModal] = useState(false);
  const [newNote, setNewNote] = useState<Partial<INote>>({
    link: '',
    text: '',
  })

  const handleOpen = () => {

    setShowAddNoteModal(true)
  };
  const handleClose = () => {

    setNewNote({
      link: '',
      text: '',
    })
    setShowAddNoteModal(false)
  };

  useEffect(() => {

    getNotesFromServer();

  }, []);

  const getNotesFromServer = async () => {
    const notes = await getNotes()
    setNoteList(notes)

  }

  const updateNoteItem = async (updateNote: INote) => {

    const noteFromServer = await updateNotes(updateNote);
    const updatedList = noteList.map((noteItem: INote) => {
      if (noteItem._id === noteFromServer._id) {
        return noteFromServer;
      }
      return noteItem;
    });
    setNoteList(updatedList);
  };

  const deleteNoteItem = async (noteToDelete: INote) => {
    await deleteNotes(noteToDelete._id);
    const remainingNotes = noteList.filter((noteItem) => {
      return noteItem._id !== noteToDelete._id;
    })
    setNoteList(remainingNotes)

  }

  const addNote = async () => {
    const savedNote = await createNotes(newNote);
    setNoteList([...noteList, savedNote])
    handleClose();
  }


  return (
    <div className="App">
      <Box mt={3} mb={8}>
        <Button onClick={handleOpen}>Add Notes</Button>
        <Modal
          open={showAddNoteModal}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={{ width: '100%', height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <Box sx={{ background: '#fff', width: '300px', height: '50%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-around' }}>
              <TextField onChange={(e) => {
                const newVal = e.target.value;
                setNewNote({
                  ...newNote,
                  text: newVal
                })
              }} id="outlined-basic" label="Enter your note text" multiline maxRows={3} variant="outlined" />
              <TextField onChange={(e) => {
                const newVal = e.target.value;
                setNewNote({
                  ...newNote,
                  link: newVal
                })
              }} id="outlined-basic" label="link" variant="outlined" />
              <Box sx={{ width: '300px', display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                <Button onClick={handleClose} style={{ background: '#00FFFF' }} variant="contained">cancel</Button>
                <Button variant="contained" onClick={addNote}>save</Button>
              </Box>
            </Box>
          </Box>
        </Modal>
      </Box>
      <div className="note-list">
        {noteList.map((noteItem, index) => {
          return (
            <Note note={noteItem} onNoteDelete={deleteNoteItem} onNoteUpdate={updateNoteItem} key={index} />
          );
        })}
      </div>
    </div>
  );
}

export default App;
