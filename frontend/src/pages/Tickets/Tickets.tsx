import React from 'react'
import instance from '../../api/api'
import { isAxiosError } from 'axios'


interface TicketData {
  title: string,
  description: string,
  ticketNumber: number,
  status: 'OPEN' | 'IN_PROGRESS' | 'RESOLVED' | 'CLOSED',
  priority: 'LOW' | 'MEDIUM' | 'CRITICAL'
}

const Tickets = () => {
  const [tickets, setTickets] = React.useState<TicketData[]>([])
  const [error, setError] = React.useState<string | null>('');

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
        console.log(responseData)
        setTickets(responseData)
      } catch (err) {
        if(isAxiosError(err))
        setError(err.message || 'Something went wrong');
      }
    }
    fetchData()
  }, [])
  return (
    <>
    {/* {tickets} */}
    <h1>Tickets</h1>
    <p>{error}</p>
    <>{tickets.map(item => (
       <div key={item.ticketNumber}>
        <h1>{item.title}</h1>
        <p>{item.description}</p>
        <p>{item.status}</p>
       </div>
    ))}</>
 
    
    </>
  )
}

export default Tickets