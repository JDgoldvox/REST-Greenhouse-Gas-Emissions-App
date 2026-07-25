
export async function CodelistService({url} : {url: string}) {
    
    try {
        const response : Response = await fetch(url);
        
        if(!response.ok)
        {
            throw new Error(`Failed to fetch data for ${url}`);
        }
        
        const result = await response.text(); //xml raw text
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(result, "application/xml");

        const codeListParent : NodeListOf<Element> = xmlDoc.querySelectorAll("*|Codelist");
        const codeElements : NodeListOf<Element> = codeListParent[0].querySelectorAll("*|Code");
        
        const codes: { id: string; name: string }[] = [];
        
        codeElements.forEach(codeEl => {
            const id = codeEl.getAttribute("id") || ""; 
            const nameElement = codeEl.querySelector("*|Name");
            let name = nameElement?.textContent || "";

            //Trim everything after the ( character
            const parenthesisIndex = name.indexOf("(");
            if (parenthesisIndex !== -1) {
                name = name.substring(0, parenthesisIndex).trim();
            }
            
            codes.push({ id, name });
        });

        //console.log("Parsed Codes:", codes);
        return codes;
    }
    catch (error) {
        console.error("Error fetching data:", error);
        return []
    }
}