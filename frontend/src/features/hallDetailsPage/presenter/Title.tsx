import React from 'react'

function Title() {
    return (
        <div style={{
            width: "100%",
            height: "175px",
            backgroundColor: "yellow",
            display: "flex",
            margin: "16px",
            borderBottom: "2px solid #cbc4c4"
        }}>
            {/* profile photo area */}
            <div style={{
                flex: 0.3, display: "flex", flexDirection: "column"
            }}>
                <div style={{
                    width: "150px",
                    height: "150px",
                    margin: "5px",
                    backgroundColor: "red",
                    borderRadius: "50%"
                }}>  profile photo</div>

            </div>

            {/* Hall Name Area */}
            <div>
                name
            </div>
        </div>
    )
}

export default Title