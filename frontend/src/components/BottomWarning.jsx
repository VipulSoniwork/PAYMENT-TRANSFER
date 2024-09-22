import { Link } from "react-router-dom"

export function BottomWarning({label, buttonText, to}) {
    return <div className="text-white py-2 text-sm flex justify-center pb-6">
      <div>
        {label}
      </div>
      <Link className="pointer hover:underline pl-1 cursor-pointer font-bold hover:text-blue-500 " to={to}>
        {buttonText}
      </Link>
    </div>
}
  