const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes");
const bahanbakuRoutes = require("./routes/bahanbakuRoutes");
const produksiRoutes = require("./routes/produksiRoutes");
const customerRoutes = require("./routes/customerRoutes");
const supplierRoutes = require("./routes/supplierRoutes");
const eoqRoutes = require("./routes/eoqRoutes");
const jitRoutes = require('./routes/jitRoutes')
const pembelianRoutes = require('./routes/pembelianRoutes')

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/bahan-baku", bahanbakuRoutes);
app.use("/api/produksi", produksiRoutes);
app.use("/api/customer", customerRoutes);
app.use("/api/supplier", supplierRoutes);
app.use("/api/economic-order-quantity", eoqRoutes);
app.use('/api/just-in-time', jitRoutes)
app.use('/api/pembelian', pembelianRoutes)

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
