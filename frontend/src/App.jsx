import { useState } from "react";
import Form from "./components/Form";
import ExportButton from "./components/ExportButton";
import LandingPage from "./components/LandingPage";

function App() {
  const [showForm, setShowForm] = useState(false);

  return (
    <div style={{ width: "100%", height: "100vh" }}>
      {!showForm ? (
        <LandingPage onStart={() => setShowForm(true)} />
      ) : (
        <>
          <Form />
          <br />
          <ExportButton />
          <RecordsPage />
        </>
      )}
    </div>
  );
}

export default App;

