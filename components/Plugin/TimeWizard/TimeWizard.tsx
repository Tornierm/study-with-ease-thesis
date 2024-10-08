"use client";

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Title, Title2 } from '../styled';

const TimeWizardContainer = styled.div`
    height: 600px;
    width: 80%;
    max-width: 400px;
    border: 2px solid white;
    border-radius: 50px;
    grid-area: wizard;
    display: grid;
    grid-template-areas:
        "title title title title"
        "text text text text"
        "reset reset reset reset"
        "backward date date forward";
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-template-rows: 50px 1fr 50px 50px;
    padding: 8px;
    justify-content: center;
    margin: 24px;
    background-color: #343434;
    color: #ededed;
`;

const Story = styled.div`
    grid-area: text;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const StyledTitle = styled(Title)`
    display: flex;
    justify-content: center;
    align-items: center;
    grid-area: title;
`;

const DateTime = styled(Title2)`
    grid-area: date;
    width: 180px;
    overflow: scroll;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Forward = styled.div`
    grid-area: forward;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
`;

const Backward = styled.div`
    grid-area: backward;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
`;

const Reset = styled.div`
    grid-area: reset;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
`;

const Text = styled.div`
    text-align: justify;
`;

const Instruction = styled.div`
    text-align: justify;
    font-style: italic;
    border: 1px solid #fefefe;
    padding: 8px;
`;

const Red = styled.p`
    color: red;
    text-align: justify;
    display: inline;
`;

const TextBox = styled.div`
    grid-area: text;
    display: flex;
    flex-direction: column;
    gap: 16px;
`;

interface IOwnProps {
    date: Date;
    setDate: (date: Date) => void;
    setReset: React.Dispatch<React.SetStateAction<boolean>>;
    reset: boolean;
}

const InitialDate = new Date(2023, 9, 15);

export default function TimeWizard(props: IOwnProps) {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const increaseDate = () => {
        props.setDate(addDays(props.date, 1));
    };

    const decreaseDate = () => {
        props.setDate(addDays(props.date, -1));
    };

    function addDays(date: Date, days: number) {
        const result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
    }

    const onReset = () => {
        props.setDate(InitialDate);
        props.setReset(!props.reset);
    };

    if (!isClient) {
        return null; // Prevent rendering until on the client side
    }

    return (
        <TimeWizardContainer>
            <StyledTitle>Simulator</StyledTitle>
            <Reset onClick={onReset}>
                <Red>reset</Red>
            </Reset>
            <Story>{getStory(props.date)}</Story>
            <DateTime>{props.date.toDateString()}</DateTime>
            <Forward onClick={increaseDate}>
                <Red>{">>"}</Red>
            </Forward>
            <Backward onClick={decreaseDate}>
                <Red>{"<<"}</Red>
            </Backward>
        </TimeWizardContainer>
    );
}

const getStory = (date: Date) => {
    if(date.getTime() === new Date(2023,9,15).getTime()){
       return <TextBox>
              <Text>{"Welcome to study-with-ease - a plug-in to support your task management. This Simulator exists to help us simulate how this plug-in would support you throughout a semester."}</Text>
            <Instruction>{"Press "}<Red>{">>"}</Red>{" next to the current date to go to the next day. "}<br/>{" Press "}<Red>{"reset"}</Red>{" to return to the initial state of the plug-in."}</Instruction>
       </TextBox>
    } else if(date.getTime() === new Date(2023,9,16).getTime()){
        return <TextBox>
              <Text>{"You have a new assignment in Math. Your instructor already provided milestones for you."}</Text>
            <Instruction>{"1. Click the checkbox on the \"Solve Section 1\" milestone and check your progress in the daily and weekly chart. "}<br/>{"2. Then forward 2 days."}</Instruction>
       </TextBox>
     } else if(date.getTime() === new Date(2023,9,18).getTime()){
        return <TextBox>
              <Text>{"You have a new Assignment in Philosophy. Your instructor already provided milestones for you. Additionally he provided tasks for one of the milestones."}</Text>
            <Instruction>
                {"1. Click on \">\" on the \"Research and Gather Information\" milestone to visit the MilestoneManager. "}
                <br/>{"2. Click on \">\" on the \"Research and Gather Information\" milestone to visit the TaskManager. "}
                <br/>{"3. Complete the task \"Read \"A Theory of Justice\" by John Rawls\"."}
                <br/>{"4. Then Forward 1 day."}
            </Instruction>
       </TextBox>
     } else if(date.getTime() === new Date(2023,9,19).getTime()){
        return <TextBox>
              <Text>{"You have a new assignment in Metaphysics. This assignment does not have any Milestones specified. You have to plan it yourself !"}</Text>
            <Instruction>{"1. Click on \">\” on the \"Plan\" milestone, check the instructions and create milestones that imply completion of the assignment."}<br/>{"2. Click the checkbox on the \"Plan\" milestone."}<br/>{"3. Forward 4 days."}</Instruction>
       </TextBox>
    } else if(date.getTime() === new Date(2023,9,23).getTime()){
        return <TextBox>
              <Text>{" "}</Text>
            <Instruction>{"1. Complete \"Solve Section 2\" and \"Solve Section 3\", by clicking the checkbox for the corresponding milestone. "}
            <br/>{"2. Now scroll down on the chart section to see the assignment progress in the pie chart."}
            <br/>{"3. Complete the \"Submit\" milestone of this assignment. "}
            <br/>{"4. Skip until the 29th of October."}</Instruction>
       </TextBox>
    } else if(date.getTime() === new Date(2023,9,29).getTime()){
        return <TextBox>
              <Text>{"Quite some milestones have accumulated. It's sunday and you have quite some time on your hands to work on your assignments."}</Text>
            <Instruction>{"1. Complete any Milestones you feel are neccessary."}</Instruction>
       </TextBox>
    } 
    //  if(date.getTime() === new Date(2023,9,20).getTime()){
    //     return <TextBox>
    //           <Text>{"You have a new assignment in Marketing. This assignment does not have any Milestones specified. You have to plan it yourself !"}</Text>
    //         <Instruction>{"Plan the assignment now or once it feels appropriate, by clicking on \">\” on the milestone, checking the instructions and creating milestones towards the completion of the assignment."}</Instruction>
    //    </TextBox>
    //  }
}
