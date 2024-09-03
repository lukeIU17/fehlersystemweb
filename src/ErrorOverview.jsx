import { useState } from 'react';
import { Link } from 'react-router-dom';
import './ErrorOverview.css';
import {useNavigate} from "react-router-dom";

const ErrorOverview = () => {
    const navigate = useNavigate();
    const [materialname, setMaterialname] = useState('');
    const [linkedcourses, setLinkedcourses] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [selectedErrorType, setSelectedErrorType] = useState('');

    const handleBack = () => {
        navigate(-1);
    };

    const handleEditMaterials = () => {
        navigate('/0011');
    };

    const handleReportError = () => {
        navigate('/0110');
    }

    return (
        <div className="error-container">
            <div className="error-grid">
                <table className="details-table">
                    <tr>
                        <th>Materialname</th>
                        <th>Verknüpfte Kurse</th>
                        <th>Kategorie</th>
                        <th>Beschreibung</th>
                    </tr>
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
                    </tr>
                </table>
            </div>
            <div className="type-grid">
                <select
                    value={selectedErrorType}
                    onChange={(e) => setSelectedErrorType(e.target.value)}
                    className="type-input"
                >
                    <option value="">Fehlertyp</option>
                    <option value="type1">Typ 1</option>
                    <option value="type2">Typ 2</option>
                    <option value="type3">Typ 3</option>
                    <option value="type4">Typ 4</option>
                    <option value="type5">Typ 5</option>
                </select>
            </div>
            <table className="error-table">
                <thead>
                <tr>
                    <th>Fehlername</th>
                    <th>Fehlerkategorie</th>
                    <th>Fehlerbeschreibung</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td><Link to="/0111" className="material-link">Fehler 1</Link></td>
                    <td>Kategorie A</td>
                    <td>Beschreibung des Fehlers 1</td>
                </tr>
                <tr>
                    <td><Link to="/0111" className="material-link">Fehler 2</Link></td>
                    <td>Kategorie B</td>
                    <td>Beschreibung des Fehlers 2</td>
                </tr>
                <tr>
                    <td><Link to="/0111" className="material-link">Fehler 3</Link></td>
                    <td>Kategorie C</td>
                    <td>Beschreibung des Fehlers 3</td>
                </tr>
                <tr>
                    <td><Link to="/0111" className="material-link">Fehler 4</Link></td>
                    <td>Kategorie D</td>
                    <td>Beschreibung des Fehlers 4</td>
                </tr>
                <tr>
                    <td><Link to="/0111" className="material-link">Fehler 5</Link></td>
                    <td>Kategorie E</td>
                    <td>Beschreibung des Fehlers 5</td>
                </tr>
                </tbody>
            </table>
            <div className="button-group">
                <button className="back-button" onClick={handleBack}>zurück</button>
                <button className="edit-button" onClick={handleEditMaterials}>Materialien bearbeiten</button>
                <button className="report-button" onClick={handleReportError}>Fehler melden</button>
            </div>
        </div>
    );
};

export default ErrorOverview;
