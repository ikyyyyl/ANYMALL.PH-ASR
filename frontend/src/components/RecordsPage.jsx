import { useEffect, useState } from "react";

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
        setRecords(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRecords();
  }, []);

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
          </table>
        )}
      </div>
    </div>
  );
}


export default RecordsModal;
