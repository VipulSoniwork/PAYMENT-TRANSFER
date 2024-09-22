export const Balance = ({ value }) => {
    return <div className="flex text-white text-5xl">
        <div className="font-bold">
            Your balance :
        </div>
        <div className="font-semibold ml-4 ">
            Rs {value}
        </div>
    </div>
}