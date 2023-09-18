import {  useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addName, getCardUser } from "../redux/addNameSlice";
import { addCard } from "../redux/createCardSlice";

export const AddCards = () => {
    const dispatch = useDispatch();
    const cardUser = useSelector((state) => state.card);
    const { status, card } = useSelector((state) => state.userName);
    
    const results = card && card.results ? card.results : [];
    const firstResult = results.length > 0 ? results[0] : {};
    const firstName = firstResult && firstResult.name ? firstResult.name.first : "";
    const lastName = firstResult && firstResult.name ? firstResult.name.last : "";

    const cardFirstName = firstName;
    const cardLastName = lastName;
    
    return {cardFirstName, cardLastName}
  


const handleAddCard = () => {

    if (cardNumber.length !== 16 || cvv.length !== 3 ) {
        setError("Card number must be 16 digits and CVV must be 3 digits.");
        return;
      }
    if (expirationMonth.length == ""){
        setError("Please enter expiration date");
        return;
    }

    dispatch(addCard({
        cardVendor: selectedVendor,
        firstName: firstName,
        lastName: lastName,
        cardNumber: document.getElementById("creditNum").value,
        cvv: document.getElementById("cvv").value,
        expirationMonth: document.getElementById("month").value,
        expirationYear: document.getElementById("year").value,
        cardActive: false,   
    }))
    setSelectedVendor("VISA");
    setFirstName(firstName);
    setLastName(lastName);
    setCardNumber("");
    setCvv("");
    setExpirationMonth("");
    setExpirationYear("");
}


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
            <p>{expirationMonth}/{expirationYear}</p>
            </div>   

        <h1>Add Cards</h1>
        <div>
          <select
            name="cardVendor"
            id="cardVendorSelect"
            className={selectedVendor}
            onChange={(e) => setSelectedVendor(e.target.value, e.target.className)}
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
            <input 
            type="number" 
            id="creditNum"
            onChange={(e) => setCardNumber(e.target.value)}
            placeholder="Creditcard number" />
            <br />
            <input 
            type="number" 
            id="cvv" 
            onChange={(e) => setCvv(e.target.value)}
            placeholder="CVV" />
            <br />
            <input 
            type="month" 
            id="month"
            placeholder="Month"
            onChange={(e) => setExpirationMonth(e.target.value)}
            />
            <br />
            <input
            type="year"
            id="year"
            placeholder="Year"
            onChange={(e) => setExpirationYear(e.target.value)}
            />
            <br />
            {error && <p style={{ color: "red" }}>{error}</p>}
            <br />
            <button onClick={handleAddCard}>Add Card</button>
        </div>
      </div>
    </>
  );
};
