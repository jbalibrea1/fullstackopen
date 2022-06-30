import styled from 'styled-components'
import { colors } from './theme'

export const Button = styled.button`
  cursor: pointer;
  font-size: 1em;
  padding: 0.3em 1em;
  border: 1px solid #333;
  border-radius: 3px;
  margin: 0.5em 0;
  margin-left: ${(props) => props.buttonLeftMargin};
  transition: var(--transition);
  color: ${colors.neutral[50]};
  background-color: ${colors.info[375]};
  position: ${(props) => (props.absolute ? 'absolute' : 'inherit')};
  bottom: ${(props) => (props.bottom ? '0' : 'inherit')};

  &:hover {
    background-color: ${colors.info[700]};
  }
`
