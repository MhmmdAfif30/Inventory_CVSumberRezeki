const express = require("express");
const router = express.Router();

const {indexPembelian, detailPembelian, createPembelian, deletePembelian} = require('../controllers/pembelianControllers')

router.get("/pembelian", indexPembelian);
router.get("/detail-pembelian/:no_pembelian", detailPembelian)
router.get("/status-pembelian/:no_pembelian", detailPembelian)
router.delete("/delete/:no_pembelian", deletePembelian)
// router.put("/edit/:kode", editSupplier)
router.post("/tambah", createPembelian)

module.exports = router;