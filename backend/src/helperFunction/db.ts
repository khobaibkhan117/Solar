const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const connectDB = () => {
mongoose.set('strictQuery', true);

  mongoose
    .connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .then((conn:any) => {
      console.log(`db connected: ${conn.connection.host}`);
    })
    .catch((err:any) => {
      console.log(err);
      process.exit(1);
    });
};
export  {connectDB};
