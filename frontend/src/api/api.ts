import axios from "axios";

const instance = axios.create({
  baseURL: 'http://localhost:3000'
});

interface TicketData {
  title: string,
  description: string
}

interface ResponseTicketApi {
  
}


instance.interceptors.response.use(
  function (response) {
    return response
  },
  function (error) {
    if(error.response?.status === 401){
      window.dispatchEvent(new CustomEvent('auth:expired'))
    }
    return Promise.reject(error)
  }
)

instance.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem('token')
    if(token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  function (err) {
    return Promise.reject(err)
  }
)

export const CreateTicket = async (ticketData: TicketData) => {
  const response = await instance.post<>
}

export default instance