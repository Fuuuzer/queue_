import axios from "axios";

const instance = axios.create({
  baseURL: 'http://localhost:3000'
});

interface TicketPayload {
  title: string,
  description: string;
}

interface TicketResponseData {
  createdAt: string;
  description: string;
  id: string;
  priority: "LOW" | "MEDIUM" | 'CRITICAL';
  status: 'OPEN' | 'IN_PROGRESS' | 'RESOLVED' | 'CLOSED';
  updatedAt: string;
  userId: string;
  ticketNumber: number;
  title: string,
}

interface TicketResponseAPI {
  success: boolean;
  data: TicketResponseData;
  message: string;
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

export const createTicket = async (ticketFormData: TicketPayload) => {
  const response = await instance.post<TicketResponseAPI>('/tickets', ticketFormData);
  const {data: ticketData, message: ticketMessage} = response.data;

  return {data: ticketData, message: ticketMessage}
}

export default instance