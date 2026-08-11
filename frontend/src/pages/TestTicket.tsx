import React from 'react'
import { createTicket } from '../api/api';

const TestTicket = () => {

  const handleClick = async () => {
     try {
      const result = await createTicket({
        title: "Teste ticket hahahaha locuura",
        description: "Testando ticket via axios hahaahahahah"
      });
      console.log(result);
    } catch (err) {
      console.error(err);
    }
  }
  
  return (
   <button onClick={handleClick}>Criar ticket teste</button>
  )
}

export default TestTicket