import style from "./Filter.module.css"
import generalStyle from "../../General.module.css"
import {useState} from "react"

export default function Filter()
{
    const [isCountryOpen, setIsCountryOpen] = useState(false)
    const [isInteractorOpen, setIsInteractorOpen] = useState(false)
    const [isAccountingEntryOpen, setIsAccountingEntryOpen] = useState(false)

    const countries: string[] = ["Australia" , "Antartica"]
    const interactors: string[] = ["logging" , "fishing"]
    const accountingEntries: string[] = ["entry A" , "entry b"]
    
    return(
        <div>
            <ul className = {style.filterList}>
                <li>
                    <label> Reporting Frequency
                        <select onChange={(e) => console.log(e.target.value)}>
                            <option value="someOption">Some option</option>
                            <option value="otherOption">Other option</option>
                            <option value="someOption">Some option</option>
                        </select>
                    </label>
                </li>
                <li>
                    <label> Air pollutant
                        <select onChange={(e) => console.log(e.target.value)}>
                            <option value="someOption">Some option</option>
                            <option value="otherOption">Other option</option>
                        </select>
                    </label>
                </li>
                <li>
                    <label> Country
                        <div className={style.DropdownWrapper}>
                            <button onClick={() => setIsCountryOpen(!isCountryOpen)}>
                                Select Country
                            </button>

                            {isCountryOpen && (
                                <div className={style.DropdownMenu}>
                                    {countries.map((country) => (
                                        <label key={country}>
                                            <input type="checkbox"/>
                                            {country}
                                        </label>
                                    ))}
                                </div>
                            )}
                        </div>
                    </label>
                </li>
                <li>
                    <div className = {generalStyle.flex}>
                        <label> from
                            <select onChange={(e) => console.log(e.target.value)}>
                                <option value="2010">2010</option>
                                <option value="2011">2011</option>
                                <option value="2012">2012</option>
                            </select>
                        </label>
                        <label> to
                            <select onChange={(e) => console.log(e.target.value)}>
                                <option value="2010">2011</option>
                                <option value="2011">2012</option>
                                <option value="2012">2013</option>
                            </select>
                        </label>
                    </div>
                </li>
                <li>
                    <label> Interactors
                        <div className={style.DropdownWrapper}>
                            <button onClick={() => setIsInteractorOpen(!isInteractorOpen)}>
                                Select Sector
                            </button>

                            {isInteractorOpen && (
                                <div className={style.DropdownMenu}>
                                    {interactors.map((interactor) => (
                                        <label key={interactor}>
                                            <input type="checkbox"/>
                                            {interactor}
                                        </label>
                                    ))}
                                </div>
                            )}
                        </div>
                    </label>
                </li>
                <li>
                    <label> Unit
                        <select onChange={(e) => console.log(e.target.value)}>
                            <option value="someOption">Tons</option>
                            <option value="otherOption">Omg</option>
                        </select>
                    </label>
                </li>
                <li>
                    <label> Accounting Entry
                        <div className={style.DropdownWrapper}>
                            <button onClick={() => setIsAccountingEntryOpen(!isAccountingEntryOpen)}>
                                Select Sector
                            </button>

                            {isAccountingEntryOpen && (
                                <div className={style.DropdownMenu}>
                                    {accountingEntries.map((entry) => (
                                        <label key={entry}>
                                            <input type="checkbox"/>
                                            {entry}
                                        </label>
                                    ))}
                                </div>
                            )}
                        </div>
                    </label>
                    
                    
                </li>
            </ul>
        </div>
    )
}
