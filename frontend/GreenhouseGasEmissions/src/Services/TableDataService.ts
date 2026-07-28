import { SDMXParser } from "sdmx-json-parser";

export async function TableCaptionService(url : string | null): Promise<string | undefined>
{
    if(url == null){
        console.log("url is null");
        return "apply filters to see data";
    }

    try {
        const rawData= await FetchTableData(url);
        let caption: string = "";
        if(rawData[0] != null)
        {
            caption = "Pollution Accounts (" +
                rawData[0].FREQ + " through " + rawData[0].DEMAND_PROD +
                " with " + rawData[0].ACCOUNTING_ENTRY + " accounting entry)";
        }

        return caption;
    }
    catch (error) {
        console.error("Error fetching data:", error);
    }
}

export async function TableDataService(url : string | null): Promise<any[] | undefined> 
{
    if(url == null){
        console.log("url is null");
        return;
    }
    
    try {
        const rawData= await FetchTableData(url);
        return await RawDataToRowData(rawData);
    }
    catch (error) {
        console.error("Error fetching data:", error);
    }
}

async function FetchTableData(url : string) : Promise<any[]>
{
    const parser = new SDMXParser();
    await parser.getDatasets(url);
    return parser.getData(); // returns a simplified array of observations with dimension and attributes values
}

async function RawDataToRowData(rawData: any[]) : Promise<any[]>
{
    let tableRows : any[] = [];
    let earliestYear : number = Infinity;
    let latestYear : number = -Infinity;
    let countryData : Map<string, Map<number, any>> = new Map<string, Map<number, any>>();
    
    rawData?.forEach( (item) => {
        const key = item.REF_AREA;
        const year : number = Number(item.TIME_PERIOD);

        //check and set if earliest year and latest so far
        if(year < earliestYear)  earliestYear = year;
        if(year > latestYear) latestYear = year;

        // Add country to map
        if (!countryData.has(key)) {
            countryData.set(key, new Map<number, any>());
        }

        // Add year to country data
        countryData.get(key)?.set(year, [item]);
    })
    
    SetTableHeaders(countryData, tableRows);
    SetRowData(countryData, tableRows, earliestYear, latestYear);
    
    return tableRows;
}

function SetTableHeaders(countryData : Map<string, Map<number, any>>, tableRows : any[])
{
    let tableHeader : string[] = ["Year"];
    countryData.forEach((_ , key) =>{
        tableHeader.push(key);
    })

    //add to row data as first item
    tableRows.push(tableHeader);
}

function SetRowData(countryData : Map<string, Map<number, any>>, tableRows : any[], earliestYear: number, latestYear: number)
{
    //loop over each year that has data
    for (let i: number = earliestYear; i <= latestYear; i++)
    {
        let existingData : string[] = [];

        //find which country data exists for this year
        countryData.forEach((dataMap) =>
        {
            //search whether year exists
            const newData = dataMap.get(i);
            if(newData != undefined) {
                existingData.push(newData[0].value);
            }
            else
            {
                existingData.push("-");
            }
        })

        //if any data exists for this year, add it to the table rows
        const row = [i, ...existingData];
        tableRows.push(row);
    }
}
