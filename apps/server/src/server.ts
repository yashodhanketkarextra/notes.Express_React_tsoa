import { app } from "./app.js";
import { PORT } from "./store.js";

app.listen(Number(PORT), () => {
  console.log(`Server is running on port ${PORT}`);
});
