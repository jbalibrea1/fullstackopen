import styled from 'styled-components'
import { colors } from './theme'

export const STable = styled.table`
  width: 100%;
  border-collapse: collapse;
  text-align: center;
  border-radius: 8px;
  overflow: hidden;
`

export const STHead = styled.thead`
  position: sticky;
  z-index: 100;
  border: 1px solid #333;
`

export const STHeadTR = styled.tr`
  background: ${colors.secondary[525]};
`

export const STH = styled.th`
  font-weight: normal;
  padding: 8px;
  color: ${colors.neutral[50]};
  text-transform: capitalize;
  font-weight: 600;
  font-size: 14px;
  :not(:last-of-type) {
    border-right: 1px solid #333;
  }
  :first-of-type {
    width: 20%;
    white-space: nowrap;
  }
`

export const STBody = styled.tbody``

export const STR = styled.tr`
  background: ${colors.secondary[625]};
`

export const STD = styled.td`
  padding: 8px;
  border: 1px solid #333;
  font-size: 14px;
  color: ${colors.neutral[50]};
`
