import style from "./Table.module.css"
import generalStyle from "../../General.module.css"
import {useEffect, useState} from "react";
import {TableDataService} from "../../Services/TableDataService.ts";

interface TableProps{
    url : string | null;
}

export default function Table({url} : TableProps)
{
    const [tableHeader, setTableHeader] = useState<string[]>([]);
    const [tableRow, setTableRow] = useState<any[]>([]);
    
    useEffect(() =>
    {
        //fetch data from url
        async function fetchData()
        {
             const rowData = await TableDataService(url);
             if(rowData != null) {
                 setTableRow(rowData);
                 setTableHeader(rowData[0]);
             }
        }

        fetchData();
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
            {
                tableRow.map((row: any[], index) =>
                {
                    if(index === 0) return;
                    return (
                        <>
                            <tr>
                                {
                                    row.map((data) => {
                                        return (
                                            <>
                                                <td>{data}</td>
                                            </>
                                        )
                                    })
                                }
                                
                            </tr>
                        </>
                    );
                })
            }
            </tbody>
        </table>
    )
}