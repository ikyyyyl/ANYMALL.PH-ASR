const Record = require("../models/Record");
const exportToExcel = require("../utils/excelExport");

// Save data
exports.createRecord = async (req, res) => {
  try {
    const record = await Record.create(req.body);
    res.status(201).json(record);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all data
exports.getRecords = async (req, res) => {
  const records = await Record.find();
  res.json(records);
};

// Export to Excel
exports.exportRecords = async (req, res) => {
  try {
    const { brand } = req.query;

    let filter = {};

    // ✅ Apply brand filter only if provided
    if (brand && brand.trim() !== "") {
      filter.brand = brand.trim();
    }

    const records = await Record.find(filter).sort({ date_checking: 1 });

    if (!records.length) {
      return res.status(404).json({ message: "No records found to export." });
    }

    const workbook = await exportToExcel(records);

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );

    res.setHeader(
      "Content-Disposition",
      "attachment; filename=After_Sales-Record.xlsx"
    );

    await workbook.xlsx.write(res);
    res.end();

  } catch (error) {
    console.error("Export error:", error);
    res.status(500).json({
      message: "Failed to export records",
      error: error.message,
    });
  }
};
