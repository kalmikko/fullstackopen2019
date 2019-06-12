import React from 'react'

const Courses = ({ courses }) => {
    const rows = () => courses.map(course =>
      <Course 
        key={course.id}
        course={course}
      />
    )
    return (
      <ul>{rows()}</ul>
    )
  }
  
  const Course = (props) => {
    return (
      <div>
        <Header course={props.course.name} />
        <Content parts={props.course.parts} />
        <Total parts={props.course.parts} />
      </div>
    )
  }

const Header = (props) => {
    return (
        <h1>{props.course}</h1>
    )
}

const Total = ({ parts }) => {
  const sumArray = parts.map(part => part.exercises)
  const reducer = (a,c) => a+c
  const total = sumArray.reduce(reducer)
  return (
    <p>total of {total} exercises</p>
  )
}

const Part = ({ part }) => {
  return (
    <li>{part.name}, {part.exercises}</li>
  )
}

const Content = ({ parts }) => {
  const rows = () => parts.map(part => 
  <Part 
    key={part.id}
    part={part}
    />
  )
  return (
    <ul>{rows()}</ul>
  )
}

export default Courses