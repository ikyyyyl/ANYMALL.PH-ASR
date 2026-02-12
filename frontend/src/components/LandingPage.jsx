import { useState } from "react";
import logo from "../assets/anymall_logo.png";
import dreame from "../assets/dreame_logo.png";
import wanbo from "../assets/wanbo_logo.png";
import uwant from "../assets/uwant_logo.png";
import ddpai from "../assets/ddpai_logo.png";
import Form from "./Form";
import RecordsPage from "./RecordsPage";

function LandingPage() {
  const [showForm, setShowForm] = useState(false);
  const [showRecords, setShowRecords] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState("");

  const handleViewRecords = () => {
    setShowRecords(true);
  };

  const openFormWithBrand = (brand) => {
    setSelectedBrand(brand);
    setShowForm(true);
  };

  return (
    <div className="portal-container">
      <img src={logo} alt="Anymall Logo" className="portal-logo" />
      <h2 className="portal-title">AFTER SALES RECORD</h2>

      <div className="brand-grid">
        <div className="brand-card red" onClick={() => openFormWithBrand("DDPAI")}>
          <div className="brand-icon">
            <img src={ddpai} alt="DDPAI Logo" />
          </div>
        </div>

        <div className="brand-card white" onClick={() => openFormWithBrand("Dreame")}>
          <div className="brand-icon">
            <img src={dreame} alt="Dreame Logo" />
          </div>
        </div>

        <div className="brand-card white" onClick={() => openFormWithBrand("Wanbo")}>
          <div className="brand-icon">
            <img src={wanbo} alt="Wanbo Logo" />
          </div>
        </div>

        <div className="brand-card orange" onClick={() => openFormWithBrand("Uwant")}>
          <div className="brand-icon">
            <img src={uwant} alt="Uwant Logo" />
          </div>
        </div>
      </div>
      <br />
      <button className="view-btn" onClick={handleViewRecords}>
        VIEW ALL RECORDS
      </button>

      {showForm && <Form onClose={() => setShowForm(false)} brand={selectedBrand} />}
      {showRecords && <RecordsPage onClose={() => setShowRecords(false)} />}
    </div>
  );
}

export default LandingPage;
