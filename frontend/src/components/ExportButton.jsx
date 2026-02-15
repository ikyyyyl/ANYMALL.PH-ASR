function ExportButton() {
  const handleExport = () => {
    window.open("http://localhost:5000/api/records/export");
  };

  return <button onClick={handleExport}>Export to Excel</button>;
}

export default ExportButton;
