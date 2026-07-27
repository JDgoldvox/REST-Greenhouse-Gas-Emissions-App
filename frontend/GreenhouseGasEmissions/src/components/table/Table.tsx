import style from "./Table.module.css"
import generalStyle from "../../General.module.css"
import {useEffect, useState} from "react";
import {TableDataService} from "../../Services/TableDataService.ts";

interface TableProps{
    url : string | null;
}

export default function Table({url} : TableProps)
{
    const [data, setData] = useState<any[] | null>();
    //let dataPerCountry : Map<string, any[]> = new Map();

    const [tableHeader, setTableHeader] = useState<string[]>(["Year"]);
    
    //const [tableData, setTableData] = useState<string[]>([]);
    
    useEffect(() =>
    {
        //fetch data from url
        async function fetchData()
        {
            const result = await TableDataService(url);
            setData(result);
            //console.log(result);

            let countryData : Map<string, any[]> = new Map<string, any[]>();
            
            result?.forEach( (item) => {
                const key = item.REF_AREA;

                // check if map already has this key
                if (!countryData.has(key)) {
                    countryData.set(key, [item]);
                } else {
                    countryData.get(key)?.push(item);
                }
            })
            
            //get unique country names
            countryData.forEach((country) =>{
                tableHeader.push(country[0].REF_AREA);
            })
            
            console.log(tableHeader);
            //console.log(dataPerCountry);
            
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