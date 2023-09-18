import {  useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addName, getCardUser } from "../redux/addNameSlice";
import { addCard } from "../redux/createCardSlice";

export const AddCards = () => {
  const dispatch = useDispatch();
  const cardUser = useSelector((state) => state.card);
  const userName = useSelector((state) => state.cardUser);



console.log(userName);

const results = userName && userName.results ? userName.results : [];
const firstResult = results.length > 0 ? results[0] : {};
const firstName = firstResult && firstResult.name ? firstResult.name.first : "";
const lastName = firstResult && firstResult.name ? firstResult.name.last : "";

  const [selectedVendor, setSelectedVendor] = useState("VISA");
  const [cardNumber, setCardNumber] = useState("");
  const [cvv, setCvv] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [firstNameRed, setFirstName] = useState("");
  const [lastNameRed, setLastName] = useState("");


  
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
            <p>{expirationDate}</p>
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
          />
          <br />
          <input 
          type="text" 
          id="lastName" 
          defaultValue={lastName || lastNameRed} 
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
            type="date" 
            id="date"
            onChange={(e) => setExpirationDate(e.target.value)}
            />
            <br />
            <button onClick={()=>{
                dispatch(addCard({
                cardVendor: selectedVendor,
                firstName: firstName,
                lastName: lastName,
                cardNumber: document.getElementById("creditNum").value,
                cvv: document.getElementById("cvv").value,
                expirationDate: document.getElementById("date").value,
                expirationYear: document.getElementById("date").value,
            }))
            setSelectedVendor("VISA");
            setFirstName(firstName);
            setLastName(lastName);
            setCardNumber("");
            setCvv("");
            setExpirationDate("");
            }}>Add Card</button>

        </div>
      </div>
    </>
  );
};
