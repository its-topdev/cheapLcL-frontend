import { useState } from "react";
import { SortIcon } from "../../constants/icons";

import "./style.scss";

export default function Sort({allowedSort, sortBy, onSetSortBy, isSortingAsc, onSetIsSortingAsc}){
    const [ open, setOpen ] = useState(false);
    const menu = allowedSort.map((item) => {
        return (
            <li key={item.name} onClick={() => {onSetSortBy(item.name);setOpen(false);}} className={`menu-item ${item.name == sortBy ? 'active' : ''}`}>By {item.text}</li>
        )
    });
    
    const toggle = () => {
        setOpen(!open);
    }

    return (
        <div className="sort">
            <button className="sort-type" type="button" onClick={() => onSetIsSortingAsc(!isSortingAsc)}>{isSortingAsc ? <SortIcon className="asc" /> : <SortIcon /> }</button>
            <button className="sort-menu" type="button" onClick={toggle}>Sort</button>
            { open && <ul className="menu">
                {menu}
            </ul> }
        </div>
    );
}