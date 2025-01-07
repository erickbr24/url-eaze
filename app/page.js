"use client"
import { useState } from "react";

export default function Home() {
  const [path, setPath] = useState("");
  const [params, setParams] = useState([{ name: "", value: "" }]);
  const [generatedURL, setGeneratedURL] = useState("");

  const handleAddParam = () => {
    setParams([...params, { name: "", value: "" }]);
  };

  const handleParamChange = (index, field, value) => {
    const newParams = [...params];
    newParams[index][field] = value;
    setParams(newParams);
  };

  const handleGenerateURL = () => {
    const query = new URLSearchParams();
    params.forEach((param) => {
      if (param.name && param.value) {
        query.append(param.name, param.value);
      }
    });
    const url = `${path}?${query.toString()}`;
    setGeneratedURL(url);

    // Copy to clipboard
    navigator.clipboard.writeText(url).then(() => {
      alert("URL copied to clipboard!");
    });
  };

  const handleDelParam = (index) => {
    params.pop(index);
  };

  return (
    <div className="container">
      <div className="form-card">
        <h1>Generador de URL Personalizado de SPOT Local</h1>
        <p>
          💡 Complete el formulario y genere un enlace personalizado a un SPOT
        </p>
        <label>
          <strong>Path:</strong>
          <input
            type="text"
            placeholder="/example-path"
            value={path}
            onChange={(e) => setPath(e.target.value)}
            className="input-field"
          />
        </label>
        <h3>Parámetros:</h3>
        {params.map((param, index) => (
          <div key={index} className="param-row">
            <input
              type="text"
              placeholder="Nombre"
              value={param.name}
              onChange={(e) =>
                handleParamChange(index, "name", e.target.value)
              }
              className="input-field small"
            />
            <input
              type="text"
              placeholder="Valor"
              value={param.value}
              onChange={(e) =>
                handleParamChange(index, "value", e.target.value)
              }
              className="input-field small"
            />
            <button onClick={handleDelParam} className="button secondary">
              Borrar
            </button>
          </div>
          
        ))}
        <button onClick={handleAddParam} className="button secondary">
          Agregar Parámetro
        </button>
        <br />
        <button onClick={handleGenerateURL} className="button primary">
          Generar URL y Copiar
        </button>
        {generatedURL && (
          <div className="result">
            <strong>URL Generada:</strong>
            <p>{generatedURL}</p>
          </div>
        )}
      </div>
    </div>
  );
}
