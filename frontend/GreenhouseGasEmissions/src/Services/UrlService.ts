import type {FilterState} from "../components/filter/Filter.tsx";

export function UrlService(state: FilterState)
{
    
    //.AU........../ALL/?detail=full&dimensionAtObservation=TIME_PERIOD
    
    let url : string | null = null;
    const baseUrl = "https://data.un.org/ws/rest/data/ESTAT,DF_SEEA_AEA,1.3/";

    // FREQ,
    // REF_AREA,
    // DEMAND_PROD,
    // ACCOUNTING_ENTRY,
    // COUNTERPART_AREA,
    // INTERACTORS,
    // BRIDGE_ITEMS,
    // AIRPOL,
    // STO,
    // UNIT_MEASURE,
    // PRODUCT,
    // SECTOR
    
    //defaults
    let freq = "";
    let refArea =  "AU";
    let demandProd = "" //not included
    let accountingEntry = "";
    let counterpartArea = ""; //not included
    let interactors = "";
    let bridgeItems = ""; //not included
    let airpol = "";
    let sto = ""; //not included
    let unitMeasure = "";
    let product = ""; //not included
    let sector = ""; //not included
    
    if(state.frequency !== null) freq = state.frequency;
    if(state.countries !== null) refArea = ConcatinateList(state.countries);
    if(state.pollutant !== null) demandProd = state.pollutant;
    if(state.accountingEntries !== null) accountingEntry = ConcatinateList(state.accountingEntries);
    if(state.interactors !== null) interactors = ConcatinateList(state.interactors);
    if(state.pollutant !== null) airpol = state.pollutant;
    if(state.unit !== null) unitMeasure = state.unit;

    let keys = freq + "." + refArea + "." + demandProd + "." +
        accountingEntry + "." + counterpartArea + "." + interactors + "." +
        bridgeItems + "." + airpol + "." + sto + "." +
        unitMeasure + "." + product + "." + sector;
    
    url = baseUrl + keys + "/all/";
    
    console.log(url);
    
    return url;
}

function ConcatinateList(list : string[])
{
    //return default if length is somehow 0
    if(list.length === 0) return ".";
    
    let keyString : string = "";
    list.map(item =>{
        keyString += item + "+"
    })
    
    //remove the last plus
    keyString = keyString.slice(0, keyString.length - 1);
    
    //console.log(keyString);
    
    return keyString;
}