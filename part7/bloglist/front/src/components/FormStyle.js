import styled from 'styled-components'
import { colors } from './theme'

export const Form = styled.form`
  display: block;
  padding: 20px 10px;
  background-color: ${colors.neutral[50]};
  box-shadow: 0 1px 6px 0 rgb(0 0 0 / 20%);
  margin: 10px 0;
`
export const Input = styled.input`
  padding: 2px;
  margin: 5px 5px 5px 0;
  position: relative;

  &:focus::placeholder {
    outline: none;
    top: 0;
    left: 0.5em;
    font-size: 0.7em;
  }
  &::placeholder {
    position: absolute;
    left: 0;
  }
  &::placeholder::after {
    position: absolute;
    left: 5px;
    top: 3px;
    content: 'xdd';
    pointer-events: none;
    opacity: 0.6;
  }
`
