export const InputBox = ({ placeholder, onChange, label }) => {
    return (<div>
        <div>
            <label class="block mb-2 mt-2 text-sm font-medium text-gray-900 dark:text-white text-left">{label}</label>
            <input onChange={onChange} placeholder={placeholder} class="bg-gray-50 border border-white-300 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-grey-700 border-blue-600 dark:placeholder-black-400 dark:text-grey dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-4" required="" />
        </div>
    </div>
    )
}