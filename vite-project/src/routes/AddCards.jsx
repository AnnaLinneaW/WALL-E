import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addCard } from "../redux/createCardSlice";

export const AddCards = () => {
  const dispatch = useDispatch();
  const cardUser = useSelector((state) => state.card);
  const { status, card } = useSelector((state) => state.userName);

  const results = card && card.results ? card.results : [];
  const firstResult = results.length > 0 ? results[0] : {};
  const firstName = firstResult && firstResult.name ? firstResult.name.first : "";
  const lastName = firstResult && firstResult.name ? firstResult.name.last : "";

  const handleAddCard = () => {
    if (cardNumber.length !== 19 || cvv.length !== 3) {
      setError("Card number must be 16 digits and CVV must be 3 digits.");
      return;
    }
    if (expirationMonth.length === "" || expirationYear.length === "") {
      setError("Please enter expiration date");
      return;
    }
    if (cardUser.cards.length >= 4) {
      setError("You can't add more than 4 cards");
      return;
    }

    dispatch(
      addCard({
        cardVendor: selectedVendor,
        firstName: firstName,
        lastName: lastName,
        cardNumber: cardNumber,
        cvv: cvv,
        expirationMonth: expirationMonth,
        expirationYear: expirationYear,
        cardActive: false,
      })
    );
    setSelectedVendor("RoboPay");
    setFirstName(firstName);
    setLastName(lastName);
    setCardNumber("");
    setCvv("");
    setExpirationMonth("");
    setExpirationYear("");
    setError("");
  };

  const [selectedVendor, setSelectedVendor] = useState("RoboPay");
  const [cardNumber, setCardNumber] = useState("");
  const [cvv, setCvv] = useState("");
  const [expirationMonth, setExpirationMonth] = useState("");
  const [expirationYear, setExpirationYear] = useState("");
  const [firstNameRed, setFirstName] = useState("");
  const [lastNameRed, setLastName] = useState("");
  const [error, setError] = useState("");

  return (
    <>
    <div className="card-list">
      <div className="active-card">
        <div className={`card-${selectedVendor} `}>
      <div className="card-wrapper">
          <div className={`vendor-${selectedVendor}`}>
            <p>{selectedVendor}</p>
          </div>
          <div className="cvv">
            <img src="/chip.png" alt="" className="chip-img" />
            <img src="/wireless.png" alt="" className="wireless-img" />
            <p>{cvv}</p>
          </div>
          <div className="cardNumber">
            <p>{cardNumber}</p>
          </div>
          <div className="expiration">
            <p>
              {expirationMonth}/{expirationYear}
            </p>
          </div>
          <div className="clientName">
            <p>
              {firstName.toUpperCase() || firstNameRed.toUpperCase()}{" "}
              {lastName.toUpperCase() || lastNameRed.toUpperCase()}
            </p>
          </div>
          </div>
        </div>
        </div>
      </div>
      <div className="add-card">
        <h2>Add Cards</h2>
        <div className="form-div">
          <select
            name="cardVendor"
            id="cardVendorSelect"
            className={selectedVendor}
            onChange={(e) =>
              setSelectedVendor(e.target.value, e.target.className)
            }
            value={selectedVendor}
          >
            <option value="RoboPay">RoboPay</option>
            <option value="EarthSaver">EarthSaver</option>
            <option value="EveCard">EveCard</option>
          </select>
          <br />
          <input
            type="text"
            id="firstName"
            defaultValue={firstName || firstNameRed}
            readOnly
          />
          <br />
          <input
            type="text"
            id="lastName"
            defaultValue={lastName || lastNameRed}
            readOnly
          />
          <br />
          <div className="input-div">
            <input
              type="text"
              id="creditNum"
              maxLength={19}
              onChange={(e) => {
                const inputValue = e.target.value;
                const formattedValue = inputValue
                  .replace(/\D/g, "") // Ta bort allt som inte är siffror
                  .replace(/\B(?=(\d{4})+(?!\d))/g, " "); // Lägg till mellanslag efter varje 4:e siffra

                if (formattedValue === "") {
                  setCardNumber(""); // Uppdatera state med en tom sträng
                } else if (formattedValue.length <= 19) {
                  setCardNumber(formattedValue); // Annars, uppdatera state med det formaterade värdet
                }
              }}
              value={cardNumber}
              placeholder="Creditcard number"
            />

            <br />
            <input
              type="text"
              id="cvv"
              maxLength={3}
              value={cvv}
              onChange={(e) => {
                const inputValue = e.target.value;
                if (/^\d*$/.test(inputValue) && inputValue.length <= 3) {
                  setCvv(inputValue);
                  setError("");
                } else {
                  setError(
                    "Please enter only numeric digits and a maximum of 3 characters."
                  );
                }
              }}
              placeholder="CVV"
            />
            <br />
            <div className="expiration-div">
            <input
              type="text"
              id="month"
              placeholder="Month"
              maxLength={2}
              onChange={(e) => {
                const inputValue = e.target.value;
                const newMonth =
                  inputValue.length === 2 ? inputValue : "0" + inputValue;
                if (!/^\d*$/.test(inputValue)) {
                  setError("Please enter only numeric digits.");
                } else {
                  if (newMonth >= 1 && newMonth <= 12) {
                    setError("");
                    setExpirationMonth(newMonth);
                  } else {
                    setError("Please enter a valid month (01-12).");
                  }
                }
              }}
            />
            <br />
            <input
              type="text"
              id="year"
              placeholder="Year"
              maxLength={2}
              onChange={(e) => {
                const inputValue = e.target.value;
                const currentYear = new Date()
                  .getFullYear()
                  .toString()
                  .slice(-2); // Hämta de två sista siffrorna i det nuvarande året
                if (
                  !/^\d*$/.test(inputValue) ||
                  inputValue > 28 ||
                  inputValue < currentYear
                ) {
                  setError(
                    "Please enter a valid 2-digit year between 23 and 28."
                  );
                } else {
                  setError(""); // Rensa felmeddelandet om inmatningen är giltig
                  setExpirationYear(inputValue);
                }
              }}
            />
            </div>
          </div>
          <br />
          {error && <p style={{ color: "red" }}>{error}</p>}
          <br />
          <button onClick={handleAddCard}>Add Card</button>
        </div>
      </div>
      </>
  );
};
