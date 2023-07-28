import styled from "styled-components"
import menu from "../../public/menu.png"
import right from "../../public/right.png"

const NavBar = styled.nav`
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
  box-shadow: 0 2px 4px rgba(0,0,0,.08);
  display: flex;
  align-items: center;
  padding: .5rem 1rem;
  flex-flow: row nowrap;
  justify-content: space-between;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 1030;
  height: 50px;
  background-color: #CCD6E0!important;
  grid-area: header;
`
const Left = styled.ul`
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
    margin-top: 0;
    -webkit-margin-start: .2rem;
    padding-left: 0;
    margin-bottom: 0;
    list-style: none;
    display: flex!important;
    flex-direction: row;
`
const NavLink = styled.a`
    -webkit-text-size-adjust: 100%;
    -webkit-tap-highlight-color: rgba(0,0,0,0);
    -webkit-font-smoothing: antialiased;
    font-family: "Source Sans Pro","Open Sans","Helvetica Neue",Arial,sans-serif;
    font-weight: 400;
    line-height: 1.5;
    list-style: none;
    box-sizing: border-box;
    text-decoration: none;
    background-color: transparent;
    display: block;
    padding: .5rem 1rem;
    padding-right: .5rem;
    padding-left: .5rem;
    font-size: 16px!important;
    color: #00376c!important;
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
    font-weight: 400;
    line-height: 1.5;
    color: #00376c;
    font-size: calc(0.90375rem + 0.045vw);
    list-style: none;
    box-sizing: border-box;
    position: relative;
`

const Right = styled.ul`
    height: 40px;
    width: 270px;
    background-image: url(${right.src});
`

const Menu = styled.div`
    height: 40px;
    width: 50px;
    background-image: url(${menu.src});
`

export default function Nav() {
  return <NavBar>
    <Left>
        <Menu/>
        <NavLink>Moodle-Hilfen</NavLink>
        <NavLink>Kurs Suchen</NavLink>
        <NavLink>EN</NavLink>
    </Left>
    <Right>

    </Right>
  </NavBar>
}