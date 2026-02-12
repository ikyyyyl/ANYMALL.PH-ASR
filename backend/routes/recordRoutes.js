const express = require("express");
const router = express.Router();
const {
  createRecord,
  getRecords,
  exportRecords,
} = require("../controllers/recordController");

router.post("/", createRecord);
router.get("/", getRecords);
router.get("/export", exportRecords);



module.exports = router;
