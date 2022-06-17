import { useEffect, useState } from 'react'
import { notesList, chordsList } from '../../shared/data'

import {
   Container,
   Content,
   WhiteKey,
   BlackKey,
   ContentWhiteNotes,
   ContentBlackNotes
} from './style'


export const Piano = () => {
   const [notes, setNotes] = useState(notesList)
   const [chords, setChords] = useState(chordsList)

   const [notesToFilter, setNotesToFilter] = useState([])
   const [selectedNote, setSelectedNote] = useState('C')
   const [pressedKeys, setPressedKeys] = useState([])

   const [whiteKeys, setWhiteKeys] = useState([])
   const [blackKeys, setBlackKeys] = useState([])

   const [displayMajorChord, setDisplayMajorChord] = useState(false)
   const [displayMinorChord, setDisplayMinorChord] = useState(false)
   const [displayScale, setDisplayScale] = useState(false)


   useEffect(() => {
      let whiteNotes = notes.filter(note => note.color === 'white')
      let blackNotes = notes.filter(note => note.color === 'black')
      let notesToFilter = notes.filter(note => note.octave === 1)

      whiteNotes.map(note => (
         note.pressed = false
      ))

      blackNotes.map(note => (
         note.pressed = false
      ))

      setWhiteKeys(whiteNotes)
      setBlackKeys(blackNotes)
      setNotesToFilter(notesToFilter)
   }, [notes])

   function colorKeys(pressed) {
      pressedKeys.map(key => {
         whiteKeys.map(note => {
            if (note.id === key) return note.pressed = pressed
         })
         blackKeys.map(note => {
            if (note.id === key) return note.pressed = pressed
         })
      })
   }

   function majorChord() {
      setDisplayMajorChord(true)
      let chord = chords.find(chord => chord.note === selectedNote && chord.type === 'maior')

      setPressedKeys(chord.keys)
      colorKeys(true)

      setTimeout(() => {
         setDisplayMajorChord(false)
         colorKeys(false)
      }, 2000)
   }

   function minorChord() {
      setDisplayMinorChord(true)

      setTimeout(() => {
         setDisplayMinorChord(false)
      }, 2000)
   }

   function scale() {
      setDisplayScale(true)

      setTimeout(() => {
         setDisplayScale(false)
      }, 2000)
   }

   function Button({ handleClick, name }) {
      return (
         <button
            disabled={displayMajorChord || displayMinorChord || displayScale}
            onClick={() => handleClick()}
         >{name}
         </button>
      )
   }

   function Title() {

      let title = ''

      switch (true) {
         case displayMajorChord:
            title = `Acorde maior de ${selectedNote}`
            break;
         case displayMinorChord:
            title = `Acorde menor de ${selectedNote}`
            break;
         case displayScale:
            title = `Escala de ${selectedNote}`
            break;
         default:
            title = 'Escolha uma função para ser executada.'
      }

      return (
         <h2>{title}</h2>
      )
   }

   function MyPiano() {
      return (
         <Content>
            <ContentBlackNotes>{
               blackKeys.map(key => (
                  <BlackKey key={key.id} pressed={key.pressed} left={key.left}>{key.id}|{key.name}</BlackKey>
               ))
            }</ContentBlackNotes>
            <ContentWhiteNotes>{
               whiteKeys.map(key => (
                  <WhiteKey key={key.id} pressed={key.pressed}>{key.id}|{key.name}</WhiteKey>
               ))
            }</ContentWhiteNotes>
         </Content>
      )
   }

   function Options() {
      return (
         <div>
            <Button handleClick={() => majorChord()} name='Acorde maior' />
            <Button handleClick={() => minorChord()} name='Acorde menor' />
            <Button handleClick={() => scale()} name='Escala' />

            <select
               disabled={displayMajorChord || displayMinorChord || displayScale}
               value={selectedNote}
               onChange={(e) => setSelectedNote(e.target.value)}>

               {notesToFilter.map(note => (
                  <option key={note.id} value={note.name}>{note.name}</option>
               ))}
            </select>
         </div>
      )
   }

   return (
      <Container>
         <h1>Meus estudos de teclado</h1>
         <Title />
         <ul>{
            pressedKeys.map((key, index) => (
               <li key={index}>{key}</li>
            ))
         }</ul>
         <MyPiano />
         <Options />
      </Container>
   )
}
