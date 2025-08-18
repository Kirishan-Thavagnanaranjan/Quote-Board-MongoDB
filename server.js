import express from "express"
import cors from "cors"
import mongoose, { Schema } from "mongoose"
import dotenv from "dotenv"

dotenv.config()

const app = express()
const port = process.env.PORT || 3000;

app.use(cors())
app.use(express.json())


//Define the data model
const quoteSchema = new Schema(
  {
    quote: {
      type: String,
      required: true,
      minlength: 1,
      trim: true
    }
  },{ timestamps: true });

const Quote = mongoose.model("Quote", quoteSchema);


//test api
app.get("/", (req, res) => {
  res.send("API is working correctly");
});

//Get all quotes
app.get("/quotes", async (req, res) => {
  try {
    const quotes = await Quote.find().sort({ createdAt: -1 }); // Sort by creation date, newest first
    res.json(quotes.map(q => ({
  id: q._id,
  quote: q.quote,
  createdAt: q.createdAt,
  updatedAt: q.updatedAt
  })));
  } catch (error) {
    res.status(500).json({ message: "Error fetching quotes" });
  }
});

//Create a new quote
app.post("/quotes", async (req, res) => {
  const { quote } = req.body;
  try {
    if (!quote || typeof quote !== 'string' || quote.trim() === '') {
      return res.status(400).json({ message: "Invalid quote" });
    }
    const newQuote = new Quote({ quote: quote.trim() });
    await newQuote.save();
    res.status(201).json(newQuote);
  } catch (error) {
    res.status(500).json({ message: "Error creating quote" });
  }
});

//put api to update a quote
app.put("/quotes/:id", async (req, res) => {
  const { id } = req.params;
  const { quote } = req.body;
  try {
    if (!quote || typeof quote !== 'string' || quote.trim() === '') {
      return res.status(400).json({ message: "Invalid quote" });
    }
    const updatedQuote = await Quote.findByIdAndUpdate(id, { quote: quote.trim() }, { new: true });
    if (!updatedQuote) {
      return res.status(404).json({ message: "Quote not found" });
    }
    res.json(updatedQuote);
  } catch (error) {
    res.status(500).json({ message: "Error updating quote" });
  }
});

// Delete a quote
app.delete("/quotes/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedQuote = await Quote.findByIdAndDelete(id);
    if (!deletedQuote) {
      return res.status(404).json({ message: "Quote not found" });
    }
    res.json({ message: "Quote deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting quote" });
  }
});

// connect to mongoDB

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("MongoDB connected successfully"))
.catch(err => console.error("MongoDB connection error:", err));


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});