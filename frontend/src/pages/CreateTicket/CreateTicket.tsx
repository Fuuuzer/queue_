import React from 'react'
import { createTicket } from '../../api/tickets';
import { isAxiosError } from 'axios';

interface Feedback {
  type: 'error' | 'success';
  message: string;
}

const CreateTicketForm = () => {
  const [title, setTitle] = React.useState<string>('');
  const [description, setDescription] = React.useState<string>('');
  const [feedback, setFeedback] = React.useState<Feedback | null>(null)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
   e.preventDefault();
   setFeedback(null)

   if(title === '' || description === '') {
    setFeedback({type: 'error', message: 'É necessário preencher todos os camos para registrar o ticket! /n :| '})
    return
   }

   try {
    const response = await createTicket({title, description})
    const ticketData = response.data;
    if(!response.success) {
      setFeedback({type: 'error', message: response.message})
    } else {
      setFeedback({type: 'success', message: response.message})
      
    }
    console.log(ticketData)
   } catch (err) {
    if(isAxiosError(err)) {
      setFeedback({type: 'error', message: err.response?.data.message})
    } else {
      setFeedback({type: 'error', message: 'Ocorreu um erro ao registrar o ticket'})
    }
  }
}

  return (
    <>
    <form onSubmit={handleSubmit}>
      {feedback && <p style={{color: feedback.type === 'error' ? 'red' : 'green'}} >{feedback.message}</p>}
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