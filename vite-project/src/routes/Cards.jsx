import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { deleteCard, activeCard } from "../redux/createCardSlice";

export const Cards = () => {
  const dispatch = useDispatch();
  const cards = useSelector((state) => state.card.cards);
  const [error, setError] = useState("");

  const handleDeleteCard = (index) => {
    if (cards[index].cardActive) {
      setError("You can't delete an active card");
    } else if (cards.length > 1) {
      dispatch(deleteCard(index));
      setError("");
    } else {
      setError("You can't delete the last card");
    }
  };

  return (
    <>
      <h2>Your cards</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div className="card-list">
        {cards.map((card, index) => {
          return (
             
              <div key={index}
                className={`${
                  card.cardActive ? "active-card" : "inactive-card"
                }`}
                onClick={() => {
                  dispatch(activeCard({ index }));
                }}
              >
                <div className={`card-${card.cardVendor} `}>
                 <div  className="card-wrapper" >
                  <div className={`vendor-${card.cardVendor}`}>
                    <p>{card.cardVendor}</p>
                  </div>
                  <div className="cvv">
                  <img src="./assets/chip.png" alt="Beskrivning av bilden" />
                    <p>{card.cvv}</p>
                  </div>
                  <div className="cardNumber">
                    <p>{card.cardNumber}</p>
                  </div>
                  <div className="expiration">
                    <p>
                      {card.expirationMonth}/{card.expirationYear}
                    </p>
                  </div>
                  <div className="clientName">
                    <p>
                      {card.firstName.toUpperCase()}{" "}
                      {card.lastName.toUpperCase()}
                    </p>
                  </div>
                  <div className="delete-btn">
                    {!card.cardActive && (
                      <button onClick={() => handleDeleteCard(index)}>
                        Delete
                      </button>
                    )}
                  </div>
                </div>
              </div>
              </div>
          );
        })}
      </div>
    </>
  );
};
