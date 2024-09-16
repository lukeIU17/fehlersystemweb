import {useEffect, useState} from 'react';
import './ErrorOverview.css';
import {useNavigate, useLocation} from "react-router-dom";
import type { Schema } from "../amplify/data/resource";
import { generateClient } from 'aws-amplify/data';

const client = generateClient<Schema>({
    authMode: 'apiKey',
});

const ErrorOverview = () => {
    type Material = Schema['Material']['type'];
    type Error = Schema['Error']['type'];
    type Addition = Schema['Addition']['type'];
    const navigate = useNavigate();
    const location = useLocation();
    const [materialID, setMaterialID] = useState('');
    const [materialname, setMaterialname] = useState('');
    const [linkedcourses, setLinkedcourses] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [selectedError, setSelectedError] = useState('');
    const [errors, setErrors] = useState<Error[]>([]);
    const [addition, setAddition] = useState<Addition[]>([]);
    const [material, setMaterial] = useState<Material>();

    const fetchErrors = async () => {
        const {data: ers, errors} = await client.models.Error.list({
            filter:{materialID:{eq: materialID}}
        });
        setErrors(ers);
    }
    const fetchAdditions = async (errorID) => {
        const {data: adds, errors} = await client.models.Addition.list({
            filter:{errorID: {eq: errorID}}
        })
        setAddition(adds);
    }
    const fetchMaterial = async () => {
        const {data: materials, errors} = await client.models.Material.list();
        setMaterialID(location.state.id);
        let material = materials.find( async (material) => material.materialID === materialID);
        setMaterial(material);
        setMaterialname(material.materialName);
        setLinkedcourses(material.courseID);
        setCategory(material.materialType);
        setDescription(material.materialDescription);
    }
    const deleteErrors = async () => {
        errors.map(async (error: Error) => {
            await fetchAdditions(error.errorID);
            deleteAdditions();
            await client.models.Error.delete({id: error.id});
        })
    }
    const deleteAdditions = async () => {
        addition.map(async (addition: Addition) => {
            await client.models.Addition.delete({id: addition.id});
        })
    }
    const deleteMaterial = async () => {
        await client.models.Material.delete({id: material.id});
    }
    useEffect(() => {
        fetchMaterial();
        fetchErrors();
    }, []);

    const handleBack = () => {
        navigate(-1);
    };

    const handleEditMaterials = () => {
        navigate('/0011');
    };

    const handleReportError = () => {
        const routeState = {id: materialID};
        navigate('/0110', { state: routeState });
    }

    const handleShowError = () => {
        const routeState = {id: selectedError};
        navigate('/0111', { state: routeState });
    }
    const handleDeleteMaterial = async () =>{
        await deleteErrors();
        await deleteMaterial();
        navigate('/0100');
    }
    const renderBody = () => {
        return errors.map((error) => {
            return <tr key={error.errorName}>
                <td>{error.errorName}</td>
                <td>{error.errorType}</td>
                <td>{error.description}</td>
            </tr>
        })
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
                    value={selectedError}
                    onChange={(e) => setSelectedError(e.target.value)}
                    className="type-input"
                >
                    <option value="">Fehler auswählen</option>
                    {errors.map((error) => <option value={error.errorID}>{error.errorName}</option>)}
                </select>
            </div>
            <table className="error-table">
                <thead>
                <tr>
                    <th onClick={fetchErrors}>Fehlername anklicken zum anzeigen</th>
                    <th>Fehlerkategorie</th>
                    <th>Fehlerbeschreibung</th>
                </tr>
                </thead>
                <tbody>
                {renderBody()}
                </tbody>
            </table>
            <div className="button-group">
                <button className="back-button" onClick={handleBack}>zurück</button>
                <button className="edit-button" onClick={handleEditMaterials}>Materialien bearbeiten</button>
                <button className="edit-button" onClick={handleDeleteMaterial}> Material löschen</button>
                <button className="report-button" onClick={handleShowError}>Fehler anzeigen</button>
                <button className="report-button" onClick={handleReportError}>Fehler melden</button>
            </div>
        </div>
    );
};

export default ErrorOverview;
