import styled from 'styled-components'
import { colors } from './theme'

export const StyledAnchor = styled.a`
  color: ${colors.info[375]};
  text-decoration: none;
  padding-right: 15px;
  font-weight: 600;
  transition: var(--transiton);
  font-size: 1.2rem;

  &:hover {
    color: ${colors.neutral[700]};
  }
`
