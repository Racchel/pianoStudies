import { useState } from 'react'
import { whiteNoteList, blackNoteList } from '../../shared/data/index.js'
import {
   Container,
   Content,
   WhiteKey,
   BlackKey,
   ContentWhiteNotes,
   ContentBlackNotes
} from './style'

export function Piano() {
   const [whiteNotes, setWhiteNotes] = useState(whiteNoteList)
   const [blackNotes, setBlackNotes] = useState(blackNoteList)

   return (
      <Container>
         <Content>
            <BlackKey left='55px'>{blackNotes[0].sustenidoName}</BlackKey>
            <BlackKey left='135px'>{blackNotes[1].sustenidoName}</BlackKey>
            <BlackKey left='295px'>{blackNotes[2].sustenidoName}</BlackKey>
            <BlackKey left='375px'>{blackNotes[3].sustenidoName}</BlackKey>
            <BlackKey left='455px'>{blackNotes[4].sustenidoName}</BlackKey>

            <ContentWhiteNotes>
               {whiteNotes.map(nota => (
                  <WhiteKey>{nota.name}</WhiteKey>
               ))}
            </ContentWhiteNotes>

         </Content>
      </Container>
   )
}