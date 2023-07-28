import React from 'react'
import styled from 'styled-components'
import { Title2 } from '../styled'
import { Label } from '@radix-ui/react-label'
import { IAssignment } from '../Interfaces'

const InstructionContainer = styled.div`
    grid-area: instructions;
    border: 1px solid black;
    background-color: white;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding:8px;
`

const Link = styled.a`

`

const Line = styled.div`
  display: flex;
  justify-content: space-between;
`

interface IOwnProps {
  assignment: IAssignment;
}

export default function Instructions(props: IOwnProps) {

  return (
    <InstructionContainer>
        <Title2>Instructions</Title2>
        <Line>
          <Label>Assignment:</Label>
          {<Link 
            download 
            href={props.assignment.instructions.src}       
          >
            Assignment
          </Link>}
        </Line>
        <Line>
          <Label>Material:</Label>
          {/* {props.assignment.material.map((m, i) => {
            return <Link key={i} download href={m.src}>{"Material "+i + "  "}</Link>
          })} */}
        </Line>

    </InstructionContainer>
  )
}
