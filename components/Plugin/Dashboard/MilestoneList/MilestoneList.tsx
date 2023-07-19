import styled from "styled-components"
import { IMilestone } from "../../Interfaces";
import Milestone from "./Milestone";
import { Dispatch, SetStateAction } from "react";

const MilestoneListContainer = styled.div`
  grid-area: list;
  background-color: grey;
  display:flex;
  flex-direction: column;
  gap: 8px;
  padding:8px;
`

interface IOwnProps {
    milestones: IMilestone[];
    setSelectedAssignmentId: Dispatch<SetStateAction<number | undefined>>;
}

export default function Dashboard(props: IOwnProps) {
    return (
      <MilestoneListContainer>
            {props.milestones.map((milestone) => {
                return <Milestone key={milestone.id} setSelectedAssignmentId={props.setSelectedAssignmentId} milestone={milestone}/>
            })}
      </MilestoneListContainer>
    )
  }