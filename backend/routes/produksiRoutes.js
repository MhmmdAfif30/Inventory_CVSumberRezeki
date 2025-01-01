const express = require("express");
const router = express.Router();

const { indexProduksi, deleteProduksi, createProduksi, editProduksi} = require('../controllers/produksiControllers')

router.get("/produksi", indexProduksi);
router.delete("/delete/:kode_produksi", deleteProduksi)
router.put("/edit/:kode_produksi", editProduksi)
router.post("/tambah", createProduksi)

module.exports = router;