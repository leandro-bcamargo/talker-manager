const app = require("./app");

const PORT = process.env.PORT || "3001";

// não remova esse endpoint, e para o avaliador funcionar

app.listen(PORT, () => {
  console.log("Online");
});
