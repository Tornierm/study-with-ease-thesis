import React from 'react'
import styled from 'styled-components'
import { Title2 } from '../../styled'
import { Checkbox } from '@/components/ui/checkbox'
import { ITask } from '../../Interfaces'

const TaskContainer = styled.div`
  min-height:80px;
  width: 100%;
  padding:4px 4px 4px 8px;
  display:grid;
  border-radius: 4px;
  border:1px solid black;
  grid-template-areas: "nothing breadcrumbs breadcrumbs breadcrumbs breadcrumbs delete"
                        "checkbox title title title title manage"
                        "free deadline deadline deadline deadline none";
  grid-template-rows: 1fr 1fr 1fr;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 20px;
  gap:0px 8px;
`

const Name = styled(Title2)`
    grid-area: title;
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
        <Delete onClick={props.delete}>x</Delete>
        <Box onClick={props.toggleDone}></Box>
    </TaskContainer>
  )
}
