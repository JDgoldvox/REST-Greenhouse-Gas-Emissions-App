import style from "./Dropdown.module.css"

interface DropdownProps {
    label: string;
    items: string[];
    isOpen: boolean;
    setIsOpen: (isCountryOpen: boolean) => void;
}        
        
export default function Dropdown({label , items , isOpen , setIsOpen} : DropdownProps) {
    return (
        <label> {label}
            <div className={style.DropdownWrapper}>
                <button onClick={() => setIsOpen(!isOpen)}>
                    Select Country
                </button>

                {isOpen && (
                    <div className={style.DropdownMenu}>
                        {items.map((item : string) => (
                            <label key={item}>
                                <input type="checkbox"/>
                                {item}
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