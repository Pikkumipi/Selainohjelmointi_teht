const Header = (props) => {
  console.log(props)
  return (
    <div>
      <h1>{props.name}</h1>
    </div>
  )
}

const Content = (props) => {
  console.log(props)
  const { parts } = props
  return (
    <div>
      {parts.map(part => 
        <Part key={part.id} part={part}/>
      )}
    </div>
  )
}

const Part = ({part}) => {
  return (
    <div>
      <p>
        {part.name} {part.exercises}
      </p>
    </div>
  )
}
const Total = (props) => {
  console.log(props)
  let sum = 0
  for (let index = 0; index < props.parts.length; index++) {
    sum += props.parts[index].exercises
  }
  return (
    <p>Number of exercises: {sum}</p>

  )
}

const Courses = (props) => {
  console.log(props)
  const { courses } = props
  return (
    <div>
      {courses.map(course =>
      <div key={course.id}>
        <Header name={course.name} />
        <Content parts={course.parts}/>
        <Total parts={course.parts}/>
      </div>
      )}
      </div>
  )
}


const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <div>
      <Courses courses={courses}/>
    </div>
  )
}

export default App