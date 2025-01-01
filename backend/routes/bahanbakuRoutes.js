const express = require("express");
const router = express.Router();

const { indexBahanBaku, deleteBahanBaku, createBahanBaku, editBahanBaku} = require('../controllers/bahanbakuControllers')

router.get("/bahan-baku", indexBahanBaku);
router.delete("/delete/:kode_bahan_baku", deleteBahanBaku)
router.put("/edit/:kode_bahan_baku", editBahanBaku)
router.post("/tambah", createBahanBaku)

module.exports = router;