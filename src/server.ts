import "./config/env.js";
import app from "./app.js";

const PORT = Number(process.env.PORT);

if (!PORT) {
  throw new Error("PORT is not defined");
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
