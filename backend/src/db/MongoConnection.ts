import mongoose from 'mongoose';

export class MongoConnection {
  private static instance: MongoConnection;
  private constructor() {}

  static async connect(uri: string) {
    if (!MongoConnection.instance) {
      await mongoose.connect(uri);
      MongoConnection.instance = new MongoConnection();
      console.log('MongoDB connected');
    }
    return MongoConnection.instance;
  }
}