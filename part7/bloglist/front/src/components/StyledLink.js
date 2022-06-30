import styled from 'styled-components'
import { colors } from './theme'
import { Link } from 'react-router-dom'

export const StyledLink = styled(Link)`
  color: ${colors.neutral[50]};
  text-decoration: none;
  padding-right: 15px;
  font-weight: 600;
  transition: var(--transiton);

  &:hover {
    color: ${colors.secondary[50]};
  }
`
