import React from 'react'
import Header from './Header'
import Content from './Content'
import Total from './Total'

const Course = ({ course }) => (
  <div>
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total exer={course.parts} />
    </div>
  </div>
)
export default Course
