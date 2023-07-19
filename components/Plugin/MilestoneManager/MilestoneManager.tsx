import styled from "styled-components"
import { IAssignment, IMilestone, Prio, Status } from "../Interfaces";
import { useEffect, useState } from "react";
import TaskManager from "./TaskManager";
import MilestoneList from "../Dashboard/MilestoneList/MilestoneList";
import { Title } from "../styled";
import MilestoneForm from "./MilestoneForm";
import Instructions from "./Instructions";

const MilestoneManagerContainer = styled.div`
  height: 600px;
  width: 600px;
  background-color: aliceblue;
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

const Header = styled.div`
  grid-area: header;
  display:flex;
`

const newMilestone: IMilestone = {
  status: Status.ongoing,
  name: "",
  assignment: "",
  assignmentId: 0,
  class: "",
  classId: 0,
  id: 0,
  prio: Prio.p0,
}

interface IOwnProps {
  selectedAssignment: IAssignment;
  close: any;
}

export default function MilestoneManager(props: IOwnProps) {

  const [tmp, setTmp] = useState<IMilestone>(newMilestone)

  const [selectedMilestone, setSelectedMilestone] = useState<IMilestone | undefined>(undefined)
    const [selectedMilestoneId, setSelectedMilestoneId] = useState<number | undefined>(undefined)

    useEffect(() => {
      if(selectedMilestoneId){
        setSelectedMilestone(getMilestoneById(selectedMilestoneId, props.selectedAssignment.milestones))
      }
    },[selectedMilestoneId]);
    
    return (
      <>
        {selectedMilestone ? 
          <TaskManager milestone={selectedMilestone}/> : 
          <MilestoneManagerContainer>
              <Header>
                <Title>MilestoneManager</Title>
                <div onClick={props.close}>x</div>
              </Header>
              
              <MilestoneList setSelectedAssignmentId={()=>{}} milestones={props.selectedAssignment.milestones}/>
              <MilestoneForm milestone={tmp}/>
              <Instructions/>
          </MilestoneManagerContainer>
        }
      </>    
    )
  }

  const getMilestoneById = (milestoneId: number, milestones: IMilestone[]): IMilestone | undefined => {
    for(const assignment of milestones){
      if(assignment.id === milestoneId){
        return assignment
      }
    }
  }