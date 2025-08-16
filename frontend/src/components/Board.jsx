import React from 'react'
import QuoteForm from './QuoteForm'
import QuoteList from './QuoteList'

const Board = () => {

  const [refreshFlag, setRefreshFlag] = React.useState(0);

  //Function to refresh list, passed down to QuoteForm

  const refreshQuotes = () => setRefreshFlag(prev => prev + 1);


  return (
    <div className='flex flex-col items-center justify-center min-h-screen w-full bg-blue-100'>
      <main className='bg-sky-800 shadow-lg rounded-lg p-6 w-full min-w-md max-w-3xl mt-4'>

        <QuoteForm onQuoteAdded={refreshQuotes} />
        <QuoteList refreshFlag={refreshFlag} />
      </main>


    </div>
  )
}

export default Board