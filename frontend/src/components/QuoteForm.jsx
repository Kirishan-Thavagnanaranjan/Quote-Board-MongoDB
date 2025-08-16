import React from 'react'
import toast from 'react-hot-toast';
import axios from "axios";

const API_URL = "http://localhost:4000/api/quotes";

const QuoteForm = ({ onQuoteAdded }) => {

  const [quote, setQuote] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const handleClick = async (e) => {
    e.preventDefault();

    if (!quote.trim()) {
      toast.error("Please enter a quote.");
      return;
    }
  
    try {
      setLoading(true);
      await axios.post(API_URL, { text: quote });
      toast.success("Quote added!");
      setQuote("");
      onQuoteAdded(); // Notify parent component to refresh quotes
    }
    catch (error) {
      console.error("Error adding quote:", error);
      toast.error("Failed to add quote. Please try again.");
    } finally {
      setLoading(false);
    }
    if (onQuoteAdded) onQuoteAdded();
  };

  


  return (
    <div className='bg-white shadow-md rounded-lg p-6 w-full min-w-md max-w-3xl mt-9'>
      <h2 className='font-extrabold text-2xl text-center text-rose-400 mt- p-3 font-serif'>QUOTE BOARD</h2>
      <form className='flex flex-col'>
        <textarea className='border border-gray-300 rounded-lg p-2 mt-2'
          rows='4'
          placeholder='Enter your quote here...'
          value={quote}
          onChange={(e) => setQuote(e.target.value)}
        ></textarea>
        <button className='bg-rose-400 text-white font-bold py-2 px-4 rounded-lg mt-4 hover:bg-rose-500'
          onClick={handleClick}
          disabled={loading}>
                {loading ? "Saving..." : "Add Quote"}</button>
      </form>
    </div>
  )
}

export default QuoteForm