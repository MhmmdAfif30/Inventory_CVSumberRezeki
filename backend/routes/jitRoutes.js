const express = require("express");
const router = express.Router();

const {indexJIT, createJIT, deleteJIT, editJIT} = require('../controllers/jitControllers')

router.get("/just-in-time", indexJIT);
router.delete("/delete/:id", deleteJIT)
router.put("/edit/:id", editJIT)
router.post("/tambah", createJIT)

module.exports = router;