import { SDMXParser } from "sdmx-json-parser";

export async function TableDataService(url : string | null) {
    
    if(url == null){
        console.log("url is null");
        return;
    }
    
    try {
        // const reponse = await fetch(url, {
        //     method: "GET",
        //     headers: {
        //         Accept: "application/vnd.sdmx.data+json"
        //     }
        // });
        //
        // if(!reponse)
        // {
        //     console.error("data failed to fetch");
        //     return;
        // }
        //
        // const data = await reponse.json();


        
        const betterUrl2 = "https://data.un.org/ws/rest/data/ESTAT,DF_SEEA_AEA,1.3/.AU+CA......GHG..../ALL/?detail=full&dimensionAtObservation=TIME_PERIOD"
        //const betterUrl = "https://data.un.org/ws/rest/data/ESTAT,DF_SEEA_AEA,1.3/A.AU......GHG..../all/?dimensionAtObservation=AllDimensions"
        //const sdmxDataUrl = "https://stats-nsi-stable.pacificdata.org/rest/data/SPC,DF_IMTS,4.0/M..AMT.TB+X+M.IV+I+II+III._T._T.USD?startPeriod=2015-01&dimensionAtObservation=AllDimensions";
        const parser = new SDMXParser(); 
        await parser.getDatasets(betterUrl2);
        // const name = parser.getName();
        // const description = parser.getDescription();
        // const dimensions = parser.getDimensions();
        // const activeDimensions = parser.getActiveDimensions();
        // const annotations = parser.getAnnotations();
        const observations = parser.getObservations();
        
        const data = parser.getData(); // returns a simplified array of observations with dimension and attributes values
        //const slicedData = parser.getData({GEO_PICT: ['NR']}); // slice by dimension Id (GEO_PICT) values (['NR'])
        
        
        
        //console.log(data);
        
        return data;
    }
    catch (error) {
        console.error("Error fetching data:", error);
    }
    
}

