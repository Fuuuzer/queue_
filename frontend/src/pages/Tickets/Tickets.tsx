import React from 'react'
import instance from '../../api/api'
import { isAxiosError } from 'axios'
import styles from './Tickets.module.css'
import { useSearchParams } from 'react-router-dom'


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
  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [searchParams, setSearchParams] = useSearchParams();
   const pageFromUrl = Number(searchParams.get('page')) || 1;

  function nextPage() {
    setSearchParams(prev => {
      prev.set('page', String(pageFromUrl + 1))
      return prev
    })
  }

 function previousPage() {
    setSearchParams(prev => {
      prev.set('page', String(pageFromUrl - 1))
      return prev
    })
  }

  React.useEffect(() => {

    setError(null)
    const fetchData = async () => {
      try {
        const response = await instance.get('/tickets', {params: {page: pageFromUrl}});
        const responseData = response.data.data.data;
        const responseMeta = response.data.data.meta;
        // console.log(responseMeta)
        // console.log(responseData)

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
  }, [pageFromUrl])
  return (
    <>
    <h1><a href="">Tickets</a></h1>
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
     <button onClick={previousPage}>Anterior</button>
      <button onClick={nextPage}>Próximo</button>
    </>
  )
}

export default Tickets