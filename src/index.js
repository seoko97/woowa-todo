const app = require("./app");
const ENVIRONMENTS = require("./config/constant");

app.listen(ENVIRONMENTS.PORT, () => {
  console.log(`Listen in ${ENVIRONMENTS.PORT}`);
});
