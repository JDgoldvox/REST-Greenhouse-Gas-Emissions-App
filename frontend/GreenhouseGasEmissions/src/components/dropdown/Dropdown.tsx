import style from "./Dropdown.module.css"
import type {Option} from "../filter/Filter.tsx"
import type {FilterState} from "../filter/Filter.tsx"
import {useState} from "react";

interface DropdownProps {
    label: string;
    items: Option[] | undefined;
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    AddToListCallback: (item: string, state: keyof FilterState) => void;
    removeFromListCallback: (item: string, state: keyof FilterState) => void;
    param: keyof FilterState;
}        
        
export default function Dropdown({label , items , isOpen , setIsOpen, AddToListCallback, removeFromListCallback, param} : DropdownProps) {

    const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());
    
    function ChangeDropdownState(isChecked: boolean, value: string, param: keyof FilterState)
    {
        setCheckedItems(prev => {
            //local mutable set
            const previousItems = new Set(prev);
            
            if(isChecked)
            {
                previousItems.add(value);
                AddToListCallback(value, param);
            }
            else
            {
                previousItems.delete(value);
                removeFromListCallback(value, param);
            }
            
            return previousItems;
        })
    }
    
    if(items === undefined || items === null)
    {
        console.log("items is undefined");
        return <></>
    }

    const sortedItems = [...items].sort((a, b) =>
        (a.name).localeCompare(
            b.name, 
            "en-us",
            { numeric: true, sensitivity: 'base' })
    );
    
    return (
        <label> {label}
            <div className={style.DropdownWrapper}>
                <button onClick={() => setIsOpen(!isOpen)}>
                    Select {label}
                </button>
    
                {isOpen && (
                    <div className={style.DropdownMenu}> {
                        sortedItems.map((item,index) => (
                            <label key={`${item.id}-${index}`}>
                                <input
                                    type="checkbox" 
                                    value={item.id} 
                                    checked={checkedItems.has(item.id)}
                                    onChange={(e) => {
                                        ChangeDropdownState(
                                            e.target.checked,
                                            item.id,
                                            param
                                        )
                                    }}
                                />
                                {item.name}
                            </label> ))
                    }
                    </div>
                )}
            </div>
        </label>
    )
}

