import { useState } from 'react';
import './ErrorReport.css';
import {useLocation, useNavigate} from "react-router-dom";
import type { Schema } from "../amplify/data/resource";
import { generateClient } from 'aws-amplify/data';

const client = generateClient<Schema>({
    authMode: 'apiKey',
});

const ErrorReport = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [fehlerID, setFehlerID] = useState('');
    const [fehlerKategorie, setFehlerKategorie] = useState('');
    const [fehlerName, setFehlerName] = useState('');
    const [status, setStatus] = useState('');
    const [beschreibung, setBeschreibung] = useState('');

    function createError() {
        client.models.Error.create({
            errorID: fehlerID,
            errorName: fehlerName,
            errorType: fehlerKategorie,
            description: beschreibung,
            status: status,
            materialID: location.state.id,
        })
    }

    const handleBack = () => {
        navigate(-1);
    };

    const handleSave = () => {
        createError();
        navigate('/0111');
    }

    return (
        <div className="report-container">
            <div className="report-grid">
                <input
                    type="text"
                    value={fehlerID}
                    onChange={(e) => setFehlerID(e.target.value)}
                    placeholder="Fehler ID"
                    className="report-input"
                />
                <select
                    value={fehlerKategorie}
                    onChange={(e) => setFehlerKategorie(e.target.value)}
                    className="report-input"
                >
                    <option value="">Fehlerkategorie</option>
                    <option value='rechtschreibFehler'>Rechtschreib Fehler</option>
                    <option value='grammatikalischerFehler'>Grammatikalischer Fehler</option>
                    <option value='inhaltlicherFehler'>inhaltlicher Fehler</option>
                    <option value='veralteteInformation'>veraltete Information</option>
                    <option value='nichtVerfuegbarkeitVonVerlinktenMaterialien'>nicht Verfuegbarkeit von verlinkten Materialien</option>
                    <option value='verbesserungsVorschlag'>Verbesserungsvorschlag</option>
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
                    <option value='new'>Neu</option>
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