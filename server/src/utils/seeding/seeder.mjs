import { readFile } from 'fs/promises';
import mongoose, { Schema, Types } from 'mongoose';

const JobSchema = new Schema({
  company: {
      type: String,
      maxLength: 50,
      required: [true, 'Please provide company !'],
  },
  position: {
      type: String,
      maxLength: 50,
      required: [true, 'Please provide position !'],
  },
  status: {
      type: String,
      enum: ['interview', 'declined', 'pending'],
      default: 'pending',
  },
  jobType: {
      type: String,
      enum: ['full-time', 'part-time', 'internship', 'remote'],
      default: 'full-time',
  },
  jobLocation: {
      type: String,
      default: 'TP.HCM',
      required: [true, 'Please provide job location !'],
  },
  createdBy: {
      type: Types.ObjectId,
      ref: 'User',
      required: [true, 'Please provide user'],
  },
}, { timestamps: true });

import dotenv from 'dotenv';
dotenv.config();

const start = async () => {
  const USER_ID = Types.ObjectId('63d49005d9f4468f7cfcc877'); // CHANGE USER_ID HERE
  
  try {
    const { MONGO_USER, MONGO_PASSWORD, MONGO_PATH } = process.env;
    mongoose.set('strictQuery', false);
    await mongoose.connect(`mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}${MONGO_PATH}`);

    const jsonProducts = JSON.parse(
      await readFile(new URL('./mock-data.json', import.meta.url), 'utf-8')
    );
    const createdProducts = jsonProducts.map((p) => {
      return {
        ...p,
      createdBy: USER_ID
      }
    });
    await mongoose.model('Job', JobSchema).create(createdProducts);
    console.log('Success!!!');
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

start();
