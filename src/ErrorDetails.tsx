import {useEffect, useState} from 'react';
import './ErrorDetails.css';
import {useLocation, useNavigate} from "react-router-dom";
import type { Schema } from "../amplify/data/resource";
import { generateClient } from 'aws-amplify/data';

const client = generateClient<Schema>({
    authMode: 'apiKey',
});

const ErrorDetails = () => {
    type Addition = Schema['Addition']['type'];
    type Error = Schema['Error']['type'];
    const navigate = useNavigate();
    const location = useLocation();
    const [fehlerID, setFehlerID] = useState('');
    const [errorName, setErrorName] = useState('');
    const [materialID, setMaterialID] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [errorStatus, setErrorStatus] = useState('');
    const [errorhistory, setErrorhistory] = useState<Addition[]>([]);
    const [additions, setAdditions] = useState<Addition[]>([]);
    const [beschreibung, setBeschreibung] = useState('');
    const [error, setError] = useState<Error>();

    const fetchError = async () => {
        const {data: ers, errors} = await client.models.Error.list();
        setFehlerID(location.state.id);
        let error = ers.find( async (error) => error.errorID === fehlerID);
        setErrorName(error.errorName);
        setMaterialID(error.materialID);
        setCategory(error.errorType);
        setDescription(error.description);
        setErrorStatus(error.status);
        setError(error);
    }
    const fetchAdditions = async () => {
        const {data: adds, errors} = await client.models.Addition.list({
            filter: {
                and:[
                    {addtionType: {eq: 'Ergaenzung'}},
                    {errorID: {eq: fehlerID}},
                ]
            }
        });
        setAdditions(adds);
    }
    const fetchHistory = async () => {
        const {data: adds, errors} = await client.models.Addition.list({
            filter: {
                and:[
                    {addtionType: {eq: 'History'}},
                    {errorID: {eq: fehlerID}},
                ]
            }
        });
        setErrorhistory(adds);
    }
    useEffect(() => {
        fetchError();
        fetchAdditions();
        fetchHistory();
    }, []);

    const handleBack = () => {
        navigate(-1);
    };

    const handleEdit = () => {
        navigate('/0110')
    }

    const handleComment = () => {
        client.models.Addition.create({
            description: beschreibung,
            addtionType: 'Ergaenzung',
            errorID: fehlerID,
        })
    }

    const handleDelete = () => {
        if(confirm("Sind Sie sicher, dass sie den Fehler löschen wollen?")) {
            alert("Fehler gelöscht!");
            navigate('/0100');
        } else {
            alert("Löschen abgebrochen!");
        }
    };

    const renderHistoryBody = () => {
        return errorhistory.map((addition) => {
            return <tr key={addition.description}>
                <td>{addition.description}</td>
            </tr>
        })
    }
    const renderAdditonBody = () => {
        return additions.map((addition) => {
            return <tr key={addition.description}>
                <td>{addition.description}</td>
            </tr>
        })
    }

    return (
        <div className="detail-container">
            <div className="detail-grid">
                <table className="material-details">
                    <thead>
                    <tr>
                        <th>Fehlername</th>
                        <th>Material ID</th>
                        <th>Kategorie</th>
                        <th>Beschreibung</th>
                        <th>Fehlerstatus</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>{errorName}</td>
                        <td>{materialID}</td>
                        <td>{category}</td>
                        <td>{description}</td>
                        <td>{errorStatus}</td>
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
                    {renderHistoryBody()}
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
                    {renderAdditonBody()}
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
                <button className="edit-button" onClick={handleComment}>Kommentieren</button>
                <button className="report-button" onClick={handleDelete}>Fehler löschen</button>
            </div>
        </div>
    );
};

export default ErrorDetails;
