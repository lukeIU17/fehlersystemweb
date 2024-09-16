import { useState } from 'react';
import './ErrorReport.css';
import {useNavigate} from "react-router-dom";
import type { Schema } from "../amplify/data/resource";
import { generateClient } from 'aws-amplify/data';

const client = generateClient<Schema>({
    authMode: "apiKey",
});

const ErrorReport = () => {
    const navigate = useNavigate();
    const [courseNameLocal, setCourseNameLocal] = useState('');
    const [courseIDLocal, setCourseIDLocal] = useState('');

    function createCourse() {
        client.models.Course.create({
            courseID: courseIDLocal,
            courseName: courseNameLocal
        })
    }

    const handleBack = () => {
        navigate(-1);
    };

    const handleSave = () => {
        createCourse();
        navigate('/0111');
    }

    return (
        <div className="report-container">
            <div className="report-grid">
                <input
                    type="text"
                    value={courseIDLocal}
                    onChange={(e) => setCourseIDLocal(e.target.value)}
                    placeholder="Kurskürelz"
                    className="report-input"
                />
                <input
                    type="text"
                    value={courseNameLocal}
                    onChange={(e) => setCourseNameLocal(e.target.value)}
                    placeholder="Kursname"
                    className="report-input"
                />
            </div>
            <div className="button-group">
                <button className="back-button" onClick={handleBack}>zurück</button>
                <button className="report-button" onClick={handleSave}>speichern</button>
            </div>
        </div>
    );
};

export default ErrorReport;