import React from 'react'
import { createTicket } from '../../api/tickets';

const CreateTicketForm = () => {
  const [title, setTitle] = React.useState<string>('')
  const [description, setDescription] = React.useState<string>('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
   e.preventDefault();
   try {
    const response = await createTicket({title, description})
    console.log(response)
   } catch (err){
    console.error(err)
   }
  }

  return (
    <>
    <form onSubmit={handleSubmit}>
      <label htmlFor="title">Como podemos lhe ajudar?</label>

      <input 
        id='title' 
        type="text" 
        value={title}
        onChange={(e) => setTitle(e.target.value)} />

      <label htmlFor="description">Descrição</label>
      
      <textarea 
        name="descriptio0n" 
        id="description" 
        value={description}
        onChange={(e) => setDescription(e.target.value)}></textarea>

      <button type='submit'>Cadastrar ticket</button>
    </form>
    </>
  )
}

export default CreateTicketForm