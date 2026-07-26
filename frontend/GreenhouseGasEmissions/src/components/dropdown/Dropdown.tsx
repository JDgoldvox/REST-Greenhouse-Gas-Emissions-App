import style from "./Dropdown.module.css"
import type {Option} from "../filter/Filter.tsx"
import type {FilterState} from "../filter/Filter.tsx"

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
    
    function ChangeState( isAdd: boolean, value: string, param: keyof FilterState)
    {
        if(isAdd)
        {
            AddToListCallback(value, param);
        }
        else
        {
            removeFromListCallback(value, param);
        }
    }
    
    if(items === undefined || items === null)
    {
        console.log("items is undefined");
        return <></>
    }

    return (
        <label> {label}
            <div className={style.DropdownWrapper}>
                <button onClick={() => setIsOpen(!isOpen)}>
                    Select {label}
                </button>
    
                {isOpen && (
                    <div className={style.DropdownMenu}> {
                        items.map((item,index) => (
                            <label key={`${item.id}-${index}`}>
                                <input type="checkbox" value={item.id} onChange={(e) => {
                                    console.log(e.target.checked);
                                    ChangeState(
                                        e.target.checked,
                                        item.id,
                                        param
                                    )
                                }}/>
                                {item.name}
                            </label> ))
                    }
                    </div>
                )}
            </div>
        </label>
    )
}

