import express from 'express';
import mongoose from 'mongoose';
import router from './routes/users.js';


const PORT = process.env.PORT;
const MONGOURL = process.env.MONGO_URL;
const app = express();

app.use(router);


mongoose
  .connect(MONGOURL)
  .then(() => {
    console.log(`db is connected succesfully`);
    app.listen(PORT, () => {
      console.log(`Server is running on port: ${PORT}`);
    })
  })
  .catch((err) => console.log(err));
