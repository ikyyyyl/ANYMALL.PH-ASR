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
      {/* Page background ornaments (spread, placed behind content) */}
      <div className="page-ornaments" aria-hidden="true">
       
      
     
      
       
        {/* Brand/logo images used as far-background ornaments (spread) */}
        <img src={ddpai} className="orn-img ddpai-orn" alt="" />
        <img src={dreame} className="orn-img dreame-orn" alt="" />
        <img src={wanbo} className="orn-img wanbo-orn" alt="" />
        <img src={uwant} className="orn-img uwant-orn" alt="" />
        <img src={logo} className="orn-img anymall-orn" alt="" />
      </div>
      <img src={logo} alt="Anymall Logo" className="portal-logo" />
      <h2 className="portal-title">AFTER SALES RECORD</h2>

      <div className="brand-grid">
        <div className="brand-card red" onClick={() => openFormWithBrand("DDPAI")}>
          <img src={ddpai} alt="" className="brand-bg" />
          <svg className="bg-pattern pattern-dashcam" viewBox="0 0 120 120" aria-hidden="true">
            <g fill="none" stroke="currentColor" strokeWidth="1">
              <circle cx="20" cy="20" r="2" />
              <circle cx="40" cy="34" r="2" />
              <circle cx="70" cy="18" r="2" />
              <circle cx="96" cy="38" r="2" />
              <path d="M10 90 L30 70 L50 90 L70 70" />
            </g>
          </svg>
          {/* decorative drawing icon behind */}
          <svg className="brand-art dashcam" viewBox="0 0 64 64" aria-hidden="true">
            <rect x="6" y="16" width="52" height="32" rx="6" fill="none" stroke="currentColor" strokeWidth="2" />
            <circle cx="32" cy="32" r="8" fill="none" stroke="currentColor" strokeWidth="2" />
            <rect x="10" y="10" width="8" height="6" rx="1" fill="none" stroke="currentColor" strokeWidth="1.5" />
          </svg>
          <div className="brand-icon">
            <img src={ddpai} alt="DDPAI Logo" />
          </div>
          <p className="brand-caption">Smart Dashcam</p>
        </div>

        <div className="brand-card white" onClick={() => openFormWithBrand("Dreame")}>
          <img src={dreame} alt="" className="brand-bg" />
          <svg className="bg-pattern pattern-vacuum" viewBox="0 0 120 120" aria-hidden="true">
            <g fill="none" stroke="currentColor" strokeWidth="1">
              <circle cx="18" cy="18" r="2" />
              <circle cx="40" cy="24" r="2" />
              <circle cx="80" cy="28" r="2" />
              <path d="M12 86 L28 70 L44 86" />
              <path d="M70 70 L86 86" />
            </g>
          </svg>
          <svg className="brand-art vacuum" viewBox="0 0 64 64" aria-hidden="true">
            <circle cx="32" cy="32" r="18" fill="none" stroke="currentColor" strokeWidth="2" />
            <circle cx="32" cy="32" r="6" fill="none" stroke="currentColor" strokeWidth="1.6" />
            <path d="M14 40c4-6 10-10 18-10s14 4 18 10" fill="none" stroke="currentColor" strokeWidth="1.4" />
          </svg>
          <div className="brand-icon">
            <img src={dreame} alt="Dreame Logo" />
          </div>
          <p className="brand-caption">Robot Vacuum</p>
        </div>

        <div className="brand-card white" onClick={() => openFormWithBrand("Wanbo")}>
          <img src={wanbo} alt="" className="brand-bg" />
          <svg className="bg-pattern pattern-projector" viewBox="0 0 120 120" aria-hidden="true">
            <g fill="none" stroke="currentColor" strokeWidth="1">
              <rect x="14" y="14" width="6" height="6" rx="1" />
              <rect x="34" y="18" width="4" height="4" rx="1" />
              <circle cx="90" cy="30" r="2" />
              <path d="M12 86 L36 62 L60 86" />
            </g>
          </svg>
          <svg className="brand-art projector" viewBox="0 0 64 64" aria-hidden="true">
            <rect x="8" y="18" width="38" height="20" rx="2" fill="none" stroke="currentColor" strokeWidth="2" />
            <circle cx="50" cy="28" r="6" fill="none" stroke="currentColor" strokeWidth="1.8" />
            <path d="M46 40l10 6" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
          </svg>
          <div className="brand-icon">
            <img src={wanbo} alt="Wanbo Logo" />
          </div>
          <p className="brand-caption">Smart Projector</p>
        </div>

        <div className="brand-card orange" onClick={() => openFormWithBrand("Uwant")}>
          <img src={uwant} alt="" className="brand-bg" />
          <svg className="bg-pattern pattern-audio" viewBox="0 0 120 120" aria-hidden="true">
            <g fill="none" stroke="currentColor" strokeWidth="1">
              <circle cx="26" cy="26" r="2" />
              <circle cx="44" cy="44" r="2" />
              <path d="M10 80 L30 60 L50 80" />
            </g>
          </svg>
          <svg className="brand-art audio" viewBox="0 0 64 64" aria-hidden="true">
            <rect x="14" y="22" width="10" height="20" rx="2" fill="none" stroke="currentColor" strokeWidth="2" />
            <path d="M28 28c4-2 8-2 12 0s8 6 12 8" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            <path d="M28 36c4 2 8 2 12 0s8-2 12 0" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
          <div className="brand-icon">
            <img src={uwant} alt="Uwant Logo" />
          </div>
          <p className="brand-caption">Audio Device</p>
        </div>
      </div>
      <div className="title-divider" />
      <button className="view-btn" onClick={handleViewRecords}>
        VIEW ALL SERVICE RECORDS
      </button>

      {showForm && <Form onClose={() => setShowForm(false)} brand={selectedBrand} />}
      {showRecords && <RecordsPage onClose={() => setShowRecords(false)} />}
    </div>
  );
}

export default LandingPage;
