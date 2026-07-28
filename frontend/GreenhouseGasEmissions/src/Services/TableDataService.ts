import { SDMXParser } from "sdmx-json-parser";

export async function TableDataService(url : string | null) {
    
    if(url == null){
        console.log("url is null");
        return;
    }
    
    try {
        const betterUrl2 = "https://data.un.org/ws/rest/data/ESTAT,DF_SEEA_AEA,1.3/.AU+CA+NZ......GHG..../ALL/?detail=full&dimensionAtObservation=TIME_PERIOD"
        const rawData= await FetchTableData(betterUrl2);
        const rowData= await CleanRawData(rawData);
        return rowData;
    }
    catch (error) {
        console.error("Error fetching data:", error);
    }
}

async function FetchTableData(url : string)
{
    const parser = new SDMXParser();
    await parser.getDatasets(url);
    console.log(parser.getAnnotations());
    return parser.getData(); // returns a simplified array of observations with dimension and attributes values
}

async function CleanRawData(rawData: any[]) : Promise<any[]>
{
    let tableRows : any[] = [];
    let earliestYear : number = -1;
    let latestYear : number = -1;
    let countryData : Map<string, Map<number, any>> = new Map<string, Map<number, any>>();
    
    rawData?.forEach( (item) => {
        const key = item.REF_AREA;
        const year : number = Number(item.TIME_PERIOD);

        //check and set if earliest year so far
        if(earliestYear === -1 || year < earliestYear)  earliestYear = year;
        
        //check and set if latest year so far
        if(latestYear === -1 || year > latestYear) latestYear = year;

        // Add country to map
        if (!countryData.has(key)) {
            countryData.set(key, new Map<number, any>());
        }

        // Add year to country data
        countryData.get(key)?.set(year, [item]);
    })

    //console.log(countryData);

    //get unique country names, and set table headers
    {
        let tableHeader : string[] = ["Year"];
        countryData.forEach((_ , key) =>{
            tableHeader.push(key);
        })

        //add to row data as first item
        tableRows.push(tableHeader);
    }
    

    //loop over each year that has data
    for(let i: number = earliestYear; i <= latestYear; i++)
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
        let row: any[] = [];
        row.push(i);
        existingData.forEach((data) =>
        {
            row.push(data);
        })

        //add row to table rows
        tableRows.push(row);
    }

    //set row data
    console.log(tableRows);
    return tableRows;
}

