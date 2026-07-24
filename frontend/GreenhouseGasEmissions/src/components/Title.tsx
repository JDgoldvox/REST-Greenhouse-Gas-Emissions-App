import style from "./Title.module.css"
import generalStyle from "../General.module.css"

export default function Title()
{
    return (
        <div className = {style.title}>
            <h1 className = {generalStyle.center}> Environmental Accounts </h1>
        </div>
    )
}