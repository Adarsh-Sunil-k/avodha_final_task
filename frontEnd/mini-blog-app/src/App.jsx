import { useState } from 'react'
import './App.css'
import PostForm from './components/includes/postForm'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <PostForm/>
    </>
  )
}

export default App
