import React from 'react'
import instance from '../../api/api'
import { isAxiosError } from 'axios'
import styles from './Tickets.module.css'


interface TicketData {
  id: string,
  title: string,
  description: string,
  ticketNumber: number,
  status: 'OPEN' | 'IN_PROGRESS' | 'RESOLVED' | 'CLOSED',
  priority: 'LOW' | 'MEDIUM' | 'CRITICAL'
}

const Tickets = () => {
  const [tickets, setTickets] = React.useState<TicketData[]>([])
  const [error, setError] = React.useState<string | null>('');
  const [loading, setLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    setError(null)
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token')
        const response = await instance.get('/tickets', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const responseData = response.data.data
        setTickets(responseData)
      } catch (err) {
        if(isAxiosError(err)) {
          setError(err.message || 'Something went wrong');
        } else {
          setError('Erro inesperado')
        }
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])
  return (
    <>
    <h1>Tickets</h1>
    <p>{error}</p>
    {loading && <p>Carregando tickets</p>}
    <div className={styles.container}>
    {tickets.map(ticket => (
       <div className={styles.ticket} key={ticket.id}>
        <h1>{ticket.title}</h1>
        <p>{ticket.description}</p>
        <p>{ticket.status}</p>
       </div>
      ))
    }
    </div>
    </>
  )
}

export default Tickets