import React, { Dispatch, SetStateAction } from 'react'
import styled from 'styled-components'
import { Title, Title2 } from '../styled';

const TimeWizardContainer = styled.div`
    height:600px;
    width: 80%;
    max-width: 400px;
    border: 2px solid black;
    border-radius: 50px;
    grid-area: wizard;
    display:grid;
    grid-template-areas: 
        "title title title title"
        "reset reset reset reset"
        "text text text text"
        "backward date date forward";
    grid-template-columns:1fr 1fr 1fr 1fr;
    grid-template-rows:50px 50px 1fr 50px;
    padding:8px;
    justify-content:center;
    margin: 24px;
`

const Story =styled.div`
    grid-area: text;
    display:flex;
    justify-content: center;
    align-items: center;
`
const StyledTitle = styled(Title)`
    display:flex;
    justify-content: center;
    align-items: center;
    grid-area: title;
`
const DateTime = styled(Title2)`
    grid-area: date;
    width:180px;
    overflow:scroll;
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
const Reset = styled.div`
    grid-area: reset;
    display:flex;
    justify-content: center;
    align-items: center;
`

interface IOwnProps {
    date: Date;
    setDate: (date: Date) => void;
    setReset: any;
    reset:boolean;
}

const InitialDate = new Date(2023,9,16)

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

     const onReset = () => {
        props.setDate(InitialDate)
        props.setReset(!props.reset)
     }

  return (
    <TimeWizardContainer>
        <StyledTitle>TimeWizard</StyledTitle>
        <Reset onClick={onReset}>Reset</Reset>
        <Story>{getStory(props.date)}</Story>
        <DateTime>{props.date.toDateString()}</DateTime>
        <Forward onClick={increaseDate}>{">>"}</Forward>
        <Backward onClick={decreaseDate}>{"<<"}</Backward>
    </TimeWizardContainer>
  )
}

const getStory = (date: Date) => {
    if(date.getTime() === new Date(2023,9,16).getTime()){
       return <>{"hello world"}</>
    } else {
        return <>{"something else"}</>
    }
}
