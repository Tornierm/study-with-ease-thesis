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
    border: 1px solid black;
    border-radius: 4px;
    background-color: white;
    padding:4px;
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

interface IOwnProps {
  milestone: IMilestone;
  courseId: number;
  assignment: IAssignment;
  addMilestone: (milestone: IMilestoneData) => void;
  currentDate: Date;
}

export default function MilestoneForm(props: IOwnProps) {
  const [name, setName] = useState<string | undefined>()
  const [description, setDescription] = useState<string>("")
  const [deadline, setDeadline] = useState<Date>()
  const [estimate, setEstimate] = useState<number[] | undefined>()
  const [disable, setDisable] = useState<boolean>(false)

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
    console.log(newValue)
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
        <FormTitle>MilestoneForm</FormTitle>
        <Label htmlFor="name">Name</Label>
        <Input onChange={(e) => setName(e.target.value)} type="text" id="name" placeholder='name'></Input>
        <Label htmlFor="description">Description</Label>
        <Textarea onChange={(e) => setDescription(e.target.value)} id="description" placeholder='description'></Textarea>
        <Label htmlFor="deadline">Deadline</Label>
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
        <Label htmlFor="slider">Estimate</Label>
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
