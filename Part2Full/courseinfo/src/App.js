
import Course from './components/Course'
import './index.css';
  const App = () => {
    const courses = [
      {
        name: 'Half Stack application development',
        id: 1,
        parts: [
          {
            name: 'Fundamentals of React',
            exercises: 10,
            completed: 0,
            id: 1
          },
          {
            name: 'Using props to pass data',
            exercises: 7,
            completed: 0,
            id: 2
          },
          {
            name: 'State of a component',
            exercises: 14,
            id: 3,
            completed: 0
          },
          {
            name: 'Redux',
            exercises: 11,
            completed: 0,
            id: 4
          }
        ]
      }, 
      {
        name: 'Road to software engineering',
        id: 2,
        parts: [
          {
            name: 'Basics of programming in C#',
            exercises: 134,
            id: 1,
            completed: 132
          },
          {
            name: 'Advanced programming with C#',
            exercises: 31,
            id: 2,
            completed: 31
          },
          {
            name: 'Algorithms and Data Structures',
            exercises: 27,
            completed: 17,
            id: 3
          }

        ]
      },
      {
        name: 'Node.js',
        id: 3,
        parts: [
          {
            name: 'Routing',
            exercises: 3,
            id: 1,
            completed: 0

          },
          {
            name: 'Middlewares',
            exercises: 7,
            completed: 0,
            id: 2
          }
        ]
      }
    ]
  
    return (
      <div>
        <h1>Web development curriculum</h1>
        <br></br>
        {courses.map(course => <Course key={course.id} course={course}/> )}
      </div>
    )
    }
export default App