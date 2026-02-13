import { useState } from "react";
import API from "../services/api";

function Form({ onClose, brand }) {
  const [formData, setFormData] = useState({
    brand: brand || "",
    order_date: "",
    under_warranty: "Yes",
    date_checking: "",
    order_number: "",
    product_name: "",
    color: "",
    quantity: 0,
    status: "Repaired",
    problem_desc: "",
    maintenance_desc: "",
    current_status: "Done Repair",
    unit_serial_number: "",
    note: "",
    technician: "",
    accessory_cost: 0,
  });

  const handleChange = (e) => {
    const { name, value, type } = e.target;

    setFormData({
      ...formData,
      [name]: type === "number" ? Number(value) : value,
    });
  };

  const handleSubmit = async (e) => {
    // console.log("API Base URL:", API.defaults.baseURL);
    e.preventDefault();

    try {
      const payload = formData;
      await API.post("/records", payload);
      alert("Data saved successfully!");
      // onClose();
      setFormData({
      brand: brand || "",
      order_date: "",
      under_warranty: "Yes",
      date_checking: "",
      order_number: "",
      product_name: "",
      color: "",
      quantity: 0,
      status: "Repaired",
      problem_desc: "",
      maintenance_desc: "",
      current_status: "Done Repair",
      unit_serial_number: "",
      note: "",
      technician: "",
      accessory_cost: 0,
    });

    } catch (error) {
      console.error("FULL ERROR:", error.response?.data || error.message);
      alert("Error saving data.");
    }
  };

  const handleExport = async () => {
  try {
    const response = await API.get("/records/export", {
      params: { brand: brand },
      responseType: "blob", // IMPORTANT for Excel download
    });

    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "After_Sales-Record.xlsx");
    document.body.appendChild(link);
    link.click();
    link.remove();
  } catch (error) {
    console.error("Export failed:", error);
    alert("Failed to export records. There are no data in the database to export.");
  }
};


    return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>

        {/* Header */}
        <div className="modal-header">
          <h2>After Sales Record<br /><h5>Fill in the service details below</h5></h2>
          <button className="modal-close" onClick={onClose}>✖</button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-grid">

            <div className="form-group brand-group">
              <label>Brand</label>
              <input
                type="text"
                name="brand"
                value={formData.brand}
                onChange={handleChange}
                readOnly
                disabled
              />
            </div>

            <div className="form-group">
              <label>Date of Order</label>
              <input
                type="date"
                name="order_date"
                value={formData.order_date}
                onChange={handleChange}
                required
              />
            </div>
         
              <div className="form-group">
              <label>Within the warranty period?</label>
              <select name="under_warranty" value={formData.under_warranty} onChange={handleChange} >
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>

            <div className="form-group">
              <label>Date of Checking</label>
              <input
                type="date"
                name="date_checking"
                value={formData.date_checking}
                onChange={handleChange}
                required
              />
            </div>
          
            <div className="form-group">
              <label>Order Number</label>
              <input
                type="text"
                name="order_number"
                placeholder="Order Number"
                value={formData.order_number}
                onChange={handleChange}
                required
              />
            </div>

             <div className="form-group">
              <label>Product Name</label>
              <input
                type="text"
                name="product_name"
                value={formData.product_name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Color</label>
              <input
                type="text"
                name="color"
                value={formData.color}
                onChange={handleChange}
              />
            </div>

                <div className="form-group">
              <label>Quantity</label>
              <input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                required
              />
            </div>

             <div className="form-group">
              <label>Status</label>
              <select name="status" value={formData.status} onChange={handleChange} >
                <option value="Repaired">Repaired</option>
                <option value="Pending">Pending</option>
                <option value="Out of Warranty">Out of Warranty</option>
                <option value="Voided Warranty">Voided Warranty</option>
                <option value="Defective">Defective</option>
              </select>
            </div>

            <div className="form-group full-width">
              <label>Problem Description</label>
              <input
                type="text"
                name="problem_desc"
                value={formData.problem_desc}
                onChange={handleChange}
              />
            </div>

               <div className="form-group full-width">
              <label>Maintenance Measures</label>
              <input
                type="text"
                name="maintenance_desc"
                value={formData.maintenance_desc}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Parts Used</label>
              <input
                type="text"
                name="parts_used"
                value={formData.parts_used}
                onChange={handleChange}
              />
            </div>

              <div className="form-group">
              <label>Current Status</label>
              <select name="current_status" value={formData.current_status} onChange={handleChange} >
                <option value="Done Repair">Done Repair</option>
                <option value="Pending">Pending</option>
                <option value="For Replacement">For Replacement</option>
                <option value="Return to CX">Return to CX</option>
              </select>
              </div>

              <div className="form-group">
              <label>Unit Serial Number</label>
              <input
                type="text"
                name="unit_serial_number"
                value={formData.unit_serial_number}
                onChange={handleChange}
              />
              </div>

              <div className="form-group full-width">
              <label>Note</label>
              <input
                type="text"
                name="note"
                value={formData.note}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Technician</label>
              <input
                type="text"
                name="technician"
                value={formData.technician}
                onChange={handleChange}
              />
            </div>

                <div className="form-group">
              <label>Accessory Cost</label>
              <input
                type="number"
                name="accessory_cost"
                value={formData.accessory_cost}
                onChange={handleChange}
              />
            </div>

                   
          </div>

          <div className="modal-footer">
            <button type="submit" className="btn-save">
            <span className="btn-text">
              ✓ Save Record
            </span>
            </button>

            <button type="button" className="btn-export" onClick={handleExport}>
            <span className="btn-text">⤓ Export</span>
            </button>

            <button type="button" className="btn-cancel" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Form;
