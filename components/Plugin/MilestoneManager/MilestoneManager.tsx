import styled from "styled-components"
import { IAssignment, IMilestone, IMilestoneData, Mode, Prio, Status } from "../Interfaces";
import { useEffect, useState } from "react";
import MilestoneList from "../Dashboard/MilestoneList/MilestoneList";
import MilestoneForm from "./MilestoneForm";
import Instructions from "./Instructions";
import TaskManager from "./TaskManager/TaskManager";
import Header from "../Header";
import { Button } from "@/components/ui/button";
import { Modern_Antiqua } from "next/font/google";

const MilestoneManagerContainer = styled.div`
  height: 600px;
  width:100%;
  max-width: 800px;
  background-color: white;
  display:grid;
  grid-template-areas:
    "header header"
    "list  instructions"
    "list  buttons";
  grid-template-rows: 50px 1fr 1fr;
  grid-template-columns: 1fr 1fr;
  gap: 8px 8px;
  padding:8px;
  position: relative;
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

const Form = styled.div`
  grid-area: form;
`

const Buttons = styled.div`
  grid-area: buttons;
  display: flex;
  justify-content: center;
  align-items: flex-end;
`

const Overlay = styled.div`
  width:100%;
  height: 100%;
  position: absolute;
  background-color: rgba(0,0,0,0.5);
  display:grid;
  grid-template-areas: 
    "a b close"
    "a form c"
    "a d d"
    ;
  grid-template-columns: 50px 1fr 50px;
  grid-template-rows: 50px 1fr 50px;
  align-items: center;
  justify-items: center;
`

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
  const [showDialog, setShowDialog] = useState<boolean>(false)

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
                onManageMilestone={(milestone: IMilestone) => setSelectedMilestoneId(milestone.id)}
                toggleDone={props.toggleDone} 
                swapMilestoneUp={props.swapMilestoneUp} 
                swapMilestoneDown={props.swapMilestoneDown} 
                editable={true} 
                deleteMilestone={props.deleteMilestone} 
                milestones={props.selectedAssignment.milestones}
              />
              <Buttons>
                <Button onClick={() => setShowDialog(true)}>Create Milestone</Button>
              </Buttons>
              <Instructions assignment={props.selectedAssignment}/>
              {showDialog 
                ? <Overlay>
                    <Form>
                    <MilestoneForm 
                      onClose={() => setShowDialog(false)}
                      currentDate={props.currentDate}
                      addMilestone={props.addMilestone}
                      milestone={tmp}
                      courseId={props.selectedAssignment.courseId}
                      assignment={props.selectedAssignment} 
                    />
                    </Form>
                  </Overlay> 
                : <></>}
          </MilestoneManagerContainer>
        }
      </>    
    )
  }

  const getMilestoneById = (milestoneId: number, milestones: IMilestone[]): IMilestone | undefined => {
    for(const milestone of milestones){
      if(milestone.id === milestoneId){
        return milestone
      }
    }
  }