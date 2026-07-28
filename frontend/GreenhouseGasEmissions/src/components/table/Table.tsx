import style from "./Table.module.css"
import generalStyle from "../../General.module.css"
import {useEffect, useState} from "react";
import {TableDataService} from "../../Services/TableDataService.ts";

interface TableProps{
    url : string | null;
}

export default function Table({url} : TableProps)
{
    const [tableHeader, setTableHeader] = useState<string[]>(["Year"]);
    const [tableRow, setTableRow] = useState<any[]>([]);
    
    useEffect(() =>
    {
        let earliestYear : number = -1;
        let latestYear : number = -1;
        
        //fetch data from url
        async function fetchData()
        {
            const result = await TableDataService(url);
            let countryData : Map<string, Map<number, any>> = new Map<string, Map<number, any>>();
            
            result?.forEach( (item) => {
                const key = item.REF_AREA;
                const year : number = Number(item.TIME_PERIOD);
                
                //check and set if earliest year so far
                if(earliestYear === -1 || year < earliestYear)
                {
                    earliestYear = year;
                }
                
                //check and set if latest year so far
                if(latestYear === -1 || year > latestYear)
                {
                    latestYear = year;
                }
                
                // Add country to map
                if (!countryData.has(key)) {
                    countryData.set(key, new Map<number, any>());
                }
                
                // Add year to country data
                countryData.get(key)?.set(year, [item]);
            })
            
            console.log(countryData);
            
            //get unique country names
            countryData.forEach((_ , key) =>{
                tableHeader.push(key);
            })
            
            //loop over each year that has data
            let tempRows : any[] = [];
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
                tempRows.push(row);
            }
            
            //set row data
            setTableRow(tempRows);
            console.log(tempRows);
        }

        fetchData();
        
        console.log("url changed");
    },[url])
    
    return (
        <table className = {style.table}>
            <caption>
                insert epic name
            </caption>
            <thead>
                <tr>
                    {
                        tableHeader.map((header, index) => (
                            <th key={index}>{header}</th>
                        ))
                    }
                </tr>
            </thead>
            <tbody>
            
                <tr>
                    <td>1999</td>
                    <td>112314</td>
                    <td>134531</td>
                </tr>
                <tr>
                    <td>2000</td>
                    <td>135135135</td>
                    <td>135135153</td>
                </tr>
                <tr>
                    <td>2001</td>
                    <td>135135</td>
                    <td>135315</td>
                </tr>
                <tr>
                    <td>2002</td>
                    <td>135531135</td>
                    <td>13513135</td>
                </tr>
            </tbody>
            {/*<tfoot>*/}
            {/*    <tr>*/}
            {/*        <td>Overall Total</td>*/}
            {/*        <td>---</td>*/}
            {/*        <td>---</td>*/}
            {/*    </tr>*/}
            {/*</tfoot>*/}
        </table>
    )
}