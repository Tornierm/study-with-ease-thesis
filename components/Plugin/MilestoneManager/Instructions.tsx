import React from 'react'
import styled from 'styled-components'
import { Title2 } from '../styled'
import { Label } from '@radix-ui/react-label'

const InstructionContainer = styled.div`
    grid-area: instructions;
    border: 1px solid black;
    background-color: white;
    display: flex;
    flex-direction: column;
    padding:8px;
`

export default function Instructions() {
  return (
    <InstructionContainer>
        <Title2>Instructions</Title2>
        <Label>Assignment:</Label>
        <Label>Material:</Label>
    </InstructionContainer>
  )
}
