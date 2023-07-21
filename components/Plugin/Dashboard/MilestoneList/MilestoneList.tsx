import styled from "styled-components"
import { IMilestone } from "../../Interfaces";
import Milestone from "./Milestone";
import { Dispatch, SetStateAction, useEffect } from "react";

const MilestoneListContainer = styled.div`
  grid-area: list;
  background-color: light grey;
  display:flex;
  flex-direction: column;
  gap: 8px;
  padding:8px 16px 8px 8px;
  background-color: lightgray;
  overflow: scroll;
`

const MilestoneContainer = styled.div`
  display:flex;
`

const SortButtons = styled.div`
  display:flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const Up = styled.div`
  display:flex;
`

const Down = styled.div`
  display:flex;
`

interface IOwnProps {
    milestones: IMilestone[];
    setSelectedAssignmentId: Dispatch<SetStateAction<number | undefined>>;
    deleteMilestone?: (milestone: IMilestone) => void;
    swapMilestoneUp?: (swappedMilestone: IMilestone, swapMilestones: IMilestone[]) => void
    swapMilestoneDown?: (swappedMilestone: IMilestone, swapMilestones: IMilestone[]) => void
    editable:boolean;
}

export default function MilestoneList(props: IOwnProps) {

  const onDelete = (milestone: IMilestone) => {
    if(props.deleteMilestone){
      props.deleteMilestone(milestone)
    }
  }

  return (
    <MilestoneListContainer>
          {props.milestones.map((milestone) => {
              return <MilestoneContainer>
                  { !milestone.deadline && props.editable
                    ? <SortButtons>
                      <Up onClick={() => props.swapMilestoneUp ? props.swapMilestoneUp(milestone, props.milestones) : {}}>&#x25B2;</Up>
                      <Down onClick={() => props.swapMilestoneDown ? props.swapMilestoneDown(milestone, props.milestones) : {}}>&#x25BC;</Down>
                    </SortButtons>
                    : <></>
                  }
                  <Milestone 
                    editable={props.editable} 
                    onDelete={() => onDelete(milestone)} 
                    key={milestone.courseId +","+milestone.assignmentId+","+milestone.id} 
                    setSelectedAssignmentId={props.setSelectedAssignmentId} 
                    milestone={milestone}
                  />
                </MilestoneContainer>
          })}
    </MilestoneListContainer>
  )
}