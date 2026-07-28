import style from "./Filter.module.css"
import generalStyle from "../../General.module.css"
// @ts-ignore
import DropDown from "../dropdown/DropDown.tsx"
import {useEffect, useState} from "react"
import {UrlService} from "../../Services/UrlService.ts";
import {RequestAllOptions} from "../../Services/OptionService.ts";

interface FilterProps {
    setUrl : (url: string | null) => void;
}

export interface FilterState {
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

export interface OptionList
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

    // Options for the filter dropdowns
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
    
    // State tracking for filter selections
    const [filters, setFilters] = useState<FilterState>({
        frequency: null,
        pollutant: null,
        yearFrom: null, //include every possible date
        yearTo: null, //include every possible date
        unit: null, //leave as default from api
        countries: null,
        interactors: null,
        accountingEntries: null,
    })
    
    function HandleSingleFilter(value: string, param: keyof FilterState)
    {
        setFilters(prev => ({
            ...prev,
            [param]: value
        }));
    }
    
    function AddToMultipleFilters(value: string, param: keyof FilterState)
    {
        setFilters(prev => {
            //get current list, or null if not set
            const currentList = (prev[param] as string[]) || [];

            //add to existing items
            return {
                ...prev,
                [param]: [...currentList, value] 
            };
        });
    }

    function RemoveFromMultipleFilters(valueToRemove: string, param: keyof FilterState)
    {
        setFilters(prev => {
            //get current list, or null if not set
            const currentList = (prev[param] as string[]) || [];
            
            //remove 'value' from exiting items
            const updatedList = currentList.filter(item => item !== valueToRemove);
            
            //add to existing items
            return {
                ...prev,
                [param]: updatedList
            };
        });
    }

    // useEffect(() => {
    //     console.log("Filters changed:", filters);
    // }, [filters]);
    
    useEffect(()=> {
        async function FetchOptionList() : Promise<void>  {
            try {
                const optionList = await RequestAllOptions();
                setOptions(optionList);
            } catch (error) {
                console.error("Error fetching options:", error);
            }
        }
        
        //don't await, just let the options fetch in background
        void FetchOptionList();
    }, []);
    
    return(
        <div>
            <ul className = {style.filterList}>
                
                 {/*Reporting Frequency */}
                <li>
                    <label className={style.fontToWhite}> Reporting Frequency
                        <select
                            value={filters.frequency || "A"}
                            onChange={(e) => HandleSingleFilter(e.target.value, "frequency")}>
                            {MapDropDownOptionsForSelects(options.frequency)}
                        </select>
                    </label>
                </li>

                {/* Air pollutant */}
                <li>
                    <label className={style.fontToWhite}> Air pollutant
                        <select
                            value={filters.pollutant || "CO"}
                            onChange={(e) => HandleSingleFilter(e.target.value, "pollutant")}>
                            {MapDropDownOptionsForSelects(options.pollutant)}
                        </select>
                    </label>
                </li>

                {/* Country */}
                <li>
                    <DropDown label={"country"} 
                              items= {options.countries}
                              isOpen={isCountryOpen} 
                              setIsOpen={setIsCountryOpen}
                              AddToListCallback={AddToMultipleFilters}
                              removeFromListCallback={RemoveFromMultipleFilters}
                              param="countries"
                    />
                </li>

                {/* time line */}
                <li>
                    <div className = {generalStyle.flex}>
                        <label className={style.fontToWhite}> from
                            <select
                                value={filters.yearFrom || "all"}
                                onChange={(e) => HandleSingleFilter(e.target.value, "yearFrom")}>
                                {MapDropDownOptionsForSelects(options.yearFrom)}
                            </select>
                        </label>
                        <label className={style.fontToWhite}> to
                            <select
                                value={filters.yearTo || "all"}
                                onChange={(e) => HandleSingleFilter(e.target.value, "yearTo")}>
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
                              setIsOpen={setIsInteractorOpen}
                              AddToListCallback={AddToMultipleFilters}
                              removeFromListCallback={RemoveFromMultipleFilters}
                              param="interactors"
                    
                    />
                </li>

                {/* Unit of measurement */}
                <li>
                    <label className={style.fontToWhite}> Unit
                        <select className={style.selectBox} onChange={(e) => HandleSingleFilter(e.target.value, "unit")}>
                            {MapDropDownOptionsForSelects(options.unit)}
                        </select>
                    </label>
                </li>

                {/* Accounting Entry */}
                <li>
                    <DropDown label={"Accounting Entry"}
                              items={options.accountingEntries}
                              isOpen={isAccountingEntryOpen}
                              setIsOpen={setIsAccountingEntryOpen}
                              AddToListCallback={AddToMultipleFilters}
                              removeFromListCallback={RemoveFromMultipleFilters}
                              param="accountingEntries"
                    />
                </li>

                {/* Apply Filters button */}
                <li>
                    <button className={style.applyButton} onClick={() => {
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


