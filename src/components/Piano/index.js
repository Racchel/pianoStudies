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
      reset()
   }, [])

   function reset() {
      let whiteNotes = notesList.filter(note => note.color === 'white')
      let blackNotes = notesList.filter(note => note.color === 'black')
      let notesToFilter = notesList.filter(note => note.octave === 1)

      whiteNotes.map(note => note.pressed = false)
      blackNotes.map(note => note.pressed = false)

      setWhiteKeys(whiteNotes)
      setBlackKeys(blackNotes)
      setNotesToFilter(notesToFilter)
   }

   function displayBemol() {
      setIsBemol(!isBemol)
      blackKeys.forEach(note => {
         note.color === 'black' && !isBemol
            ? note.name = note.bemolName
            : note.name = note.sustenidoName
      })
   }

   function changePropertyOfAnItemListById(listRef, handleChange, id, property, value) {
      listRef.forEach((note, index) => {
         if (note.id === id) {
            let listRefCopy = [...listRef]
            listRefCopy[index][property] = value
            handleChange(listRefCopy)
         }
      })
   }

   function colorKeys(pressed, keyList) {
      keyList.forEach(key => {
         changePropertyOfAnItemListById(whiteKeys, setWhiteKeys, key.id, 'pressed', pressed)
         changePropertyOfAnItemListById(blackKeys, setBlackKeys, key.id, 'pressed', pressed)
      })
   }


   function generalAction(newTitle, newDescription, keyList) {
      setDisabledButtons(true)
      setHistoric(newDescription)
      setTitle(newDescription)
      colorKeys(true, keyList)

      setTimeout(() => {
         colorKeys(false, keyList)
         setDisabledButtons(false)
         setTitle(newTitle)
      }, 5000)
   }

   function generalChord(type) {

      let chord = notesList.find(note => note.name === selectedNote && note.octave === 1)
      let ids = [chord.id, type === 'maior' ? chord.id + 4 : chord.id + 3, chord.id + 7]

      let keyList = ids.map((id, index) => {
         return { id: id, name: notesList.find(note => note.id === ids[index]).name }
      })

      let newTitle = 'Quer escolher um novo acorde?'
      let newDescription = generateDescription(`Acordes de ${selectedNote} ${type}`, keyList)
      generalAction(newTitle, newDescription, keyList)
   }

   function generateDescription(prefix, keyList) {
      let newDescription = ''

      keyList.forEach((key, index) => {
         newDescription += index !== keyList.length - 1
            ? key.name + ' - '
            : key.name
      })

      return prefix + ' : ' + newDescription
   }

   function scale() {
      let note = notesList.find(note => note.name === selectedNote && note.octave === 1)
      let ids = [note.id, note.id + 2, note.id + 4, note.id + 5, note.id + 7, note.id + 9, note.id + 11, note.id + 12]

      let keyList = ids.map((id, index) => {
         return { id: id, name: notesList.find(note => note.id === ids[index]).name }
      })

      let newTitle = 'Quer escolher uma nova escala?'
      let newDescription = generateDescription(`Escala de ${selectedNote}`, keyList)
      generalAction(newTitle, newDescription, keyList)

   }

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
            <Button handleClick={() => displayBemol()} name={isBemol ? 'Ver sustenido' : 'Ver bemol'} />

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
