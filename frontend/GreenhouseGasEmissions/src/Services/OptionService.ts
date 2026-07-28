import endpoints from "../config/endpoints.json";
import {CodelistService} from "./CodelistService.ts";
import type {OptionList} from "../components/filter/Filter.tsx";

export async function RequestAllOptions(): Promise<OptionList> {

    let frequency : { id: string; name: string }[] = [];
    let pollutant : { id: string; name: string }[] = [];
    let unit : { id: string; name: string }[] = [];
    let countries : { id: string; name: string }[] = [];
    let interactors : { id: string; name: string }[] = [];
    let accountingEntries : { id: string; name: string }[] = [];
    let yearFrom : (string)[] = [];
    let yearTo : (string)[] = [];
    
    let optionEndpoints = endpoints.endpoints.optionFilters;
    frequency = await CodelistService({url: optionEndpoints.frequency});
    pollutant = await CodelistService({url: optionEndpoints.pollutant});
    unit = await CodelistService({url: optionEndpoints.unit});
    countries = await CodelistService({url: optionEndpoints.country});
    interactors = await CodelistService({url: optionEndpoints.interactor});
    accountingEntries = await CodelistService({url: optionEndpoints.accountingEntry});
    
    //set year options
    yearFrom.push("all");
    yearTo.push("all");
    for(let i: number = 1950; i <= 2026; i++)
    {
        yearFrom.push(i.toString());
        yearTo.push(i.toString());
    }
    
    return {
        frequency: frequency,
        pollutant: pollutant,
        unit: unit,
        accountingEntries: accountingEntries,
        countries: countries,
        interactors: interactors,
        yearFrom: yearFrom,
        yearTo: yearTo,
    }
}