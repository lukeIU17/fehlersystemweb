import { useState } from 'react';
import {useNavigate} from "react-router-dom";
import './MaterialCreate.css';

const MaterialCreate = () => {
    const navigate = useNavigate();
    const [materialName, setMaterialName] = useState('');
    const [linkedCourse, setLinkedCourse] = useState('');
    const [category, setCategory] = useState('');
    const [fachlicheID, setFachlicheID] = useState('');
    const [description, setDescription] = useState('');

    const handleBack = () => {
        navigate(-1);
    };

    const handleCreate = () => {
        alert("Material gespeichert!");
        navigate('/0100');
    };

    return (
        <div className="tutor-form-container">
            <div className="form-grid">
                <input
                    type="text"
                    placeholder="Materialname"
                    value={materialName}
                    onChange={(e) => setMaterialName(e.target.value)}
                    className="form-input"
                />
                <select
                    value={linkedCourse}
                    onChange={(e) => setLinkedCourse(e.target.value)}
                    className="form-input"
                >
                    <option value="">Verknüpfter Kurs</option>
                    <option value="course1">Kurs 1</option>
                    <option value="course2">Kurs 2</option>
                </select>
                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="form-input"
                >
                    <option value="">Kategorie</option>
                    <option value="category1">Kategorie 1</option>
                    <option value="category2">Kategorie 2</option>
                </select>
                <input
                    type="text"
                    placeholder="Fachliche ID"
                    value={fachlicheID}
                    onChange={(e) => setFachlicheID(e.target.value)}
                    className="form-input"
                />
            </div>
            <textarea
                placeholder="Beschreibung ..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="form-textarea"
            />
            <div className="form-buttons">
                <button className="back-button" onClick={handleBack} >zurück</button>
                <button className="create-button" onClick={handleCreate} >speichern</button>
            </div>
        </div>
    );
};

export default MaterialCreate;
