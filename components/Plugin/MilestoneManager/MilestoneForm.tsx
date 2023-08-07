import React, { use, useEffect, useState } from 'react'
import { IAssignment, IMilestone, IMilestoneData, Prio, Status } from '../Interfaces'
import styled from 'styled-components';
import { Title2 } from '../styled';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { DatePicker } from './components/DatePicker';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { es } from 'date-fns/locale';

const MilestoneFormContainer = styled.div`
    background-color: white;
    padding:8px;
    display:flex;
    flex-direction: column;
    gap:4px;
`

const FormLabel = styled(Label)`
  margin-top: 8px;
`

const SliderContainer = styled.div`
  padding:8px 0;
  gap: 12px;
  display:flex;
`

const FormTitle = styled(Title2)`
  text-align: center;
`

const ButtonContainer = styled.div`
  display:flex;
  justify-content: center;
`

const Close = styled.div`
  display: flex;
  justify-content: flex-end;
`

interface IOwnProps {
  milestone: IMilestone;
  courseId: number;
  assignment: IAssignment;
  addMilestone: (milestone: IMilestoneData) => void;
  currentDate: Date;
  onClose: any;
}

export default function MilestoneForm(props: IOwnProps) {
  const [name, setName] = useState<string | undefined>()
  const [description, setDescription] = useState<string>("")
  const [deadline, setDeadline] = useState<Date>()
  const [estimate, setEstimate] = useState<number[] | undefined>()
  const [disable, setDisable] = useState<boolean>(true)

  const handleClick = () => {
    if(!name){
      return
    }
    const newMilestone: IMilestoneData = {
      name: name,
      assignmentId: props.assignment.id,
      description: description,
      courseId: props.courseId,
      deadline: deadline, 
      estimate: estimate? estimate[0]: undefined,
    }
    props.addMilestone(newMilestone)
  }

  const handleSliderChange = (newValue: number[]) => {
    setEstimate(newValue);
  };

  useEffect(() => {
    const validate = () => {
      if(!name){
        setDisable(true)
      } else {
        setDisable(false)
      }
    }
    validate()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[name])

  return (
    <MilestoneFormContainer>
        <Close onClick={props.onClose}>x</Close>
        <FormTitle>Create New Milestone</FormTitle>
        <FormLabel htmlFor="name">Name*</FormLabel>
        <Input onChange={(e) => setName(e.target.value)} type="text" id="name" placeholder='name'></Input>
        <FormLabel htmlFor="description">Description(optional)</FormLabel>
        <Textarea onChange={(e) => setDescription(e.target.value)} id="description" placeholder='description'></Textarea>
        <FormLabel htmlFor="deadline">Deadline(optional)</FormLabel>
        <DatePicker 
          date={deadline} 
          today={props.currentDate}
          setDate={setDeadline} 
          before={
            props.assignment.start
          }
          after={
            props.assignment.deadline
          }
        />
        <FormLabel htmlFor="slider">Estimate(optional)</FormLabel>
        <SliderContainer>
          <Slider
            value={estimate}
            max={10}
            step={1}
            onValueChange={handleSliderChange}
          />
          <>{estimate ? estimate + "h" : "none"}</>
        </SliderContainer>
        <ButtonContainer>
          <Button disabled={disable} onClick={handleClick}>Create</Button>
        </ButtonContainer>
    </MilestoneFormContainer>
  )
}
