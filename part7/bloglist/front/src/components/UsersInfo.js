import React from 'react'
import { useSelector } from 'react-redux'
import { STable, STBody, STR, STD, STH, STHead, STHeadTR } from './Table'
import { StyledLink } from './StyledLink'

const UsersInfo = () => {
  const usersState = useSelector((state) => state.users)

  return (
    <div>
      <h2>Users</h2>
      <STable>
        <STHead>
          <STHeadTR>
            <STH></STH>
            <STH>
              <b>Blogs created</b>
            </STH>
          </STHeadTR>
        </STHead>
        <STBody>
          {usersState.map((user) => {
            return (
              <STR key={user.id}>
                <STD>
                  <StyledLink to={`/users/${user.id}`}>{user.name}</StyledLink>
                </STD>
                <STD>{user.blogs.length}</STD>
              </STR>
            )
          })}
        </STBody>
      </STable>
    </div>
  )
}

export default UsersInfo
