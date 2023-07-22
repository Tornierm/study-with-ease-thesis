import styled from "styled-components"
import { IAssignment, IMilestone, IMilestoneData, Prio, Status } from "../Interfaces";
import { useEffect, useState } from "react";
import MilestoneList from "../Dashboard/MilestoneList/MilestoneList";
import { Title } from "../styled";
import MilestoneForm from "./MilestoneForm";
import Instructions from "./Instructions";
import TaskManager from "./TaskManager/TaskManager";
import Header from "../Header";

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

const PositionedHeader = styled(Header)`
  grid-area: header;
`

const newMilestone: IMilestone = {
  status: Status.ongoing,
  name: "",
  description:"",
  assignment: "",
  assignmentId: 0,
  course: "",
  courseId: 0,
  id: 0,
  prio: Prio.p0,
  tasks: []
}

interface IOwnProps {
  selectedAssignment: IAssignment;
  close: any;
  addMilestone: (milestone: IMilestoneData) => void;
  deleteMilestone: (milestone: IMilestone) => void;
  swapMilestoneUp: (swappedMilestone: IMilestone, swapMilestones: IMilestone[]) => void;
  swapMilestoneDown: (swappedMilestone: IMilestone, swapMilestones: IMilestone[]) => void;
  toggleDone: (milestone: IMilestone) => void;
  currentDate: Date;
}

export default function MilestoneManager(props: IOwnProps) {

  const [tmp, setTmp] = useState<IMilestone>(newMilestone)

  const [selectedMilestone, setSelectedMilestone] = useState<IMilestone | undefined>(undefined)
    const [selectedMilestoneId, setSelectedMilestoneId] = useState<number | undefined>(undefined)

    useEffect(() => {
      if(selectedMilestoneId){
        setSelectedMilestone(getMilestoneById(selectedMilestoneId, props.selectedAssignment.milestones))
      } else {
        setSelectedMilestoneId(undefined)
        setSelectedMilestone(undefined)
      }
    },[selectedMilestoneId, props.selectedAssignment.milestones]);

    return (
      <>
        {selectedMilestone 
          ?<TaskManager close={() => setSelectedMilestoneId(undefined)} milestone={selectedMilestone}/> 
          :<MilestoneManagerContainer>
              <PositionedHeader
                  return={props.close}
                  breadcrumb={'MilestoneManager'}
                  title={props.selectedAssignment.name}
              />
              
              <MilestoneList 
                setSelectedAssignmentId={setSelectedMilestoneId} 
                toggleDone={props.toggleDone} 
                swapMilestoneUp={props.swapMilestoneUp} 
                swapMilestoneDown={props.swapMilestoneDown} 
                editable={true} 
                deleteMilestone={props.deleteMilestone} 
                milestones={props.selectedAssignment.milestones}
              />
              <MilestoneForm 
                currentDate={props.currentDate}
                addMilestone={props.addMilestone}
                milestone={tmp}
                courseId={props.selectedAssignment.courseId}
                assignment={props.selectedAssignment} 
              />
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