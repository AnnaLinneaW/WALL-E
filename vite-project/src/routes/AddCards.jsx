import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addCard } from "../redux/createCardSlice";

export const AddCards = () => {
  const dispatch = useDispatch();
  const cardUser = useSelector((state) => state.card);
  const { status, card } = useSelector((state) => state.userName);

  const results = card && card.results ? card.results : [];
  const firstResult = results.length > 0 ? results[0] : {};
  const firstName =
    firstResult && firstResult.name ? firstResult.name.first : "";
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
        cardNumber: document.getElementById("creditNum").value,
        cvv: document.getElementById("cvv").value,
        expirationMonth: document.getElementById("month").value,
        expirationYear: document.getElementById("year").value,
        cardActive: false,
      })
    );
    setSelectedVendor("VISA");
    setFirstName(firstName);
    setLastName(lastName);
    setCardNumber("");
    setCvv("");
    setExpirationMonth("");
    setExpirationYear("");
    setError("");
  };

  const [selectedVendor, setSelectedVendor] = useState("VISA");
  const [cardNumber, setCardNumber] = useState("");
  const [cvv, setCvv] = useState("");
  const [expirationMonth, setExpirationMonth] = useState("");
  const [expirationYear, setExpirationYear] = useState("");
  const [firstNameRed, setFirstName] = useState("");
  const [lastNameRed, setLastName] = useState("");
  const [error, setError] = useState("");

  return (
    <>
      <div>
        <div className={`card-${selectedVendor}`}>
          <div className={`vendor-${selectedVendor}`}>
            <p>{selectedVendor}</p>
          </div>
          <div className="clientName">
            <p>{firstNameRed.toUpperCase() || firstName.toUpperCase()}</p>
            <p>{lastNameRed.toUpperCase() || lastName.toUpperCase()}</p>
          </div>
          <div className="cardNumber">
            <p>{cardNumber}</p>
          </div>
          <p>{cvv}</p>
          <p>
            {expirationMonth}/{expirationYear}
          </p>
        </div>

        <h1>Add Cards</h1>
        <div>
          <select
            name="cardVendor"
            id="cardVendorSelect"
            className={selectedVendor}
            onChange={(e) =>
              setSelectedVendor(e.target.value, e.target.className)
            }
            value={selectedVendor}
          >
            <option value="VISA">Visa</option>
            <option value="mastercard">Mastercard</option>
            <option value="AMERICAN">Amex</option>
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

                // Om formattedValue är en tom sträng, tillåt användaren att radera text
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
              onChange={(e) => {
                const inputValue = e.target.value;
                // Om inputValue är en tom sträng, tillåt användaren att radera text
                if (inputValue === "") {
                  setCvv(""); // Uppdatera state med en tom sträng
                  setError(""); // Rensa eventuella tidigare felmeddelanden
                } else if (/^\d*$/.test(inputValue) && inputValue.length <= 3) {
                  setCvv(inputValue); // Annars, uppdatera state med det nya värdet om det är en giltig numerisk inmatning och inte längre än 3 tecken
                  setError(""); // Rensa eventuella tidigare felmeddelanden
                } else {
                  setError(
                    "Please enter only numeric digits and a maximum of 3 characters."
                  );
                }
              }}
              placeholder="CVV"
              value={cvv}
            />
            <br />
            <input
              type="text"
              id="month"
              placeholder="Month"
              maxLength={2}
              onChange={(e) => {
                const inputValue = e.target.value;
                if (!/^\d*$/.test(inputValue)) {
                  setError("Please enter only numeric digits.");
                } else {
                  const monthValue = parseInt(inputValue, 10);
                  if (monthValue >= 1 && monthValue <= 12) {
                    setError("");
                    setExpirationMonth(inputValue);
                  } else {
                    setError("Please enter a valid month (1-12).");
                  }
                }
              }}
            />

            <br />
            <input
              type="text"
              id="year"
              placeholder="Year"
              maxLength={2} // Begränsa inmatningen till 2 tecken
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
                  setError("Please enter a valid 2-digit year between " + currentYear +" and 28.");
                } else {
                  setError(""); // Rensa felmeddelandet om inmatningen är giltig
                  setExpirationYear(inputValue);
                }
              }}
            />
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
