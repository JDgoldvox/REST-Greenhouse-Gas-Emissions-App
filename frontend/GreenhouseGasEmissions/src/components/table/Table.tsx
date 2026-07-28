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
             let rowData = await TableDataService(url);
             if(rowData != null) {
                 setTableHeader(rowData[0]);
                 rowData = rowData.slice(1); //remove headers (first row) before giving to table rows
                 setTableRow(rowData);
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
                tableRow.map((row: any[], rowIndex) =>
                {
                    return (
                        <tr key={rowIndex}>
                            {
                                row.map((data, dataIndex) => {
                                    return (<td key={dataIndex}>{data}</td>)
                                })
                            }
                        </tr>
                    );
                })
            }
            </tbody>
        </table>
    )
}