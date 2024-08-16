import "dotenv/config";
import app from "./app";
import connectDB from "./db/index";


const port = process.env.SERVER_PORT || 8000;

connectDB()
  .then(() =>
    app.listen(port, () => {
      console.log(`Express running on port ${port}`);
    })
  )
  .catch((err) => {
    console.log("MongoDB connenction error can't run the application", err);
    process.exit(1);
  });
