import { createGlobalStyle } from 'styled-components'
import { colors } from './theme'

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0 auto;
    padding: 0 50px;
    background: ${colors.bg};
    color: ${colors.textColor};
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    max-width: 1450px;
    overflow-x: hidden;
    font-weight: 400;
  }
  h1,h2{
   font-weight: 800;
   margin: 0.67em auto;
  }
  p{
    margin:1em auto 
  }

`

export default GlobalStyle
