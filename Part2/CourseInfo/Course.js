import React from 'react'

const Course = ({course}) =>{

  const total = course.parts.reduce((s, p) => s= s+p.exercises,0)
    const total2= course.parts.reduce((s,p)=>  s = s + p.completed , 0 )
    const details = course.parts.map(part =>
         (<Details key={part.id}name ={part.name}
             ex ={part.exercises} c = {part.completed}/> ))
    
   
    console.log(total2)
   
        return(
        <div>
          <h3>{course.name}</h3>
           {details}
          <p>Number of exercises is {total}</p>
          <p>Completed exercises for this course is {total2}</p>
          
          <br></br>
        </div>
      )
    }
    const Details = (props) =>
    {
      return(
        <p>
          {props.name} {props.ex} {props.completed}
        </p>
      )
    }
 export default Course
