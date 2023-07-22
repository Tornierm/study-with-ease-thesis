import React, { useEffect, useState } from 'react'
import { ITask, Status } from '../../Interfaces'
import styled from 'styled-components';
import { Title2 } from '../../styled';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

const TaskFormContainer = styled.div`
    border: 1px solid black;
    border-radius: 4px;
    background-color: white;
    padding:4px;
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
  const [disable, setDisable] = useState<boolean>(true)

  const handleClick = () => {
    if(!name){
      return
    }
    const newTask: ITask = {
      name: name,
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
        <Label htmlFor="name">Name</Label>
        <Input onChange={(e) => setName(e.target.value)} type="text" id="name" placeholder='name'></Input>
        <ButtonContainer>
          <Button disabled={disable} onClick={handleClick}>Create</Button>
        </ButtonContainer>
    </TaskFormContainer>
  )
}
