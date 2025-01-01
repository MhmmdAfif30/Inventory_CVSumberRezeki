const express = require("express");
const router = express.Router();

const { indexCustomer, createCustomer, deleteCustomer, editCustomer} = require('../controllers/customerControllers')

router.get("/customer", indexCustomer);
router.delete("/delete/:kode", deleteCustomer)
router.put("/edit/:kode", editCustomer)
router.post("/tambah", createCustomer)

module.exports = router;