import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { IMilestone, ITask, Status } from '../../Interfaces'
import TaskList from './TaskList'
import TaskForm from './TaskForm'
import Header from '../../Header'

const TaskManagerContainer = styled.div`
  height: 600px;
  width: 100%;
  max-width: 800px;
  background-color: white;
  display:grid;
  grid-template-areas:
    "header header"
    "list  instructions"
    "list  createForm";
  grid-template-rows: 50px 1fr 1fr;
  grid-template-columns: 1fr 1fr;
  gap: 8px 8px;
  padding:8px;
`

const PositionedHeader = styled(Header)`
  grid-area: header;
`

interface IOwnProps {
    milestone: IMilestone;
    close: any;
}

export default function TaskManager(props: IOwnProps) {
    const [update, setUpdate] = useState<boolean>(true)
    const [milestone, setMilestone] = useState<IMilestone>(props.milestone)
    const [tasks, setTasks] = useState<ITask[]>(props.milestone.tasks)


    useEffect(() => {
        setMilestone(props.milestone)
        const tmp: ITask[] = [];
        props.milestone.tasks.forEach((task) => {
            tmp.push(task)
        })
        setTasks(tmp)
        setUpdate(false)
    },[update])

    const deleteTask = (index: number) => {
        props.milestone.tasks.splice(index, 1)
        setUpdate(true)
    }
    const addTask = (task: ITask) => {
        props.milestone.tasks.push(task)
        setUpdate(true)
    }
    const toggleDone = (index: number) => {
        if(props.milestone.tasks[index].status === Status.finished){
            props.milestone.tasks[index].status = Status.ongoing;
        } else {
            props.milestone.tasks[index].status = Status.finished;
        }
        setUpdate(true)
    }

  return (
    <TaskManagerContainer>
        <PositionedHeader
            return={props.close}
            breadcrumb={'Taskmanager'}
            title={props.milestone.name}
        />
        <TaskList
            tasks={tasks}
            toggleDone={toggleDone}
            deleteTask={deleteTask}
            milestone={milestone} 
        />
         <TaskForm 
            addTask={addTask}        
        />
    </TaskManagerContainer>
  )
}
