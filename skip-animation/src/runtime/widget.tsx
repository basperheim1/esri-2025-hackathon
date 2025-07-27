import React from "react"
import Skipper from "../components/Skipper/skipper"

const Widget = ( props ) => {

    const ms = props?.config?.delay
    const buttonText = props?.config?.buttonText

    console.log(ms)     
    return (
        <div>{
            ms && <Skipper ms={ms} buttonText={buttonText}/>}

        </div>
    )

}

export default Widget