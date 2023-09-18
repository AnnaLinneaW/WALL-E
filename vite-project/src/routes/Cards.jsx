import { useSelector,useDispatch } from "react-redux"
import { useState } from "react"

export const Cards = () => {
    //className={card.active ? "active" : ""} - använd för att sätta klassen aktiv eller inaktiv
    const dispatch = useDispatch()
    const cards = useSelector((state) => state.card.cards);

    console.log("cards", cards);
    
    return (
        <>
            <h1>Your cards</h1>
            <div className="card-container">
                {cards.map((card, index) => {
                    return (
                    <div key={index} className={`card-${card.cardVendor}`}>
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
                )})}
            </div>

        </>
    )
}