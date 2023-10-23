export const SelectComponent = (props:
    {
        value:any,
        onChange:(value:any)=>void
        itemList:{value:any,name:string}[]
    }) => {
    return (
        <select
            name="target_exam"
            id="target_exam"
            className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
            value={props.value}

            onChange={(e) => props.onChange(e.target.value)}
        >
            <option value="" >Select a Target Exam</option>
            {props.itemList.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.name}
                </option>
            ))}
        </select>
    )
}