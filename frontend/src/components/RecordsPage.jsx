import { useEffect, useState } from "react";
import API from "../services/api";

function RecordsModal({ onClose }) {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/records");
        if (!response.ok) throw new Error("Failed to fetch records");
        const data = await response.json();
              data.sort((a, b) => new Date(a.date_checking) - new Date(b.date_checking));

        
        setRecords(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRecords();
  }, []);

  const handleExport = async () => {
  try {
    const response = await API.get("/records/export", {
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
    alert("Failed to export records");
  }
};

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        {/* <button onClick={onClose} className="modal-close">
          ✖
        </button> */}
        <h2>All Records</h2>

        {loading && <p>Loading records...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}

        {!loading && !error && (
          <table className="records-table">
            <thead>
              <tr>
                <th>Order Number</th>
                <th>Brand</th>
                <th>Product Name</th>
                <th>Current Status</th>
                <th>Unit Serial Number</th>
                <th>Date of Checking</th>
              </tr>
            </thead>
            <tbody>
              {records.map((record) => (
                <tr key={record._id}>
                  <td>{record.order_number}</td>
                  <td>{record.brand}</td>
                  <td>{record.product_name}</td>
                  <td>{record.current_status}</td>
                  <td>{record.unit_serial_number}</td>
                  <td>{new Date(record.date_checking).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan="6">
                  <button type="button" className="btn-export" onClick={handleExport}>
                    <span className="btn-text">⤓ Export</span>
                  </button>
                </td>
              </tr>
            </tfoot>
          </table>
          
        )}
      </div>
    </div>
  );
}


export default RecordsModal;
