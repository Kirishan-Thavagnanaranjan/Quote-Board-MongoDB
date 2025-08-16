import React from 'react'
import { Toaster } from 'react-hot-toast'
import Board from './components/Board'


const App = () => {
  return (
    <div className='flex flex-col items-center justify-center min-h-svh'>
        <Board />
        <Toaster />
    </div>
  )
}

export default App