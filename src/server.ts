import app from "./app.js";
import dotenv from "dotenv";

dotenv.config();

const PORT = Number(process.env.PORT);

if (!PORT) {
  throw new Error("PORT is not defined");
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
