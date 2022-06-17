import styled from 'styled-components'
import { colorPalette } from '../../shared/style'


const keyStyle = `
   padding: 10px 0;
   display: flex;
   justify-content: center;
   align-items: flex-end;
   border: 1px solid rgba(80, 80, 80, 0.2);
   box-shadow:0 5px 0 rgba(80, 80, 80, 1);
   :hover {
      box-shadow:0 5px 0 rgba(0, 0, 0, 1);
   }
   
   :active{
      top:5px;
      box-shadow:none;
   }
`


export const Container = styled.div`
   width: 100%;
   min-height: 100vh;
   display: flex;
   flex-direction: column;
   gap: 20px;
   justify-content: center;
   align-items: center;
   background-color: rgba(240,230,140,0.3);
   padding: 20px;
`

export const Content = styled.div`
   position: relative;
   box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 2px 0px;
`

export const ContentWhiteNotes = styled.div`
   height: 350px;
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
   background-image: linear-gradient(to bottom, #eee 0%, white 100%);
   color: ${colorPalette.black};
   position: relative;
   ${keyStyle};

   :hover {
      background-image: linear-gradient(to bottom, #ccc 0%, white 100%);
   }
`

export const BlackKey = styled.button`
   width: 50px;
   height: 60%;
   background-image: linear-gradient(to left, #434343 50%, black 100%);
   color: ${colorPalette.white};
   position: absolute;
   z-index: 2;
   left: ${props => props.left};
   ${keyStyle};

   :hover {
      background-image: linear-gradient(to left, #434343 0%, black 100%);
   }
`
