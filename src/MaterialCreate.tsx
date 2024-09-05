import {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import './MaterialCreate.css';
import type { Schema } from "../amplify/data/resource";
import { generateClient } from 'aws-amplify/data';

const client = generateClient<Schema>({
    authMode: 'apiKey',
});



const MaterialCreate = () => {
    type Course = Schema['Course']['type'];
    const navigate = useNavigate();
    const [materialName, setMaterialName] = useState('');
    const [linkedCourse, setLinkedCourse] = useState('');
    const [category, setCategory] = useState('');
    const [fachlicheID, setFachlicheID] = useState('');
    const [description, setDescription] = useState('');
    const [courses, setCourses] = useState<Course[]>([]);

    const fetchCourses = async () => {
        const {data: courses, errors} = await client.models.Course.list();
        setCourses(courses);
    }

    const handleBack = () => {
        navigate(-1);
    };

    const handleCreate = () => {
        handleCreateCourse();
        navigate('/0100');
    };

    useEffect(() => {
        fetchCourses();
    }, []);

    function handleCreateCourse() {
        client.models.Material.create({
            materialID: fachlicheID,
            materialName: materialName,
            materialType: category,
            materialDescription: description,
            courseID: linkedCourse
        })
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
                    {courses.map((course)=><option value={course.courseID}>{course.courseName}</option>)}
                </select>
                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="form-input"
                >
                    <option value="">Kategorie</option>
                    <option value='script'>Script</option>
                    <option value='repetorium'>Repetorium</option>
                    <option value='probeklausur'>Probeklausur</option>
                    <option value='video'>Video</option>
                    <option value='scriptFragen'>Script Fragen</option>
                    <option value='kursFragen'>Kurs Fragen</option>
                    <option value='literaturHinweis'>Literatur Hinweis</option>
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
