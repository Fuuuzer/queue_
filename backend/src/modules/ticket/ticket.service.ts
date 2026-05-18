import { prisma } from "../../database/prisma";
import AppError from "../../errors/AppError";

const status = ['OPEN', 'IN_PROGRESS', 'CLOSED', 'RESOLVED'];

const transitions = {
  OPEN: ['IN_PROGRESS', 'CLOSED', 'RESOLVED'],
  IN_PROGRESS: ['CLOSED', 'RESOLVED'],
  CLOSED: [],
  RESOLVED : ['OPEN']
}as Record<string, string[]>

export const createTicket = async (data: {
  title: string;
  description: string;
}) => {
  if(!data.title || !data.description) {
    throw new AppError("Título e descrição são obrigatórios", 400);
  }
  return prisma.ticket.create({ data })
}
 
export const listTickets = ({page, status}: {page:number, status:string}) => {
  const limit = 10;
  const offset = (page - 1) * 10;
  return prisma.ticket.findMany({
    take: limit,
    skip: offset,
    orderBy: {
      createdAt: "desc"
    }
  })
}

export const updateTicketStatus = async ({ticketNumber, newStatus}: {ticketNumber: number, newStatus:string}) => {
  const ticket = await prisma.ticket.findUnique({ where: {ticketNumber} });
  if (!ticket) {
    throw new AppError('Ticket nao encontrado', 404)
  }
  const statusAtual = ticket.status as keyof typeof transitions;
  if (!transitions[statusAtual].includes(newStatus)) {
    throw new AppError('Transição de status inválida', 400)
  }
  return await prisma.ticket.update({
    where: {
      ticketNumber
    }, 
    data: {
      status: newStatus
    }
  })
}