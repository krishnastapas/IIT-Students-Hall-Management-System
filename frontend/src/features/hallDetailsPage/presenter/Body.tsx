import React, { useState } from 'react'
const tabList=[
    {
        id:1,
        name:"People",
    },
    {
        id:2,
        name:"People Incharge",
    },
    {
        id:3,
        name:"Rooms",
    }
]
function Body() {
    const [currentTab,setCurrentTab]=useState("")
    return (
        <div>
            <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
                <ul className="flex flex-wrap -mb-px">
                    {tabList?.map((ele) => {
                        const notCurrentSectionStyle: string = "inline-block p-4 border-transparent rounded-t-lg hover:text-blue-600 hover:border-blue-300 dark:hover:text-blue-300";
                        const activeSectionStyle: string = "inline-block text-blue-300 p-4 border-b-2 border-transparent rounded-t-lg text-blue-600 border-blue-300 dark:text-blue-300"
                        let style = notCurrentSectionStyle;
                        if (currentTab == ele.name) {
                            style = activeSectionStyle
                        }
                        return (
                            <li className="mr-2">
                                <a href="#" onClick={() => setCurrentTab(ele.name)} className={style}>{ele.name}</a>
                            </li>
                        )
                    })}
                </ul>
            </div>

        </div>
    )
}

export default Body