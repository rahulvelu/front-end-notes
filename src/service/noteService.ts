import axios from "axios";
import {NOTE_API_URL} from '../constant/api';
import INote from "../interface/note.interface";

export const getNotes = async () => {
    try {
        const res = await axios.get(NOTE_API_URL)
        const notesArray = res.data.notes;
        return notesArray
    } catch (err) {
        console.error(err)
    }
}

export const createNotes = async (newNote: Partial<INote>) => {
    try {
        const res = await axios.post(NOTE_API_URL, newNote);
        return res.data.note;
        
    } catch (err) {
        console.error(err)
    }
}

export const deleteNotes = async (noteToDeleteId: string) => {
    try {
        const url = `${NOTE_API_URL}/${noteToDeleteId}`
        const res = await axios.delete(url);
        return res.data.reply;
        
    } catch (err) {
        console.error(err)
    }
}

export const updateNotes = async (noteToUpdate: INote) => {
    try {
        const url = `${NOTE_API_URL}/${noteToUpdate._id}`
        const res = await axios.put(url, noteToUpdate);
        return res.data.note;
        
    } catch (err) {
        console.error(err)
    }
}