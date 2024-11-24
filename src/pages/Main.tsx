import { Link } from "react-router-dom"
import LogoFilled from "../components/Icons/LogoFilled"

const Elements = [
    ['Products', '/products'],
    ['Orders', '/orders'],
    ['Reservations', '/reservations'],
    ['Clients', '/clients'],
    ['Employees', '/employees'],
    ['Profile', '/employees/:id']
]

export default function Main() {
    return (
        <div className="flex flex-col justify-start items-center w-full h-full bg-dark">
            <LogoFilled className="fill-main" />

            <div className="flex flex-row w-full justify-center">
                <div className="max-w-lg grid grid-cols-3 gap-4 h-fit">
                    {Elements.map((element, index) => {
                        return (
                            <Link className="button-menu " key={index} to={element[1]}>{element[0]}</Link>
                        )
                    })}

                </div>
            </div>


        </div>
    )
}