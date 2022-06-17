import styled from 'styled-components'

export const Container = styled.div`
   width: 100%;
   min-height: 100vh;
   display: flex;
   justify-content: center;
   align-items: center;
   background-color: green;
   padding: 20px;
`

export const Content = styled.div`
   position: relative;
`

export const ContentWhiteNotes = styled.div`
   height: 350px;
   background-color: red;
   display: flex;
`

export const ContentBlackNotes = styled.div`
   width: 100%;
   height: 50%;
   display: flex;
   justify-content: center;
`

export const WhiteKey = styled.button`
   width: 80px;
   height: 100%;
   display: flex;
   justify-content: center;
   align-items: flex-end;
   padding: 10px 0;
`

export const BlackKey = styled.button`
   width: 50px;
   height: 60%;
   display: flex;
   justify-content: center;
   align-items: flex-end;
   padding: 10px 0;
   position: absolute;
   background-color: red;
   left: ${props => props.left};
`
