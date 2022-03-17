import INote from "../interface/note.interface";
import React, { useState, useEffect } from "react";
import "./Note.css";
import { FC, FocusEvent } from "react";
import CloseIcon from '@mui/icons-material/Close';
import Fab from '@mui/material/Fab';
import Box from '@mui/material/Box';

type Props = {
  note: INote;
  onNoteUpdate: (note: INote) => void;
  onNoteDelete: (note: INote) => void;
};



const Note: FC<Props> = ({ note, onNoteUpdate, onNoteDelete }) => {

  const [isFocused, setIsFocused] = useState(false);
  const noteTextUpdate = (event: FocusEvent<HTMLDivElement>) => {
    setIsFocused(false)
    const newTextValue = event.currentTarget.textContent;
    if (newTextValue === note.text) {
      return;
    }
    const updatedNoteObject: INote = {
      ...note,
      text: newTextValue || ''
    }
    onNoteUpdate(updatedNoteObject)
  }

  // console.log('value focused', isFocused, 'text is', note.text)

  return (
    <div className={isFocused ? "note note-focused" : "note"}>

      <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-end'}}>
        <Fab onClick={() => {
          onNoteDelete(note);
          console.log(note.text)
        }} style={{background: 'transparent'}} size="small" aria-label="add">
          <CloseIcon />
        </Fab>
      </Box>
      <div
        onBlur={noteTextUpdate}
        onFocus={() => {
          setIsFocused(true)
        }}
        contentEditable={true}
        suppressContentEditableWarning={true}


        className="note_text">{note.text}</div>
      <div className="note_link">
        <a href={note.link}>{note.link}</a>
      </div>
    </div>
  );
};

export default Note;
