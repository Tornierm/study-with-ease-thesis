import React, { useEffect, useState } from 'react'
import { ITask, Status } from '../../Interfaces'
import styled from 'styled-components';
import { Title2 } from '../../styled';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

const TaskFormContainer = styled.div`
    border: 1px solid black;
    border-radius: 4px;
    background-color: white;
    padding:4px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`

const FormTitle = styled(Title2)`
  text-align: center;
`

const ButtonContainer = styled.div`
  display:flex;
  justify-content: center;
`

interface IOwnProps {
  addTask: (task: ITask) => void;
}

export default function MilestoneForm(props: IOwnProps) {
  const [name, setName] = useState<string | undefined>()
  const [description, setDescription] = useState<string | undefined>()

  const [disable, setDisable] = useState<boolean>(true)

  const handleClick = () => {
    if(!name){
      return
    }
    const newTask: ITask = {
      name: name,
      description: description,
      status: Status.ongoing,
    }
    props.addTask(newTask)
  }

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
    <TaskFormContainer>
        <FormTitle>TaskForm</FormTitle>
        <div>
          <Label htmlFor="name">Name</Label>
          <Input onChange={(e) => setName(e.target.value)} type="text" id="name" placeholder='name'></Input>
        </div>
        <div>
          <Label htmlFor="description">Name</Label>
          <Textarea onChange={(e) => setDescription(e.target.value)} id="description" placeholder='description'></Textarea>
        </div>
        <ButtonContainer>
          <Button disabled={disable} onClick={handleClick}>Create</Button>
        </ButtonContainer>
    </TaskFormContainer>
  )
}
