import { useEffect, useRef } from "react";
import Select from "react-select";
import { DEFAULT_POD, POD_OPTIONS } from "../../constants/ports";
import "./style.scss";

export default function Pod({ pod, onPodChange }) {
    const podRef = useRef();

    useEffect(()=>{
        podRef?.current?.focus();
    }, [podRef])

    return (
        <div className="searchbox-pod searchbox-content-block">
            <div className="searchbox-content-block-title">Which port are you shipping to?</div>
            <div className="searchbox-select">

                <Select
                    ref={podRef}
                    openMenuOnFocus={true}
                    classNamePrefix="cheap"
                    value={pod}
                    options={POD_OPTIONS}
                    placeholder="Search port name"
                    onChange={(e) => onPodChange(e)}
                    isClearable
                    defaultValue={DEFAULT_POD}
                />
                <label className="searchbox-select-label">Port</label>
            </div>
        </div>
    );
}