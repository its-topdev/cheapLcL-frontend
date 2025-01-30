import { useContext } from 'react';
import {useLocation , useNavigate} from 'react-router-dom';
import { BookRequestPrefix } from '../../../constants/general';
import WindowSizeContext from '../../../contexts/WindowSizeContext';
import HeaderInner from '../../HeaderInner';

import "./style.scss";

export default function BookConfirmation(){
    const location = useLocation();
    const navigate = useNavigate();
    const bookNumber = location.state && location.state.bookNumber;
    const { windowHeight } = useContext(WindowSizeContext);
    const hasScroll = windowHeight < 500 ? true : false;

    return (
        <div className={`book-confirmation ${hasScroll ? 'has-scroll' : 'no-scroll'}`}>
            <div className="book-confirmation-background display-mobile-720"></div>
            <div className="book-confirmation-wrapper">
                <HeaderInner />
                {   bookNumber &&  
                    <>
                        <div className="book-confirmation-content">
                            <h1 className="book-confirmation-title">Completed!</h1>
                            <h2 className="book-confirmation-second-title">The order was successfully placed!</h2>
                            <p className="book-confirmation-text">Your booking number {BookRequestPrefix}-{bookNumber}</p>
                        </div>
                        <div className="book-confirmation-button-search display-desktop-720">
                            <button onClick={() => {navigate('/');}} className="button-blue-1" type="button">NEW SEARCH</button>
                        </div>
                    </>
                }
            </div>
            <div className="book-confirmation-button-search display-mobile-720">
                <button onClick={() => {navigate('/');}} className="button-blue-1" type="button">NEW SEARCH</button>
            </div>
      </div>
    );
}