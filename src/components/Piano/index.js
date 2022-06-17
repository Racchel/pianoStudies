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
   const [title, setTitle] = useState('Vamos começar?')
   const [historic, setHistoric] = useState('')
   const [selectedNote, setSelectedNote] = useState('C')

   const [notesToFilter, setNotesToFilter] = useState([])
   const [whiteKeys, setWhiteKeys] = useState([])
   const [blackKeys, setBlackKeys] = useState([])

   const [isBemol, setIsBemol] = useState(false)
   const [disabledButtons, setDisabledButtons] = useState(false)

   useEffect(() => {
      let whiteNotes = notesList.filter(note => note.color === 'white')
      let blackNotes = notesList.filter(note => note.color === 'black')
      let notesToFilter = notesList.filter(note => note.octave === 1)

      whiteNotes.map(note => note.pressed = false)
      blackNotes.map(note => note.pressed = false)

      setWhiteKeys(whiteNotes)
      setBlackKeys(blackNotes)
      setNotesToFilter(notesToFilter)
   }, [])

   function displayBemol() {
      setIsBemol(!isBemol)
      blackKeys.forEach(note => {
         note.color === 'black' && isBemol
            ? note.name = note.bemolName
            : note.name = note.sustenidoName
      })
   }

   function colorKeys(pressed, keys) {
      keys.forEach(key => {
         whiteKeys.forEach(note => {
            if (note.id === key.id) return note.pressed = pressed
         })
         blackKeys.forEach(note => {
            if (note.id === key.id) return note.pressed = pressed
         })
      })
   }

   function generalChord(type) {
      setDisabledButtons(true)
      let chord = notesList.find(note => note.name === selectedNote && note.octave === 1)
      let ids = [chord.id, chord.id, chord.id + 7]
      type === 'maior' ? ids[1] += 4 : ids[1] += 3

      let keys = [
         {
            id: ids[0],
            name: chord.name
         },
         {
            id: ids[1],
            name: notesList.find(note => note.id === ids[1]).name
         },
         {
            id: ids[2],
            name: notesList.find(note => note.id === ids[2]).name
         }
      ]

      let description = `Acorde ${type} de ${selectedNote}: ${keys[0]?.name} - ${keys[1]?.name} - ${keys[2]?.name}`
      setHistoric(description)
      setTitle(description)
      colorKeys(true, keys)

      setTimeout(() => {
         colorKeys(false, keys)
         setDisabledButtons(false)
         setTitle('Quer escolher um novo acorde?')
      }, 5000)
   }

   function scale() { }

   function Button({ handleClick, name }) {
      return (
         <button
            disabled={disabledButtons}
            onClick={() => handleClick()}
         >{name}
         </button>
      )
   }

   function MyPiano() {
      return (
         <Content>
            <ContentBlackNotes>{
               blackKeys.map(key => (
                  <BlackKey key={key.id} pressed={key.pressed} left={key.left}>{key.name}</BlackKey>
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
            <Button handleClick={() => generalChord('maior')} name='Acorde maior' />
            <Button handleClick={() => generalChord('menor')} name='Acorde menor' />
            <Button handleClick={() => scale()} name='Escala' />
            <Button handleClick={() => displayBemol()} name='Ver bemol' />

            <select
               disabled={disabledButtons}
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
         <h2>{title}</h2>
         <MyPiano />

         <p>{historic ? `Última ação | ${historic}` : 'Faça sua primeira ação'}</p>

         <Options />
      </Container>
   )
}
