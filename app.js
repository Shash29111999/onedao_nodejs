require("dotenv").config();
const express = require("express");
const { init } = require("./models");
const authRoutes = require("./routes/auth.routes");
const testRoutes = require("./routes/test.routes");
const productRoutes = require("./routes/product.routes");

const app = express();
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/test", testRoutes);
app.use("/api/products", productRoutes);

init().then(() => {
	app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));
});
