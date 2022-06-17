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

export function Piano2() {
   const [notes, setNotes] = useState(notesList)
   const [whiteKeys, setWhiteKeys] = useState([])
   const [blackKeys, setBlackKeys] = useState([])

   useEffect(() => {
      let whiteNotes = notes.filter(note => note.color === 'white')
      let blackNotes = notes.filter(note => note.color === 'black')

      setWhiteKeys(whiteNotes)
      setBlackKeys(blackNotes)
   }, [])


   return (
      <Container>
         <Content>
            <ContentBlackNotes>{
               blackKeys.map(key => (
                  <BlackKey left={key.left}>{key.sustenidoName}#</BlackKey>
               ))
            }</ContentBlackNotes>
            <ContentWhiteNotes>{
               whiteKeys.map(key => (
                  <WhiteKey>{key.name}</WhiteKey>
               ))
            }</ContentWhiteNotes>
         </Content>
      </Container>
   )
}