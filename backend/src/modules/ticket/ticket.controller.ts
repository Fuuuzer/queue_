import { createTicket, deleteUnique, listTickets, updateTicketStatus } from "./ticket.service"
import { Request, Response } from "express";


export const create = async(
  req: Request,
  res:  Response
) => {
  const ticket = await createTicket({
    title: req.body.title,
    description: req.body.description,
    user: req.user.sub
  });
  res.status(201)
  .json({
    success: true, 
    data: ticket,
    message: 'ticket criado com sucesso'
  });
}

export const list = async(
  req: Request,
  res:  Response
) => {
  const pageQuery = req.query.page;
  const page = Number(pageQuery) || 1;
  const status = req.query.status as string;
  const ticketQueryNumber = req.query.ticketNumber
  const ticketNumber = ticketQueryNumber ? Number(ticketQueryNumber) : undefined;

  const tickets = await listTickets({page, status, ticketNumber});
  res.status(200).json({
    success: true,
    data: tickets,
    message: 'Listando tickets'
  })
}

export const update = async(
   req: Request,
    res:  Response
) => {
  const ticketNumber = Number(req.params.id);
  const newStatus = req.body.status as string;
  const ticket = await updateTicketStatus({ticketNumber, newStatus});
  res.status(200).json({
    success: true,
    data: ticket,
    message: 'Status do ticket atualizado'
  })
}

export const remove = async(
  req: Request,
  res:  Response
) => {
const ticketNumber = Number(req.params.id);
 const ticket = await deleteUnique({ticketNumber})
 res.status(200).json({
  success: true,
  data:ticket,
  message: 'Ticket Deletado',
 })
}