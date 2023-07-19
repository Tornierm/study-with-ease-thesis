import React from 'react'
import styled from 'styled-components'
import { Title2 } from '../styled'

const InstructionContainer = styled.div`
    grid-area: instructions;
`

export default function Instructions() {
  return (
    <InstructionContainer>
        <Title2>Instructions</Title2>
    </InstructionContainer>
  )
}
