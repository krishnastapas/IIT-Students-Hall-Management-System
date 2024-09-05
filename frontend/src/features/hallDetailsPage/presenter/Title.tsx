import React from 'react'
import { HallInterface } from '../../hall/Model'
import { hallImageUrl } from "../../../constant";
function Title(
    props: {

        hall: HallInterface
    }
) {
    console.log(props.hall)
    console.log(hallImageUrl+props.hall.image)
    return (
        <div style={{
            width: "100%",
            height: "175px",
            // backgroundColor: "yellow",
            display: "flex",
            margin: "16px",
            borderBottom: "2px solid #cbc4c4"
        }}>
            {/* profile photo area */}
            <div style={{
                display: "flex", flexDirection: "column"
            }}>
                <div style={{
                    width: "150px",
                    height: "150px",
                    margin: "5px",
                    borderRadius: "50%",
                    border:"1px solid red",
                    backgroundImage:`url(${hallImageUrl+props.hall.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}>  </div>

            </div>

            {/* Hall Name Area */}
            <div className="flex flex-col justify-end">
                <div className="bottom-div mb-10">
                    <h2 className="text-4xl font-extrabold dark:text-white">{props.hall.name}</h2>
                </div>
            </div>
        </div>
    )
}

export default Title