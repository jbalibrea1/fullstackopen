import styled from 'styled-components'
import { colors } from './theme'

export const Alert = styled.div`
  background: ${(props) =>
    props.type === 'success'
      ? `${colors.success[50]}`
      : `${colors.danger[375]}`};
  font-size: 20px;
  border-radius: 5px;
  padding: 20px;
  margin: 20px 0;
`
