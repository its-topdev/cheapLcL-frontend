import { CloseIcon } from "../../constants/icons";
import "./style.scss";

export default function CloseModal({onClose}) {
    return (
        <button onClick={onClose} className="close-modal"><CloseIcon /></button>
    );
}