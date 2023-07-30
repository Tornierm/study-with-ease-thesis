import React from 'react'
import styled from 'styled-components';
import { SubTitle, Title } from './styled';

const HeaderContainer = styled.div`
    grid-area: header;
    display: grid;
    grid-template-areas: 
        "nada breadcrumbs nothing"
        "return title nothing"
        "no no nothing"
        ;
    grid-template-rows: 10px 1fr 10px;
    grid-template-columns: 80px 1fr 80px;
`

const GridTitle = styled(Title)`
    grid-area: title;
    display:flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
`
const GridReturn = styled.div`
    grid-area: return;
`
const GridBreadcrumbs = styled(SubTitle)`
    grid-area: breadcrumbs;
    display:flex;
    flex-direction: column;
    align-items: center;
`

interface IOwnProps {
    title: string;
    breadcrumb?: string;
    return?: () => void;
}

export default function Header(props: IOwnProps) {
  return (
    <HeaderContainer>
        <GridTitle>{props.title}</GridTitle>
        {props.return && <GridReturn onClick={props.return}>{"< Back"}</GridReturn>}
        <GridBreadcrumbs>{props.breadcrumb}</GridBreadcrumbs>
    </HeaderContainer>
  )
}
