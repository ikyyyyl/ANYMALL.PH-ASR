import { useEffect, useState } from "react";
import API from "../services/api";

function RecordsModal({ onClose }) {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");

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
    let url = "/records/export";
    const params = new URLSearchParams();
    
    if (startDate) params.append("startDate", startDate);
    if (endDate) params.append("endDate", endDate);
    
    if (params.toString()) {
      url += "?" + params.toString();
    }

    const response = await API.get(url, {
      responseType: "blob",
    });

    const blobUrl = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = blobUrl;
    link.setAttribute("download", "After_Sales-Record.xlsx");
    document.body.appendChild(link);
    link.click();
    link.remove();
  } catch (error) {
    console.error("Export failed:", error);
    alert("Failed to export records");
  }
};

  const handleExportByBrand = async (brand) => {
  try {
    let url = `/records/export?brand=${encodeURIComponent(brand)}`;
    
    if (startDate) url += `&startDate=${startDate}`;
    if (endDate) url += `&endDate=${endDate}`;

    const response = await API.get(url, {
      responseType: "blob",
    });

    const blobUrl = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = blobUrl;
    link.setAttribute("download", `${brand}-After_Sales-Record.xlsx`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  } catch (error) {
    console.error("Export failed:", error);
    alert(`Failed to export ${brand} records`);
  }
};

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>All Service Records</h2>
          <button onClick={onClose} className="close-x">
            ✖
          </button>
        </div>

        {loading && <p>Loading records...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}

        {!loading && !error && (
          <>
            <div className="filter-section" style={{ padding: "15px", borderBottom: "1px solid #ddd", display: "flex", gap: "10px", alignItems: "center", flexWrap: "wrap" }}>
              <label style={{ fontWeight: "bold" }}>Filter by Brand:</label>
              <select
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
                style={{ padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
              >
                <option value="">All Brands</option>
                <option value="DDPAI">DDPAI</option>
                <option value="Dreame">Dreame</option>
                <option value="Wanbo">Wanbo</option>
                <option value="Uwant">Uwant</option>
              </select>

              <label style={{ fontWeight: "bold", marginLeft: "20px" }}>Filter by Date:</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                placeholder="Start Date"
                style={{ padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
              />
              <span>to</span>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                placeholder="End Date"
                style={{ padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
              />
              {(startDate || endDate || selectedBrand) && (
                <button
                  onClick={() => { setStartDate(""); setEndDate(""); setSelectedBrand(""); }}
                  style={{ padding: "8px 12px", borderRadius: "4px", border: "1px solid #999", cursor: "pointer", background: "#f0f0f0" }}
                >
                  Clear Filters
                </button>
              )}
            </div>
            <div className="records-table-wrapper">
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
                  {records
                    .filter((record) => !selectedBrand || record.brand === selectedBrand)
                    .filter((record) => {
                      if (!startDate && !endDate) return true;
                      const recordDate = new Date(record.date_checking);
                      const start = startDate ? new Date(startDate) : null;
                      const end = endDate ? new Date(endDate) : null;
                      
                      if (start && recordDate < start) return false;
                      if (end) {
                        const endOfDay = new Date(end);
                        endOfDay.setHours(23, 59, 59, 999);
                        if (recordDate > endOfDay) return false;
                      }
                      return true;
                    })
                    .map((record) => (
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
              </table>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn-export" onClick={handleExport}>
                <span className="btn-text">⤓ Export All</span>
              </button>
              <button type="button" className="btn-export" onClick={() => handleExportByBrand("DDPAI")}>
                <span className="btn-text">⤓ Export DDPAI</span>
              </button>
              <button type="button" className="btn-export" onClick={() => handleExportByBrand("Dreame")}>
                <span className="btn-text">⤓ Export Dreame</span>
              </button>
              <button type="button" className="btn-export" onClick={() => handleExportByBrand("Wanbo")}>
                <span className="btn-text">⤓ Export Wanbo</span>
              </button>
              <button type="button" className="btn-export" onClick={() => handleExportByBrand("Uwant")}>
                <span className="btn-text">⤓ Export Uwant</span>
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}


export default RecordsModal;
