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
      <h1>Your cards</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div className="card-list">
        {cards.map((card, index) => {
          return (
            <>
              <div
                className={`${card.cardActive ? "active-card" : "inactive-card"}`}
                onClick={() => {
                    dispatch(activeCard({ index }));
                }}
              >
                <div className={`card-${card.cardVendor} `}>
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
                  <p>
                    {card.expirationMonth}/{card.expirationYear}
                  </p>
                  <button onClick={() => handleDeleteCard(index)}>
                    Delete
                  </button>
                </div>

                <div>
                </div>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
};
