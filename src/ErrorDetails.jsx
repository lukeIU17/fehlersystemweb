import { useState } from 'react';
import './ErrorDetails.css';
import {useNavigate} from "react-router-dom";

const ErrorDetails = () => {
    const navigate = useNavigate();
    const [materialname, setMaterialname] = useState('');
    const [linkedcourses, setLinkedcourses] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [errorstatus, setErrorstatus] = useState('');
    const [errorhistory, setErrorhistory] = useState('');
    const [additions, setAdditions] = useState('');
    const [beschreibung, setBeschreibung] = useState('');

    const handleBack = () => {
        navigate(-1);
    };

    const handleEdit = () => {
        navigate('/0110')
    }

    const handleDelete = () => {
        if(confirm("Sind Sie sicher, dass sie den Fehler löschen wollen?")) {
            alert("Fehler gelöscht!");
            navigate('/0100');
        } else {
            alert("Löschen abgebrochen!");
        }
    };

    return (
        <div className="detail-container">
            <div className="detail-grid">
                <table className="material-details">
                    <thead>
                    <tr>
                        <th>Materialname</th>
                        <th>Verknüpfte Kurse</th>
                        <th>Kategorie</th>
                        <th>Beschreibung</th>
                        <th>Fehlerstatus</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td><input
                            type="materialname"
                            id="materialname"
                            name="materialname"
                            placeholder="Materialname"
                            value={materialname}
                            onChange={(e) => setMaterialname(e.target.value)}
                        /></td>
                        <td><input
                            type="linkedcourses"
                            id="linkedcourses"
                            name="linkedcourses"
                            placeholder="Kurse"
                            value={linkedcourses}
                            onChange={(e) => setLinkedcourses(e.target.value)}
                        /></td>
                        <td><input
                            type="category"
                            id="category"
                            name="category"
                            placeholder="Kategorie"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        /></td>
                        <td><input
                            type="description"
                            id="description"
                            name="description"
                            placeholder="Beschreibung"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        /></td>
                        <td><input
                            type="errorstatus"
                            id="errorstatus"
                            name="errorstatus"
                            placeholder="Status"
                            value={errorstatus}
                            onChange={(e) => setErrorstatus(e.target.value)}
                        /></td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <div className="history-grid">
                <table className="history-table">
                    <thead>
                    <tr>
                        <th>Fehlerhistorie</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td><input
                            type="errorhistory"
                            id="errorhistory"
                            name="errorhistory"
                            placeholder="Beschreibung"
                            value={errorhistory}
                            onChange={(e) => setErrorhistory(e.target.value)}
                        /></td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <div className="additions-grid">
                <table className="additions-table">
                    <thead>
                        <tr>
                            <th>Ergänzungen</th>
                        </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td><input
                            type="additions"
                            id="additions"
                            name="additions"
                            value={additions}
                            onChange={(e) => setAdditions(e.target.value)}
                        /></td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <div className="comment">
                <textarea
                    value={beschreibung}
                    onChange={(e) => setBeschreibung(e.target.value)}
                    placeholder="Kommentar ..."
                    className="description-area"
                ></textarea>
            </div>
            <div className="button-group">
                <button className="back-button" onClick={handleBack}>zurück</button>
                <button className="edit-button" onClick={handleEdit}>bearbeiten</button>
                <button className="report-button" onClick={handleDelete}>Fehler löschen</button>
            </div>
        </div>
    );
};

export default ErrorDetails;
