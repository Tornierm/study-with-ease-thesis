import styled from "styled-components"
import { IMilestone } from "../Interfaces";

const TaskManagerContainer = styled.div`
  height: 600px;
  width: 600px;
  background-color: aliceblue;
`

interface IOwnProps {
    milestone?: IMilestone;
}

export default function TaskManager(props: IOwnProps) {
    return (
      <TaskManagerContainer>
            TaskManager
      </TaskManagerContainer>
    )
  }