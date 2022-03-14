import INote from "../interface/note.interface";
import React, { useState, useEffect } from "react";
import "./Note.css";
import { FC, FocusEvent } from "react";

type Props = {
  note: INote;
  onNoteUpdate: (note: INote) => void;
};



const Note: FC<Props> = ({ note, onNoteUpdate }) => {

    const noteTextUpdate = (event: FocusEvent<HTMLDivElement>) => {
        
        const newTextValue = event.currentTarget.textContent;
        if(newTextValue === note.text){
          return;
        }
        const updatedNoteObject: INote = {
            ...note,
            text: newTextValue || ''
        }
        onNoteUpdate(updatedNoteObject)
    }

  return (
    <div className="note">
      <div 
      onBlur={noteTextUpdate}
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
