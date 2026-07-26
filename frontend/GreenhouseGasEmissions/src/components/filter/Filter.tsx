import style from "./Filter.module.css"
import generalStyle from "../../General.module.css"
// @ts-ignore
import DropDown from "../dropdown/DropDown.tsx"
import {useEffect, useState} from "react"
import {CodelistService} from "../../Services/CodelistService.ts";
import {UrlService} from "../../Services/UrlService.ts";

interface FilterProps {
    setUrl : (url: string | null) => void;
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

export interface Option{
    id: string;
    name: string
}

interface OptionList
{
    frequency: Option[];
     pollutant: Option[];
     yearFrom: (Option | string)[];
     yearTo: (Option | string)[];
     unit: Option[];
     countries: Option[];
     interactors: Option[];
     accountingEntries: Option[];
}

export default function Filter({setUrl}: FilterProps)
{
    const [isCountryOpen, setIsCountryOpen] = useState(false)
    const [isInteractorOpen, setIsInteractorOpen] = useState(false)
    const [isAccountingEntryOpen, setIsAccountingEntryOpen] = useState(false)

    //Options
    const [options, setOptions] = useState<OptionList>(
        {
            frequency: [],
            pollutant: [],
            yearFrom: [],
            yearTo: [],
            unit: [],
            countries: [],
            interactors: [],
            accountingEntries: [],
        }
    )

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
    
    function HandleSingleFilter(e : React.ChangeEvent<HTMLSelectElement>, param: keyof FilterState)
    {
        setFilters(prev => ({
            ...prev,
            [param]: e.target.value
        }));
        
        console.log(`Adding : ${e.target.value}`);
    }

    useEffect(() => {
        console.log("Filters changed:", filters);
    }, [filters]);
    
    useEffect(()=> {
        let frequency : { id: string; name: string }[] = [];
        let pollutant : { id: string; name: string }[] = [];
        let unit : { id: string; name: string }[] = [];
        let countries : { id: string; name: string }[] = [];
        let interactors : { id: string; name: string }[] = [];
        let accountingEntries : { id: string; name: string }[] = [];
        
        async function RequestAllOptions() {
            frequency = await CodelistService({url: "https://data.un.org/WS/rest/codelist/SDMX/CL_FREQ"});
            pollutant = await CodelistService({url: "https://data.un.org/WS/rest/codelist/ESTAT/CL_AIRPOL"});
            unit = await CodelistService({url: "https://data.un.org/WS/rest/codelist/IMF/CL_UNIT"});
            countries = await CodelistService({url: "https://data.un.org/WS/rest/codelist/IMF/CL_AREA"});
            interactors = await CodelistService({url: "https://data.un.org/WS/rest/codelist/ESTAT/CL_INTERACTORS"});
            accountingEntries = await CodelistService({url: "https://data.un.org/WS/rest/codelist/IMF/CL_ACCOUNT_ENTRY"});
            
            setOptions( () => {
                return {
                    frequency: frequency,
                    pollutant: pollutant,
                    unit: unit,
                    accountingEntries: accountingEntries,
                    countries: countries,
                    interactors: interactors,
                    yearFrom: ["2012", "2014"],
                    yearTo: ["2012", "2014"], 
                }
            });
        }
        RequestAllOptions();
    }, []);
    
    return(
        <div>
            <ul className = {style.filterList}>
                
                 {/*Reporting Frequency */}
                <li>
                    <label> Reporting Frequency
                        <select onChange={(e) => HandleSingleFilter(e, "frequency")}>
                            {MapDropDownOptionsForSelects(options.frequency)}
                        </select>
                    </label>
                </li>

                {/* Air pollutant */}
                <li>
                    <label> Air pollutant
                        <select onChange={(e) => HandleSingleFilter(e, "pollutant")}>
                            {MapDropDownOptionsForSelects(options.pollutant)}
                        </select>
                    </label>
                </li>

                {/* Country */}
                <li>
                    <DropDown label={"country"} 
                              items= {options.countries}
                              isOpen={isCountryOpen} 
                              setIsOpen={setIsCountryOpen}/>
                </li>

                {/* time line */}
                <li>
                    <div className = {generalStyle.flex}>
                        <label> from
                            <select onChange={(e) => HandleSingleFilter(e, "yearFrom")}>
                                {MapDropDownOptionsForSelects(options.yearFrom)}
                            </select>
                        </label>
                        <label> to
                            <select onChange={(e) => HandleSingleFilter(e, "yearTo")}>
                                {MapDropDownOptionsForSelects(options.yearTo)}
                            </select>
                        </label>
                    </div>
                </li>

                {/* Interactor */}
                <li>
                    <DropDown label={"Interactor"} 
                              items={options.interactors}
                              isOpen={isInteractorOpen} 
                              setIsOpen={setIsInteractorOpen}/>
                </li>

                {/* Unit of measurement */}
                <li>
                    <label> Unit
                        <select onChange={(e) => HandleSingleFilter(e, "unit")}>
                            {MapDropDownOptionsForSelects(options.unit)}
                        </select>
                    </label>
                </li>

                {/* Accounting Entry */}
                <li>
                    <DropDown label={"Accounting Entry"}
                              items={options.accountingEntries}
                              isOpen={isAccountingEntryOpen}
                              setIsOpen={setIsAccountingEntryOpen}/>
                </li>

                {/* Apply Filters button */}
                <li>
                    <button onClick={() => {
                        const url : string | null = UrlService(filters);
                        setUrl(url);
                    }}> Apply Filters </button>
                </li>
            </ul>
        </div>
    )
}

function MapDropDownOptionsForSelects(list : (Option | String)[] | null | undefined) {
    if(list === undefined || list === null) return (<> </>);

    return list?.map((item, index) => {

        let key : string = "";
        let value : string = "";
        let id : string = "";

        if(typeof item === 'string')
        {
            key = `${item}-${index}`;
            value = item;
            id = item;
        }
        else
        {
            if ("id" in item) { // enclose in conditions to stop warnings
                key = `${item.id}-${index}`;
            }
            if ("name" in item) {
                value = item.name;
            }
            if ("id" in item) {
                id = item.id;
            }
        }

        return (
            <option key={key} value={id}>{value}</option>
        )}
    );
}


