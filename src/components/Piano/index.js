import { useEffect, useState } from 'react'
import { notesList } from '../../shared/data'

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
   const [chord, setChord] = useState([])
   const [chordDescription, setChordDescription] = useState('')
   const [isBemol, setIsBemol] = useState(false)

   const [notesToFilter, setNotesToFilter] = useState([])
   const [selectedNote, setSelectedNote] = useState('C')

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

   function colorKeys(pressed, keys) {
      setChord(keys)

      keys.map(key => {
         whiteKeys.map(note => {
            if (note.id === key.id) return note.pressed = pressed
         })
         blackKeys.map(note => {
            if (note.id === key.id) return note.pressed = pressed
         })
      })
   }

   function generalChord(type) {
      let chord = notes.find(note => note.name === selectedNote && note.octave === 1)
      let ids = [chord.id, chord.id, chord.id + 7]
      type === 'maior' ? ids[1] += 4 : ids[1] += 3

      let keys = [
         {
            id: ids[0],
            name: chord.name
         },
         {
            id: ids[1],
            name: notes.find(note => note.id === ids[1]).name
         },
         {
            id: ids[2],
            name: notes.find(note => note.id === ids[2]).name
         }
      ]

      setChordDescription(`Acorde ${type} de ${selectedNote}: ${keys[0]?.name} - ${keys[1]?.name} - ${keys[2]?.name}`)
      setDisplayMajorChord(true)

      colorKeys(true, keys)

      setTimeout(() => {
         setDisplayMajorChord(false)
         colorKeys(false, keys)
      }, 5000)
   }

   function majorChord() {
      generalChord('maior')
   }

   function minorChord() {
      generalChord('menor')

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
            title = chordDescription
            break;
         case displayMinorChord:
            title = chordDescription
            break;
         case displayScale:
            title = `Escala de ${selectedNote} `
            break;
         default:
            title = 'Escolha uma função para ser executada.'

      }

      return (
         <>
            <h2>{title}</h2>
         </>
      )
   }

   function MyPiano() {
      return (
         <Content>
            <ContentBlackNotes>{
               blackKeys.map(key => (
                  <BlackKey key={key.id} pressed={key.pressed} left={key.left}>
                     {isBemol ? key.name : key.name}
                  </BlackKey>
               ))
            }</ContentBlackNotes>
            <ContentWhiteNotes>{
               whiteKeys.map(key => (
                  <WhiteKey key={key.id} pressed={key.pressed}>{key.name}</WhiteKey>
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
            <Button handleClick={() => setIsBemol(!isBemol)} name='Ver bemol' />


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
         <MyPiano />

         <p>{chordDescription ? `Última ação | ${chordDescription}` : 'Faça sua primeira ação'}</p>

         <Options />
      </Container>
   )
}
