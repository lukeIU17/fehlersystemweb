import {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import './ErrorOverview.css';
import {useNavigate, useLocation} from "react-router-dom";
import type { Schema } from "../amplify/data/resource";
import { generateClient } from 'aws-amplify/data';

const client = generateClient<Schema>({
    authMode: 'apiKey',
});

const ErrorOverview = () => {
    type Material = Schema['Material']['type'];
    const navigate = useNavigate();
    const location = useLocation();
    const [materialID, setMaterialID] = useState('');
    const [materialname, setMaterialname] = useState('');
    const [linkedcourses, setLinkedcourses] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [selectedErrorType, setSelectedErrorType] = useState('');

    const fetchMaterial = async () => {
        setMaterialID(location.state.id);
        const {data: materials, errors} = await client.models.Material.list();
        let material = materials.find((material) => material.materialID === materialID);
        setMaterialname(material.materialName);
        setLinkedcourses(material.courseID);
        setCategory(material.materialType);
        setDescription(material.materialDescription);
    }
    useEffect(() => {
        fetchMaterial();
    }, []);

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
                        <td>{materialname}</td>
                        <td>{linkedcourses}</td>
                        <td>{category}</td>
                        <td>{description}</td>
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
