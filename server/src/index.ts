import app from "./app";
import { APP_PORT, TODO_FILE_PATH } from "./config";

app(TODO_FILE_PATH).listen(APP_PORT, () => {
  console.log(`App listening on port ${APP_PORT}`);
});
