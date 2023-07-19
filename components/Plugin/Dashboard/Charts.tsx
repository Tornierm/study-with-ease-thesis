import styled from "styled-components"

const ChartsContainer = styled.div`
  grid-area: charts;
  background-color: yellow;
  display:flex;
`


export default function Dashboard() {
    return (
      <ChartsContainer>
            Dashboard
      </ChartsContainer>
    )
  }