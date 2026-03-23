const ExcelJS = require("exceljs");

const exportToExcel = async (records) => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Records");

  worksheet.columns = [
    { header: "BRAND", key: "brand", width: 25 },
    { header: "Order Date", key: "order_date", width: 25 },
    { header: "Is it within the warranty period?", key: "under_warranty", width: 35 },
    { header: "Date of Checking", key: "date_checking", width: 25 },
    { header: "Order Number", key: "order_number", width: 40 },
    { header: "Product Name", key: "product_name", width: 40 },
    { header: "Color", key: "color", width: 20 },
    { header: "Quantity", key: "quantity", width: 20 },
    { header: "Status", key: "status", width: 20 },
    { header: "Problem Description", key: "problem_desc", width: 50 },
    { header: "Maintenance Measures", key: "maintenance_desc", width: 50 },
    { header: "Parts Used", key: "parts_used", width: 30 },
    { header: "Current Status", key: "current_status", width: 20 },
    { header: "Unit Serial Number", key: "unit_serial_number", width: 40 },
    { header: "NOTE", key: "note", width: 55 },
    { header: "Technician", key: "technician", width: 25 },
    { header: "Accessory Cost", key: "accessory_cost", width: 25 },
  ];

  records.forEach((record) => {
  worksheet.addRow({
    brand: record.brand,
    order_date: record.order_date
      ? new Date(record.order_date).toLocaleDateString()
      : "",
    under_warranty: record.under_warranty,
    date_checking: record.date_checking
      ? new Date(record.date_checking).toLocaleDateString()
      : "",
    order_number: record.order_number,
    product_name: record.product_name,
    color: record.color,
    quantity: record.quantity,
    status: record.status,
    problem_desc: record.problem_desc,
    maintenance_desc: record.maintenance_desc,
    parts_used: record.parts_used,
    current_status: record.current_status,
    unit_serial_number: record.unit_serial_number,
    note: record.note,
    technician: record.technician,
    accessory_cost: record.accessory_cost,
  });
});

  // Style header row (row 1)
const headerRow = worksheet.getRow(1);

headerRow.eachCell((cell) => {
  cell.font = { bold: true, color: { argb: "FFFFFFFF" } }; // white text
  cell.fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: "FF2A5C53" }, // dark green background (you can change color)
  };
  cell.alignment = {
    vertical: "middle",
    horizontal: "center",
    wrapText: true,
  };
});

headerRow.height = 25; // optional: taller header row

worksheet.eachRow((row) => {
    row.eachCell((cell) => {
      cell.alignment = {
        vertical: "middle",
        horizontal: "center",
        wrapText: true,
      };
    });
    row.height = 20;
  });

  return workbook;
};

module.exports = exportToExcel;
