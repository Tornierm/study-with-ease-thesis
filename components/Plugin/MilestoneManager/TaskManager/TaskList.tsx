import styled from "styled-components"
import { IMilestone, ITask, Status } from "../../Interfaces";
import Task from "./Task";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Milestone } from "lucide-react";

const TaskListContainer = styled.div`
  grid-area: list;
  display:flex;
  flex-direction: column;
  gap: 8px;
  padding:8px 16px 8px 8px;
  border: 1px solid black;
  overflow: scroll;
  background-color: white;
`

interface IOwnProps {
    milestone: IMilestone;
    tasks: ITask[];
    toggleDone: (index: number) => void
    deleteTask: (inedx: number) => void
}

export default function TaskList(props: IOwnProps) {
    
  return (
    <TaskListContainer>
          {props.tasks.map((task, i) => {
              return  <Task 
                    delete={() => props.deleteTask(i)}
                    toggleDone={() => props.toggleDone(i)}
                    task={task}
                    key={props.milestone.courseId +","+props.milestone.assignmentId+","+props.milestone.id+","+i}
                  />
          })}
    </TaskListContainer>
  )
}