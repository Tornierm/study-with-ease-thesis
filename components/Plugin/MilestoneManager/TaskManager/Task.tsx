import React from 'react'
import styled from 'styled-components'
import { SubTitle, Title2 } from '../../styled'
import { Checkbox } from '@/components/ui/checkbox'
import { ITask } from '../../Interfaces'

const TaskContainer = styled.div`
  min-height:80px;
  width: 100%;
  padding:4px 4px 4px 8px;
  display:grid;
  border-radius: 4px;
  border:1px solid black;
  grid-template-areas: "nothing title title title title delete"
                        "checkbox title title title title manage"
                        "checkbox description description description description manage"
                        ;
  grid-template-rows: auto 1fr auto;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 20px;
  gap:0px 8px;
  background-color: lightgray;
`

const Name = styled(Title2)`
    text-align: left;
    grid-area: title;
    font-size: 14px;
`

const Description = styled(SubTitle)`
    text-align: left;
    grid-area: description;
`

const Delete = styled.p`
    grid-area: delete;
`

const Box = styled(Checkbox)`
    grid-area: checkbox;
`

interface IOwnProps {
    task: ITask;
    delete: () => void;
    toggleDone: () => void;
}

export default function Task(props: IOwnProps) {
  return (
    <TaskContainer>
        <Name>{props.task.name}</Name>
        <Description>{props.task.description}</Description>
        <Delete onClick={props.delete}>x</Delete>
        <Box onClick={props.toggleDone}></Box>
    </TaskContainer>
  )
}
