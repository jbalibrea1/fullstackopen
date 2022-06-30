import styled from 'styled-components'
import { colors } from './theme'

export const NavBar = styled.div`
  background-color: ${colors.primary[700]};
  color: ${colors.neutral[50]};
  padding: 0 250px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  text-transform: uppercase;
  width: 100vw;
  left: 50%;
  right: 50%;
  margin-left: -50vw;
  margin-right: -50vw;
  position: relative;
  box-shadow: 0 1px 6px 0 rgb(0 0 0 / 20%);
  @media (max-width: 1400px) {
    padding: 0 50px;
  }
`
