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
            <>
              <div
                className={`${
                  card.cardActive ? "active-card" : "inactive-card"
                }`}
              >
                <div className={`card-${card.cardVendor} `}>
                  <div
                    className="card-wrapper"
                    onClick={() => {
                      dispatch(activeCard({ index }));
                    }}
                  >
                    <div className={`vendor-${card.cardVendor}`}>
                      <p>{card.cardVendor}</p>
                    </div>
                    <div className="cvv">
                      <img src="/chip.png" alt="chip" className="chip-img" />
                      <img
                        src="/wireless.png"
                        alt="wireless"
                        className="wireless-img"
                      />
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
                  </div>
                  {!card.cardActive && (
                    <button
                      className="delete-btn"
                      onClick={() => handleDeleteCard(index)}
                    >
                      X
                    </button>
                  )}
                </div>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
};
