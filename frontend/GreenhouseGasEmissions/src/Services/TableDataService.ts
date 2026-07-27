
export async function TableDataService(url : string | null) {
    
    if(url == null){
        console.log("url is null");
        return;
    }
    
    try {
        const reponse = await fetch(url, {
            method: "GET",
            headers: {
                Accept: "application/vnd.sdmx.data+json"
            }
        });
        
        if(!reponse)
        {
            console.error("data failed to fetch");
            return;
        }
        
        const data = await reponse.json();
        
        const sortedData = data.dataSets[0].series[0].observations.sort((a, b) => a.time - b.time);
        
        console.log(data);
        
    }
    catch (error) {
        console.error("Error fetching data:", error);
    }
    
}