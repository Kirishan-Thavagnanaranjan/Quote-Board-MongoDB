import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import dotenv from "dotenv"

dotenv.config()

const app = express()
const port = process.env.PORT || 3000;

app.use(cors())
app.use(express.json())


// connect to mongoDB

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("MongoDB connected"))
.catch(err => console.error("MongoDB connection error:", err));


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});