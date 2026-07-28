import endpoints from "../config/endpoints.json";
import {CodelistService} from "./CodelistService.ts";
import type {OptionList} from "../components/filter/Filter.tsx";

export async function RequestAllOptions(): Promise<OptionList> {
    
    let optionEndpoints = endpoints.endpoints.optionFilters;
    let yearFrom : (string)[] = [];
    let yearTo : (string)[] = [];

    //Fire all network requests simultaneously in parallel
    const [
        frequency,
        pollutant,
        unit,
        countries,
        interactors,
        accountingEntries
    ] = await Promise.all([
        CodelistService({url: optionEndpoints.frequency}),
        CodelistService({url: optionEndpoints.pollutant}),
        CodelistService({url: optionEndpoints.unit}),
        CodelistService({url: optionEndpoints.country}),
        CodelistService({url: optionEndpoints.interactor}),
        CodelistService({url: optionEndpoints.accountingEntry}),
    ]);
    
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