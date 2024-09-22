export const Appbar = ({ name, user }) => {
    return (<div >
        <nav className="flex flex-col shadow-[0_4px_10px_rgba(255,255,255,0.1)]">
            <div className="flex justify-between p-5 items-center ">
                <div className="font-semibold text-3xl text-white">Dashboard</div>
                <div className="flex items-center">
                    <div className="font-semibold text-3xl text-white pr-5">Hello {name}</div>
                    <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                        <div className="flex flex-col justify-center h-full font-semibold text-xl">
                        {user}
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    </div>)
}


