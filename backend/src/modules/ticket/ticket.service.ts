import { prisma } from "../../database/prisma";
import AppError from "../../errors/AppError";

const transitions = {
  OPEN: ['IN_PROGRESS', 'CLOSED', 'RESOLVED'],
  IN_PROGRESS: ['CLOSED', 'RESOLVED'],
  CLOSED: [],
  RESOLVED : ['OPEN']
}as Record<string, string[]>

type Status = keyof typeof transitions; //transforma status = OPEN | IN_PROGRESS | CLOSED | RESOLVED 

export const createTicket = async (data: {
  title: string;
  description: string;
  userId: string;
}) => {
  let nextNumber = 1;
      if(!data.title || !data.description) {
      throw new AppError("Título e descrição são obrigatórios", 400);
    }
    const biggestTicketNumber = await prisma.ticket.findFirst({
      orderBy: { ticketNumber: "desc"},
    })
    if(biggestTicketNumber) {
      nextNumber = biggestTicketNumber.ticketNumber + 1;
    }
    return prisma.ticket.create({ data: {
      title: data.title,
      description: data.description,
      ticketNumber: nextNumber,
      userId: data.userId
    } })
}   

export const listTickets = ({page, status, ticketNumber, userId, userRole}: {page:number, status?:string, ticketNumber?:number, userId: string, userRole: UserRole}) => {
  const limit = 10;
  const offset = (page - 1) * 10;
  const where: Record<string, any> = {};
  if(userRole === 'USER'){
    where.userId = userId
  }
  if(status) where.status = status;
  if(ticketNumber) where.ticketNumber = ticketNumber;
  return prisma.ticket.findMany({
    take: limit,
    skip: offset,
    orderBy: {
      createdAt: "asc"
    },
    where: where
  })
}

export const deleteUnique = async ({ticketNumber, userRole}:{ticketNumber:number, userRole:UserRole}) => {
  if(userRole !== 'ADMIN') throw new AppError('Você não possui autorização necessária para fazer isso', 403)
  const hasTicket = await prisma.ticket.findUnique({
    where:{ticketNumber}
  })
   if(!hasTicket) throw new AppError('Ticket nao encontrado', 404)
  const ticket = await prisma.ticket.delete({
    where : {ticketNumber}
  });
  return ticket
}

export const updateTicketStatus = async ({ticketNumber, newStatus, userRole}: {ticketNumber: number, newStatus:Status, userRole:UserRole}) => {
  if(userRole === 'USER') throw new AppError('Você não possui autorização necessária para fazer isso', 403);
  const ticket = await prisma.ticket.findUnique({ where: {ticketNumber} });
  if (!ticket) {
    throw new AppError('Ticket nao encontrado', 404);
  };
  const statusAtual = ticket.status as keyof typeof transitions; //garante que o valor recebido eh valido
  if (!transitions[statusAtual].includes(newStatus)) {
    throw new AppError('Transição de status inválida', 400);
  };
  const oldStatus = statusAtual;
  await prisma.$transaction(async (tx) => {
    await tx.ticket.update({
    where: { ticketNumber },
    data: { status: newStatus }
    });

    await tx.ticketHistory.create({
    data: {
      ticketId: ticket.id,
      from: oldStatus,
      to: newStatus
    }
    });
  });
  // console.log("Ticket vindo do banco:", ticket);
  // console.log("Status atual:", ticket.status);
  // console.log("Novo status:", newStatus);
  }