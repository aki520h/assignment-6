
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import createError from 'http-errors';
dotenv.config();

const app = express();


// Middleware
app.use(cors());
app.use(express.json());
app.use(logger('dev'));
app.use(cookieParser());


// MongoDB Connection
mongoose.set('bufferCommands', false);

if (
  typeof process.env.MONGODB_URI === 'string' &&
  process.env.MONGODB_URI.trim().length > 0
) {

  mongoose.connect(
    process.env.MONGODB_URI.trim(),
    {
      serverSelectionTimeoutMS: 3000
    }
  )
  .then(() => {
    console.log("Database connection successfully!");
  })
  .catch((err) => {
    console.error("Database connection failed:", err);
  });

} else {

  console.error(
    'Database connection failed: MONGODB_URI missing in .env'
  );

}



// Schema
const AdventureSchema = new mongoose.Schema({

  destination: {
    type: String,
    required: true
  },

  country: {
    type: String,
    required: true
  },

  description: {
    type: String
  },

  color: {
    type: String,
    default: '#4facfe'
  },

  tags: {
    type: [String],
    default: ['New']
  }

});



// Model
const Adventure = mongoose.model(
  'Adventure',
  AdventureSchema
);




// CREATE API
app.post('/adventures', async (req, res) => {

  try {

    const adventure = new Adventure(req.body);

    await adventure.save();

    res.status(201).json({
      success: true,
      data: adventure
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      error: error.message
    });

  }

});




// GET API
app.get('/adventures', async (req, res) => {

  try {

    const adventures = await Adventure.find();

    res.status(200).json({
      success: true,
      data: adventures
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      error: error.message
    });

  }

});

app.delete('/adventures/:id', async (req, res) => {

    try {
  
      const deletedAdventure =
        await Adventure.findByIdAndDelete(
          req.params.id
        );
  
  
  
      // If ID not found
      if (!deletedAdventure) {
  
        return res.status(404).json({
          success: false,
          message: 'Adventure not found'
        });
  
      }
  
  
  
      res.status(200).json({
        success: true,
        message: 'Adventure deleted successfully'
      });
  
    } catch (error) {
  
      res.status(500).json({
        success: false,
        error: error.message
      });
  
    }
  
  });

  app.put('/adventures/:id', async (req, res) => {

    try {
  
      const updatedAdventure =
        await Adventure.findByIdAndUpdate(
  
          req.params.id,
  
          req.body,
  
          {
            new: true,
            runValidators: true
          }
  
        );
  
  
  
      // If ID not found
      if (!updatedAdventure) {
  
        return res.status(404).json({
          success: false,
          message: 'Adventure not found'
        });
  
      }
  
  
  
      res.status(200).json({
        success: true,
        data: updatedAdventure
      });
  
    } catch (error) {
  
      res.status(500).json({
        success: false,
        error: error.message
      });
  
    }
  
  });



// Start Server
const PORT = process.env.PORT || 8000;

app.listen(PORT, '0.0.0.0', () => {

  console.log(`Server running on port ${PORT}`);

});