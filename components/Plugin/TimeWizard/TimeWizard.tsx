import React, { Dispatch, SetStateAction } from 'react'
import styled from 'styled-components'
import { Title2 } from '../styled';

const TimeWizardContainer = styled.div`
    height:100px;
    width: 600px;
    border: 2px solid black;
    position: relative;
    top: 50px;
    border-radius: 50px;
    display:grid;
    grid-template-areas: 
        "left title title title title right"
        "left backward date date forward right";
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
    padding:8px;
    justify-content:center;
`
const Title = styled(Title2)`
    display:flex;
    justify-content: center;
    align-items: center;
    grid-area: title;
`
const DateTime = styled(Title2)`
    grid-area: date;
    display:flex;
    justify-content: center;
    align-items: center;
`

const Forward = styled.div`
    grid-area: forward;
    display:flex;
    justify-content: center;
    align-items: center;
`

const Backward = styled.div`
    grid-area: backward;
    display:flex;
    justify-content: center;
    align-items: center;
`

interface IOwnProps {
    date: Date;
    setDate: Dispatch<SetStateAction<Date>>;
}

export default function TimeWizard(props: IOwnProps) {

    const increaseDate = () => {
        props.setDate(addDays(props.date, 1));
    }
    const decreaseDate = () => {
        props.setDate(addDays(props.date, -1));
    }

    function addDays(date: Date, days: number) {   
        var result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
     }

  return (
    <TimeWizardContainer>
        <Title>TimeWizard</Title>
        <DateTime>{props.date.toDateString()}</DateTime>
        <Forward onClick={increaseDate}>{">>"}</Forward>
        <Backward onClick={decreaseDate}>{"<<"}</Backward>
    </TimeWizardContainer>
  )
}
