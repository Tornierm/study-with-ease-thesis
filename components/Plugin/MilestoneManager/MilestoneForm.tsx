import React, { useState } from 'react'
import { IMilestone } from '../Interfaces'
import styled from 'styled-components';
import { Title2 } from '../styled';

interface IOwnProps {
    milestone: IMilestone;
}

const MilestoneFormContainer = styled.div`
    
`

export default function MilestoneForm(props: IOwnProps) {

  return (
    <MilestoneFormContainer>
        <Title2>MilestoneForm</Title2>
        {/* <FormGroup
            label="Milestone name"
            labelFor="text-input"
            labelInfo="(required)"
        >
            <InputGroup />
        </FormGroup> */}
    </MilestoneFormContainer>
  )
}
