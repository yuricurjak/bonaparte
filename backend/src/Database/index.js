import mongoose from 'mongoose';
import 'dotenv/config';

const mongodbUrl = process.env.MONGO_URL;

const connect = () =>
  mongoose.connect(mongodbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

export default {
  connect,
  connection: mongoose.connection
};
