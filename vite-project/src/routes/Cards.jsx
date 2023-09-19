import { useSelector,useDispatch } from "react-redux"
import { useState } from "react"
import {deleteCard, activeCard} from "../redux/createCardSlice"

export const Cards = () => {
    
    const dispatch = useDispatch()
    const cards = useSelector((state) => state.card.cards);
    console.log("cards", cards.cardActive);

    const handleDeleteCard = (index) => {
        if (cards[index].cardActive) {
            setError("You can't delete an active card");
        } else if (cards.length > 1) {
            dispatch(deleteCard(index));
            setError("");
        } else {
            setError("You can't delete the last card");
        }
    }    
        const [error, setError] = useState("")

    console.log("cards", cards);
    return (
        <>
            <h1>Your cards</h1>
            <div className="card-list">
                {cards.map((card, index) => {
                    return (
                            <div
                            key={index}>
                        <div className={`card-container `}
                                                    onClick={() => {
                                                        dispatch(activeCard({index: index, active: !card.active}));
                                                    }}
                        >
                    <div className={`card-${card.cardVendor} ${card.cardActive ? "active-card" : ""}`}>
                        <div className={`vendor-${card.cardVendor}`}>
                            <p>{card.cardVendor}</p>
                        </div>
                        <div className="clientName">
                            <p>{card.firstName.toUpperCase()}</p>
                            <p>{card.lastName.toUpperCase()}</p>
                        </div>
                        <div className="cardNumber">
                            <p>{card.cardNumber}</p>
                        </div>
                        <p>{card.cvv}</p>
                        <p>{card.expirationMonth}/{card.expirationYear}</p>
                    </div>
                   </div>
                    <div>
                        <button 
                        onClick={() => handleDeleteCard(index)}
                        >Delete</button>
                        {error && <p style={{ color: "red" }}>{error}</p>}
                    </div>
                    </div>
                )})}
            </div>

        </>
    )
}