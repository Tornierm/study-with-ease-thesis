import styled from "styled-components"
import Image from 'next/image'
import courseList from '../../public/courseList.png'

const Container = styled.div`
        -webkit-text-size-adjust: 100%;
    -webkit-tap-highlight-color: rgba(0,0,0,0);
    --blue: #0f6cbf;
    --indigo: #6610f2;
    --purple: #613d7c;
    --pink: #e83e8c;
    --red: #ca3120;
    --orange: #f0ad4e;
    --yellow: #ff7518;
    --green: #357a32;
    --teal: #20c997;
    --cyan: #008196;
    --white: #fff;
    --gray: #6a737b;
    --gray-dark: #343a40;
    --primary: #0f6cbf;
    --secondary: #ced4da;
    --success: #357a32;
    --info: #008196;
    --warning: #f0ad4e;
    --danger: #ca3120;
    --light: #f8f9fa;
    --dark: #343a40;
    --breakpoint-xs: 0;
    --breakpoint-sm: 576px;
    --breakpoint-md: 768px;
    --breakpoint-lg: 992px;
    --breakpoint-xl: 1200px;
    --font-family-sans-serif: "Source Sans Pro","Open Sans","Helvetica Neue",Arial,sans-serif;
    --font-family-monospace: SFMono-Regular,Menlo,Monaco,Consolas,"Liberation Mono","Courier New",monospace;
    -webkit-font-smoothing: antialiased;
    font-family: "Source Sans Pro","Open Sans","Helvetica Neue",Arial,sans-serif;
    font-size: .9375rem;
    font-weight: 400;
    line-height: 1.5;
    color: #00376c;
    text-align: left;
    box-sizing: border-box;
    width: 285px;
    height: calc(100% - 50px);
    overflow-y: auto;
    z-index: 999;
    transition: right 0.5s ease,left 0.5s ease;
    right: auto;
    left: 0;
    padding: 0;
    background-color: #F2F4F6;
    grid-area: menu;
    margin-right: 24px;
`

export default function Menu() {

    return (
      <Container>
          <Image
            src={courseList}
            width={285}
            alt="Picture of the author"
          />
      </Container>
    )
  }