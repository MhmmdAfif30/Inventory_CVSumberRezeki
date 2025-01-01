const express = require("express");
const router = express.Router();

const { indexEOQ, createEOQ, editEOQ, deleteEOQ } = require('../controllers/eoqControllers')

router.get("/economic-order-quantity", indexEOQ);
router.delete("/delete/:id", deleteEOQ)
router.put("/edit/:id", editEOQ)
router.post("/tambah", createEOQ)

module.exports = router;