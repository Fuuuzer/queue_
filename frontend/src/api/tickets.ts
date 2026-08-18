import instance from "./api";

interface NewTicket {
  title: string;
  description: string;
}

interface ResponseTicketApi {
  success: boolean;
  data: NewTicket;
  message: string
}

export const createTicket = async (ticketData: NewTicket) => {
  const response = await instance.post<ResponseTicketApi>('/tickets', ticketData)
  console.log(response)
}

