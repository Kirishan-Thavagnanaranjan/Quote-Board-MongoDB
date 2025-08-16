import React, { useEffect, useState } from 'react'
import axios from "axios";
import toast from "react-hot-toast";


const API_URL = "http://localhost:4000/api/quotes";

const QuoteList = ({ refreshFlag }) => {

  const [quotes, setQuotes] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");
  const [loading, setLoading] = useState(false);

  //fetch quotes from API
  const fetchQuotes = async () => {
    try {
      const res = await axios.get(API_URL);
      setQuotes(res.data);
    }
    catch (error) {
      console.error("Error fetching quotes:", error);
      toast.error("Failed to fetch quotes. Please try again.");
    }
  };


  // Fetch on mount and when refreshFlag changes (triggered after add/edit/delete)
  useEffect(() => {
    fetchQuotes();
  }, [refreshFlag]);


  const deleteQuote = async (id) => {
    try {
      setLoading(true);
      await axios.delete(`${API_URL}/${id}`);
      toast.success("Quote deleted successfully!");
      fetchQuotes();
    }
    catch (error) {
      console.error("Error deleting quote:", error);
      toast.error("Failed to delete quote. Please try again.");
    }
    finally {
      setLoading(false);
    }
  };

  //start editing a quoate

  const startEdit = (quote) => {
    setEditId(quote.id);
    setEditText(quote.text);
  };

  //save edit quote

  const saveEdit = async () => {
    if (editText.trim() === "") {
      toast.error("Please enter a quote to edit.");
      return;
    }
    try {
      setLoading(true);
      await axios.put(`${API_URL}/${editId}`, { text: editText });
      toast.success("Quote updated successfully!");
      setEditId(null);
      setEditText("");
      fetchQuotes();
    } catch (error) {
      console.error("Error updating quote:", error);
      toast.error("Failed to update quote. Please try again.");
    } finally {
      setLoading(false);
    }

  };

  // Cancel editing 

  const cancelEdit = () => {
    setEditId(null);
    setEditText("");
  };

  if (quotes.length === 0) {
    return (
      <div className="mt-6">
        <h2 className="text-xl font-bold text-white mb-4">Quotes</h2>
        <div className="bg-white shadow-md rounded-lg p-4">
          <p className="text-gray-700">No quotes yet. Start by adding one!</p>
        </div>
      </div>

    );
  }



  return (
    <div className='mt-6'>
      <h2 className='text-xl font-bold text-white mb-4'>Quotes</h2>

      {quotes.map((quote) => (
        <div
          key={quote.id}
          className='flex bg-white mt-4 p-4 rounded-lg shadow-lg items-center justify-between'>
          {editId === quote.id ? (
            <>
              <textarea
                className='text-base w-3/4 p-2 border border-gray-300 rounded-lg'
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                rows={2}
                disabled={loading}

              />
              <button
                className='"w-20 border border-green-500 text-green-500 rounded-lg px-2 py-1 ml-2 hover:bg-green-100'
                onClick={saveEdit}
                disabled={loading}
              >
                Save </button>

              <button
                className='w-20 border border-gray-400 text-gray-400 rounded-lg px-2 py-1 ml-2 hover:bg-gray-100'
                onClick={cancelEdit}
                disabled={loading}
              >Cancel</button>
            </>
          ) : (
            <>
              <p className='text-base w-3/4 font-bold text-gray-700 p-2'>{quote.text}</p>
              <button
                className='w-20 border border-yellow-500 text-yellow-500 rounded-lg px-2 py-1 hover:bg-yellow-100'
                onClick={() => startEdit(quote)}
              >Edit</button>
              <button
                className='w-20 border border-red-500 text-red-500 rounded-lg px-2 py-1 hover:bg-red-100'
                onClick={() => deleteQuote(quote.id)}
                disabled={loading}>Delete</button>
            </>
          )}

        </div>
      ))}


    </div>
  );
};

export default QuoteList