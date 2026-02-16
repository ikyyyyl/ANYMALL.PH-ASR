const mongoose = require("mongoose");

const recordSchema = new mongoose.Schema({

  brand: {
    type: String,
    enum: ["DDPAI","Dreame", "Wanbo", "Uwant"],
    },
  order_date: Date,
  under_warranty: {
    type: String,
    enum: ["Yes", "No"],
    },
  date_checking: Date,
  order_number: { 
    type: String, 
    required: true,
  },
  product_name: { 
    type: String, 
    required: true 
    },
  color: String,
  quantity: { 
    type: Number, 
    default: 1 },
  status: {
    type: String,
    enum: ["Repaired", "Pending", "Out of Warranty", "Voided Warranty", "Defective"],
    },
  problem_desc: String,
  maintenance_desc: String,
  parts_used: String,
  current_status: {
    type: String,
    enum: ["Done Repair", "Pending", "For Replacement", "Return to CX"],
    },
  unit_serial_number: { 
    type: String, 
    required: true 
    },
  note: String,
  technician: String,
  accessory_cost: { 
    type: Number, 
    default: 0 },
});

module.exports = mongoose.model("Record", recordSchema);
