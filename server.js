import express from "express";

const app = express();

app.get("/test", (req, res) => {
  res.json({ status: "Success" });
});

app.listen(5000, () => {
  console.log(`Server is running on PORT:5000`);
});
