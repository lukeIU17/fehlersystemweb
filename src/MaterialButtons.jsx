import './MaterialButtons.css';
import {useNavigate} from "react-router-dom";

const MaterialButtons = () => {
    const navigate = useNavigate();

    return (
        <div className="button-container">
            <button className="material-button" onClick={() => navigate('/0100')}>
                Material suchen
            </button>
            <button className="material-button" onClick={() => navigate('/0011')}>
                Material anlegen
            </button>
        </div>
    );
};

export default MaterialButtons;
