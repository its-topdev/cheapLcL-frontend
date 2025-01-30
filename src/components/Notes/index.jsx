import { NotificationIcon } from '../../constants/icons';
import "./style.scss";

export default function Notes() {
    return (
        <div className="notes">
            <NotificationIcon />
            <div className="notes-number">1</div>
        </div>
    );
}