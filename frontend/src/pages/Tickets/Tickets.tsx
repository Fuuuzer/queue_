import React from 'react'
import instance from '../../api/api'

const Tickets = () => {
  const [tickets, setTickets] = React.useState<[]>([])
  const [error, setError] = React.useState<string>('');
  

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token')
        const response = await instance.get('/tickets', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        console.log(response.data)
        setTickets(response.data)
      } catch (err) {
        setError(err.message || 'Something went wrong');
      }
    }
    fetchData()
  }, [])
  return (
    <>
    
    {error}
    <h1>Tickets</h1>
    {tickets.map(item => (
      <li key={item.title}>{item.name}</li>
      
    ))}
    
    </>
  )
}

export default Tickets