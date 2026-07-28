import { SDMXParser } from "sdmx-json-parser";

export async function TableDataService(url : string | null) {
    
    if(url == null){
        console.log("url is null");
        return;
    }
    
    try {
        const betterUrl2 = "https://data.un.org/ws/rest/data/ESTAT,DF_SEEA_AEA,1.3/.AU+CA+NZ......GHG..../ALL/?detail=full&dimensionAtObservation=TIME_PERIOD"
        const parser = new SDMXParser(); 
        await parser.getDatasets(betterUrl2);
        console.log(parser.getAnnotations());
        
        const data = parser.getData(); // returns a simplified array of observations with dimension and attributes values
        console.log(data);
        return data;
    }
    catch (error) {
        console.error("Error fetching data:", error);
    }
    
}

