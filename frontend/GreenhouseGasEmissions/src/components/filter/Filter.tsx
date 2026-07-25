import style from "./Filter.module.css"
import generalStyle from "../../General.module.css"
import DropDown from "../dropdown/DropDown.tsx"
import {useEffect, useState} from "react"
import {CodelistService} from "../../Services/CodelistService.ts";

interface FilterProps {
    setUrl : (url: string) => void;
}

interface FilterState {
    frequency: string | null;
    pollutant: string | null;
    yearFrom: string | null;
    yearTo: string | null;
    unit: string | null;
    countries: string[] | null;
    interactors: string[] | null;
    accountingEntries: string[] | null;
}

export default function Filter({setUrl}: FilterProps)
{
    const [isCountryOpen, setIsCountryOpen] = useState(false)
    const [isInteractorOpen, setIsInteractorOpen] = useState(false)
    const [isAccountingEntryOpen, setIsAccountingEntryOpen] = useState(false)

    const countries: string[] = ["Australia" , "Antartica"]
    const interactors: string[] = ["logging" , "fishing"]
    const accountingEntries: string[] = ["entry A" , "entry b"]

    const [filters, setFilters] = useState<FilterState>({
        frequency: null,
        pollutant: null,
        yearFrom: null,
        yearTo: null,
        unit: null,
        countries: null,
        interactors: null,
        accountingEntries: null,
    })
    
    useEffect(()=> {
        async function LoadFrequencies() {
            const codes = await CodelistService({url: "https://data.un.org/WS/rest/codelist/ESTAT/CL_AIRPOL"});
        }

        LoadFrequencies();
        
    }, []);
    
    return(
        <div>
            <ul className = {style.filterList}>
                
                 {/*Reporting Frequency */}
                <li>
                    <label> Reporting Frequency
                        <select onChange={(e) => console.log(e.target.value)}>
                            <option value="someOption">Some option</option>
                            <option value="otherOption">Other option</option>
                            <option value="someOption">Some option</option>
                        </select>
                    </label>
                </li>

                {/* Air pollutant */}
                <li>
                    <label> Air pollutant
                        <select onChange={(e) => console.log(e.target.value)}>
                            <option value="someOption">Some option</option>
                            <option value="otherOption">Other option</option>
                        </select>
                    </label>
                </li>

                {/* Country */}
                <li>
                    <DropDown label={"country"} 
                              items={countries} 
                              isOpen={isCountryOpen} 
                              setIsOpen={setIsCountryOpen}/>
                </li>

                {/* time line */}
                <li>
                    <div className = {generalStyle.flex}>
                        <label> from
                            <select onChange={(e) => console.log(e.target.value)}>
                                <option value="2010">2010</option>
                                <option value="2011">2011</option>
                                <option value="2012">2012</option>
                            </select>
                        </label>
                        <label> to
                            <select onChange={(e) => console.log(e.target.value)}>
                                <option value="2010">2011</option>
                                <option value="2011">2012</option>
                                <option value="2012">2013</option>
                            </select>
                        </label>
                    </div>
                </li>

                {/* Interactor */}
                <li>
                    <DropDown label={"Interactor"} 
                              items={interactors} 
                              isOpen={isInteractorOpen} 
                              setIsOpen={setIsInteractorOpen}/>
                </li>

                {/* Unit of measurement */}
                <li>
                    <label> Unit
                        <select onChange={(e) => console.log(e.target.value)}>
                            <option value="someOption">Tons</option>
                            <option value="otherOption">Omg</option>
                        </select>
                    </label>
                </li>

                {/* Accounting Entry */}
                <li>
                    <DropDown label={"Accounting Entry"}
                              items={accountingEntries}
                              isOpen={isAccountingEntryOpen}
                              setIsOpen={setIsAccountingEntryOpen}/>
                </li>

                {/* Apply Filters button */}
                <li>
                    <button> Apply Filters </button>
                </li>
            </ul>
        </div>
    )
}
