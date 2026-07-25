import style from "./Table.module.css"
import generalStyle from "../../General.module.css"

export default function Table()
{
    
    
    return (
        <table className = {style.table}>
            <caption>
                insert epic name
            </caption>
            <thead>
                <tr>
                    <th>Year</th>
                    <th>Insert Country Name</th>
                    <th>Insert Country Name</th>
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