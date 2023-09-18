import { Link } from "react-router-dom";

export const Navbar = () => {

    return (
        <>
        <nav>
<Link to="/cards" >My Cards</Link>
<br />
<Link to="/add-cards" >Add Card</Link>
        </nav>
        </>
    )
}

