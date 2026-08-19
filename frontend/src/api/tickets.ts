import instance from "./api";

interface NewTicket {
  title: string;
  description: string;
}

interface TicketPayload {
  title: string;
  description: string;
  ticketNumber: number;
  userId: string
}

interface ResponseTicketApi {
  success: boolean;
  data: TicketPayload;
  message: string
}

export const createTicket = async (ticketData: NewTicket) => {
  const response = await instance.post<ResponseTicketApi>('/tickets', ticketData)
  const apiResponse = response.data
  return apiResponse
}

