import { useEffect, useState } from "react";
import "./App.css";

export default function Home() {
  const [serverIp, setServerIp] = useState(false);
  const [basePath, setBasePath] = useState(false);
  const [loading, setLoading] = useState(false);
  const [configPage, setConfigPage] = useState(true);

  const keyDetector = async (event) => {
    if (event.keyCode === 33 || event.keyCode === 34) {
      event.preventDefault();

      if (loading) return;
      if (!loading) {
        handlerQuery(event.keyCode === 33 ? "previous" : "next");
      }
    }
  };

  const handlerQuery = async (position) => {
    const response = await fetch(`${basePath}${position}`);
    if (response.status === 200) setLoading(false);
  };

  useEffect(() => {
    document.addEventListener("keydown", keyDetector, false);
    return () => document.removeEventListener("keydown", keyDetector, false);
  }, [basePath]);

  const handlerSubmit = () => {
    if (serverIp) {
      setBasePath(`http://${serverIp}:4316/api/controller/live/`);
      setConfigPage(false);
    }
  };

  return (
    <div className="App">
      {!configPage && basePath && (
        <>
          <div
            style={{
              background: "transparent",
              position: "absolute",
              zIndex: 9999,
              left: 0,
              right: 0,
              top: 0,
              bottom: 0,
              width: "100%",
            }}
          ></div>
          <iframe
            frameBorder="0"
            width="100%"
            height={window.innerHeight}
            style={{
              maxWidth: window.innerWidth,
              maxHeight: "100%",
            }}
            src={`http://${serverIp}:4316/main`}
          ></iframe>
        </>
      )}

      {configPage && (
        <div
          style={{
            background: "black",
            height: "100vh",
            display: "flex",
            flex: 1,
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: "100px",
          }}
        >
          <input
            style={{
              padding: "20px",
              fontSize: "50px",
              textAlign: "center",
            }}
            onChange={(e) => {
              setServerIp(e.currentTarget.value);
            }}
            type="text"
            name="openlpip"
          />
          <button
            onClick={handlerSubmit}
            style={{
              padding: "20px 50px",
              fontSize: "25px",
              textTransform: "uppercase",
              marginTop: "30px",
              border: 0,
              borderRadius: "50px",
            }}
          >
            Cargar
          </button>
        </div>
      )}
    </div>
  );
}
