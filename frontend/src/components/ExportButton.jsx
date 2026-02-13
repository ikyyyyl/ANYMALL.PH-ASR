function ExportButton() {
  const handleExport = () => {
    window.open("http://anymall-ph-asr-backend.onrender.com/api/records/export");
  };

  return <button onClick={handleExport}>Export to Excel</button>;
}

export default ExportButton;
