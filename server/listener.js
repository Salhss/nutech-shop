const mongoose = require("mongoose");
const { app, PORT } = require("./app");

// -- CONNECT MONGODB --
mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: process.env.DB_NAME,
  })
  .then(() => {
    console.log("Mongoose berhasil terhubung ke MongoDB");
  })
  .catch((error) => {
    console.error("Mongoose gagal terhubung ke MongoDB:", error);
    throw error;
  });

app.listen(PORT, () => {
  console.log(`listening on http://localhost:${PORT}`);
});
