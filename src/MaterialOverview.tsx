import {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import './MaterialOverview.css';
import type { Schema } from "../amplify/data/resource";
import { generateClient } from 'aws-amplify/data';

const client = generateClient<Schema>({
    authMode: 'apiKey',
});

const MaterialOverview = () => {
    type Course = Schema['Course']['type'];
    type Material = Schema['Material']['type'];
    const navigate = useNavigate();
    const [selectedCourse, setSelectedCourse] = useState('');
    const [selectedMaterial, setSelectedMaterial] = useState('');
    const [materialType, setMaterialType] = useState('');
    const [courses, setCourses] = useState<Course[]>([]);
    const [materials, setMaterials] = useState<Material[]>([]);

    const fetchCourses = async () => {
        const {data: courses, errors} = await client.models.Course.list();
        setCourses(courses);
    }
    const fetchMaterials = async () => {
        const {data: materials, errors} = await client.models.Material.list();
        setMaterials(materials);
    }
    useEffect(() => {
        fetchCourses();
        fetchMaterials();
    }, []);

    const handleBack = () => {
        navigate(-1);
    };

    const handleShow = () => {
        const routeState = {id: selectedMaterial};
        navigate('/0101', { state: routeState });
    }

    const renderBody = () => {
        return materials.map((material) => {
            return <tr key={material.materialName}>
                <td>{material.materialName}</td>
                <td>{material.courseID}</td>
                <td>{material.materialType}</td>
                <td>{material.materialDescription}</td>
            </tr>
        })
    }

    return (
        <div className="overview-container">
            <div className="filter-grid">
                <select
                    value={selectedCourse}
                    onChange={(e) => setSelectedCourse(e.target.value)}
                    className="filter-input"
                >
                    <option value="">Kurs auswählen</option>
                    {courses.map((course) => <option value={course.courseID}>{course.courseName}</option>)}
                </select>
                <select
                    value={materialType}
                    onChange={(e) => setMaterialType(e.target.value)}
                    className="filter-input"
                >
                    <option value="">Materialtyp</option>
                    <option value='script'>Script</option>
                    <option value='repetorium'>Repetorium</option>
                    <option value='probeklausur'>Probeklausur</option>
                    <option value='video'>Video</option>
                    <option value='scriptFragen'>Script Fragen</option>
                    <option value='kursFragen'>Kurs Fragen</option>
                    <option value='literaturHinweis'>Literatur Hinweis</option>
                </select>
                <select
                    value={selectedMaterial}
                    onChange={(e) => setSelectedMaterial(e.target.value)}
                    className="filter-input"
                >
                    <option value="">Material auswählen</option>
                    {materials.map((material) => <option value={material.materialID}>{material.materialName}</option>)}
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
                {renderBody()}
                </tbody>
            </table>
            <div className="button-group">
                <button className="back-button" onClick={handleBack}>zurück</button>
                <button className="back-button" onClick={handleShow}>anzeigen</button>
            </div>
        </div>
    );
};

export default MaterialOverview;
