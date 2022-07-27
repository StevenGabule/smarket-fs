import mongoose from "mongoose";

const ConnectDB = () => {
  // check if the database is already connected
  if (mongoose.connections[0].readyState) {
    console.log('DB already initialized and connected.')
    return;
  }

  // otherwise, initialize connection
  mongoose.connect(process.env.MONGO_DB_URL as string, {}, (err) => {
    if (err) throw err;
    console.log('Successfully connected to the mongoDB');
  })

}

export default ConnectDB;
