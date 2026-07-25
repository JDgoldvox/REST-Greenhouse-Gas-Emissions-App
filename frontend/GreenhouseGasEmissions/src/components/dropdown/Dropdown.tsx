import style from "./Dropdown.module.css"
import type {Option} from "../filter/Filter.tsx"

interface DropdownProps {
    label: string;
    items: Option[] | undefined;
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}        
        
export default function Dropdown({label , items , isOpen , setIsOpen} : DropdownProps) {
    
    if(items === undefined) return (
        <>
            {/*{*/}
            {/*     console.log("items is undefined");*/}
            {/*}*/}
        </>
    )
    
    return (
        <label> {label}
            <div className={style.DropdownWrapper}>
                <button onClick={() => setIsOpen(!isOpen)}>
                    Select {label}
                </button>

                {isOpen && (
                    <div className={style.DropdownMenu}>
                        {items.map((item,index) => (
                            <label key={`${item.id}-${index}`}>
                                <input type="checkbox"/>
                                {item.name}
                            </label>
                        ))
                        }
                    </div>
                )}
            </div>
        </label>
    )
}

// function MapDropdownItems({items} : {items: string[]}) {
//     items.map((item : string) => (
//         <label key={item}>
//             <input type="checkbox"/>
//             {item}
//         </label>
//     ))
// }