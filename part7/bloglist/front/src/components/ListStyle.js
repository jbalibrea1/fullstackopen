import styled from 'styled-components'
import { colors } from './theme'
import { Link } from 'react-router-dom'

export const UlStyle = styled.ul`
  margin: 0;
  padding: 0;

  border-radius: 25px;
`

export const LiStyle = styled.li`
  list-style: none;
  background-color: ${colors.secondary[525]};
  padding: 10px 15px;
  color: ${colors.primary[50]};
  font-weight: 600;

  &:nth-child(even) {
    background-color: ${colors.secondary[700]};
  }

  &:first-child {
    border-radius: 10px 10px 0 0;
  }
  &:last-child {
    border-radius: 0 0 10px 10px;
  }
`

export const StyleLinkList = styled(Link)`
  text-decoration: none;
  color: ${colors.primary[50]};
  font-weight: 600;
  transition: var(--transiton);

  &:hover {
    color: ${colors.secondary[50]};
  }
`
