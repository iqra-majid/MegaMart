import mongoose from 'mongoose';

const connectDb = handler => async (req, res) => {
  if (mongoose.connections[0].readyState !== 1) {
    // Use try-catch block to handle potential connection errors
    try {
      await mongoose.connect(process.env.MONGO_URI, {
      });
      console.log('MongoDB connected ');
    } catch (error) {
      console.error('MongoDB connection error:', error);
      res.status(500).json({ error: 'Database connection error' });
      return;
    }
  }
  return handler(req, res);
};



export default connectDb;
