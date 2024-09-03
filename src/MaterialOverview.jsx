import { useState } from 'react';
import { Link } from 'react-router-dom';
import {useNavigate} from "react-router-dom";
import './MaterialOverview.css';

const MaterialOverview = () => {
    const navigate = useNavigate();
    const [selectedCourse, setSelectedCourse] = useState('');
    const [materialType, setMaterialType] = useState('');

    const handleBack = () => {
        navigate(-1);
    };

    return (
        <div className="overview-container">
            <div className="filter-grid">
                <select
                    value={selectedCourse}
                    onChange={(e) => setSelectedCourse(e.target.value)}
                    className="filter-input"
                >
                    <option value="">Kurs auswählen</option>
                    <option value="course1">Kurs 1</option>
                    <option value="course2">Kurs 2</option>
                    <option value="course2">Kurs 3</option>
                    <option value="course2">Kurs 4</option>
                    <option value="course2">Kurs 5</option>
                </select>
                <select
                    value={materialType}
                    onChange={(e) => setMaterialType(e.target.value)}
                    className="filter-input"
                >
                    <option value="">Materialtyp</option>
                    <option value="type1">Typ 1</option>
                    <option value="type2">Typ 2</option>
                    <option value="type2">Typ 3</option>
                    <option value="type2">Typ 4</option>
                    <option value="type2">Typ 5</option>
                </select>
            </div>
            <table className="material-table">
                <thead>
                <tr>
                    <th>Materialname</th>
                    <th>Verknüpfte Kurse</th>
                    <th>Kategorie</th>
                    <th>Beschreibung</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td><Link to="/0101" className="material-link">Beispielmaterial 1</Link></td>
                    <td>Kurs 1</td>
                    <td>Kategorie A</td>
                    <td>Beschreibung 1</td>
                </tr>
                <tr>
                    <td><Link to="/0101" className="material-link">Beispielmaterial 2</Link></td>
                    <td>Kurs 2</td>
                    <td>Kategorie B</td>
                    <td>Beschreibung 2</td>
                </tr>
                <tr>
                    <td><Link to="/0101" className="material-link">Beispielmaterial 3</Link></td>
                    <td>Kurs 3</td>
                    <td>Kategorie C</td>
                    <td>Beschreibung 3</td>
                </tr>
                <tr>
                    <td><Link to="/0101" className="material-link">Beispielmaterial 4</Link></td>
                    <td>Kurs 4</td>
                    <td>Kategorie D</td>
                    <td>Beschreibung 4</td>
                </tr>
                <tr>
                    <td><Link to="/0101" className="material-link">Beispielmaterial 5</Link></td>
                    <td>Kurs 5</td>
                    <td>Kategorie E</td>
                    <td>Beschreibung 5</td>
                </tr>
                </tbody>
            </table>
            <button className="back-button" onClick={handleBack}>zurück</button>
        </div>
    );
};

export default MaterialOverview;
