const express = require("express");
const router = express.Router();

const { indexSupplier, createSupplier, deleteSupplier, editSupplier} = require('../controllers/supplierControllers')

router.get("/supplier", indexSupplier);
router.delete("/delete/:kode", deleteSupplier)
router.put("/edit/:kode", editSupplier)
router.post("/tambah", createSupplier)

module.exports = router;