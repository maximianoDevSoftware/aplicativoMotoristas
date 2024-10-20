import getSocket from "@/clientSocket/clienteSocket";
import { entregasTipo } from "@/types/entregasTypes";

export function atualizarEntregas(entregaUpdate: entregasTipo) {
  const socket = getSocket();
  socket.emit("Atualizar Entrega", entregaUpdate);
}

export function localizarEntrega() {
  const socket = getSocket();
  socket.emit("Localizar Entrega");
}

export function mensagemEntrega() {
  const socket = getSocket();
  socket.emit("Mensagem Chegada Cliente");
}
