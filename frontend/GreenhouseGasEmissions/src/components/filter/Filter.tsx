import style from "./Filter.module.css"

export default function Filter()
{
    return(
        <div>
            <label className = {style.label}> Reporting Frequency
                <select onChange={(e) => console.log(e.target.value)}>
                    <option value="someOption">Some option</option>
                    <option value="otherOption">Other option</option>
                    <option value="someOption">Some option</option>
                </select>
            </label>
            
            <label className = {style.label}> Air pollutant
                <select onChange={(e) => console.log(e.target.value)}>
                    <option value="someOption">Some option</option>
                    <option value="otherOption">Other option</option>
                </select>
            </label>

            <label className = {style.label}> Sectors
                <select>
                    <option><input type="checkbox"/>First checkbox</option>
                    <option><input type="checkbox"/>Second checkbox </option>
                    <option><input type="checkbox"/>Third checkbox</option>
                </select>
            </label>


        </div>
    )
}
