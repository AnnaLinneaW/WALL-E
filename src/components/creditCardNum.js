
export const getCreditCardNumber = () => {

        const numLength = 16; // Antal siffror i ett vanligt kreditkortsnummer
        let cardNumber = '';
      
        for (let i = 0; i < numLength; i++) {
          const digit = Math.floor(Math.random() * 10); // Slumpmässig siffra från 0 till 9
          cardNumber += digit.toString();
        }
      
        return cardNumber;
      }
      
      const creditCardNumber = getCreditCardNumber();

      
      const getCVV = () => {
          
          const numLength = 3; 
          let cvv = '';
          
          for (let i = 0; i < numLength; i++) {
              const digit = Math.floor(Math.random() * 10); 
              cvv += digit.toString();
            }
            
            return cvv;
        }
        
        const cvv = getCVV();
        
        export  {creditCardNumber, cvv};

