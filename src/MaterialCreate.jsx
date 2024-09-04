import {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import './MaterialCreate.css';
import { generateClient } from 'aws-amplify/data';

/**
 * @type {import('aws-amplify/data').Client<import('../amplify/data/resource').Schema>}
 */
const client = generateClient({
    authMode: 'apiKey',
});

const fetchCourses = async () => {
    const {data: courses} = await client.models.Course.list();
    return courses;
}

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

    let dropdownCourseData = fetchCourses();
    const [dropdownCourse, setDropdownCourse] = useState([]);
    useEffect(() => {
        loadData();
    }, []);

    function loadData(){
        setDropdownCourse(dropdownCourseData);
    }


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
                    {/* eslint-disable-next-line react/jsx-key */}
                    {dropdownCourse.map((item)=><option value="">{item}</option>)}
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
