
export function TableDataService(url : string) {
    
    try {
        const reponse = fetch(url);
        
        if(!reponse)
        {
            console.error("data failed to fetch");
            return;
        }
        
        
    }
    catch (error) {
        console.error("Error fetching data:", error);
    }
    
}