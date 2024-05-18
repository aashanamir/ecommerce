import app from "./app.js";
import { errorMiddleware } from "./middleware/errorMiddleware.js";

app.listen(process.env.PORT , ()=>{

  console.log(`Server is Running On ${process.env.PORT}`);
})

app.use(errorMiddleware)