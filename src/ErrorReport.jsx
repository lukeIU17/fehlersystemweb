import { useState } from 'react';
import './ErrorReport.css';
import {useNavigate} from "react-router-dom";

const ErrorReport = () => {
    const navigate = useNavigate();
    const [fachlicheId, setFachlicheId] = useState('');
    const [fehlerKategorie, setFehlerKategorie] = useState('');
    const [fehlerName, setFehlerName] = useState('');
    const [status, setStatus] = useState('');
    const [beschreibung, setBeschreibung] = useState('');

    const handleBack = () => {
        navigate(-1);
    };

    const handleSave = () => {
        alert("Fehler gespeichert!");
        navigate('/0111');
    }

    return (
        <div className="report-container">
            <div className="report-grid">
                <select
                    value={fachlicheId}
                    onChange={(e) => setFachlicheId(e.target.value)}
                    className="report-input"
                >
                    <option value="">Fachliche ID</option>
                    <option value="id1">ID 1</option>
                    <option value="id2">ID 2</option>
                    <option value="id3">ID 3</option>
                </select>
                <select
                    value={fehlerKategorie}
                    onChange={(e) => setFehlerKategorie(e.target.value)}
                    className="report-input"
                >
                    <option value="">Fehlerkategorie</option>
                    <option value="kategorie1">Kategorie 1</option>
                    <option value="kategorie2">Kategorie 2</option>
                    <option value="kategorie3">Kategorie 3</option>
                </select>
                <input
                    type="text"
                    value={fehlerName}
                    onChange={(e) => setFehlerName(e.target.value)}
                    placeholder="Fehlername"
                    className="report-input"
                />
                <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="report-input"
                >
                    <option value="">Status</option>
                    <option value="new">Neu</option>
                    <option value="reviewing">In Bearbeitung</option>
                    <option value="pending">Wartet auf Feedback</option>
                    <option value="declined">Abgelehnt</option>
                </select>
            </div>
            <textarea
                value={beschreibung}
                onChange={(e) => setBeschreibung(e.target.value)}
                placeholder="Fehlerbeschreibung ..."
                className="description-area"
            ></textarea>
            <div className="button-group">
                <button className="back-button" onClick={handleBack}>zurück</button>
                <button className="report-button" onClick={handleSave}>speichern</button>
            </div>
        </div>
    );
};

export default ErrorReport;
