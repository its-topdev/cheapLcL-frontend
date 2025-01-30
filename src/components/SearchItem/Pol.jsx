import Select from "react-select";
import { POL_OPTIONS } from "../../constants/ports";

import "./style.scss";
import { useEffect, useRef } from "react";

export default function Pol({ pol, onPolChange }) {
    const polRef = useRef();

    useEffect(()=>{
        polRef?.current?.focus();
    }, [polRef])

    return (
        <div className="searchbox-pol searchbox-content-block">
            <div className="searchbox-content-block-title">Which port are you shipping from?</div>
            <div className="searchbox-select">
                <Select
                    ref={polRef}
                    openMenuOnFocus={true}
                    value={pol}
                    classNamePrefix="cheap"
                    options={POL_OPTIONS}
                    placeholder="Search port name"
                    onChange={(e) => onPolChange(e)}
                    isClearable
                />
                <label className="searchbox-select-label">Port</label>
            </div>
        </div>
    );
}