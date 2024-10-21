import getSocket from "@/clientSocket/clienteSocket";
import { entregasTipo } from "@/types/entregasTypes";

export function atualizarEntregas(entregaUpdate: entregasTipo) {
  const socket = getSocket();
  console.log(entregaUpdate);
  socket.emit("Atualizar Entrega", entregaUpdate);
}

export function localizarEntrega(
  entrega: entregasTipo,
  dadosMensagem: {
    contato: string;
    mensagem: string;
  }
) {
  const socket = getSocket();
  const objetoEnvio = {
    entrega,
    dadosMensagem,
  };
  socket.emit("Localizacao Entrega", objetoEnvio);
}

export function mensagemEntrega(dadosMensagem: {
  contato: string;
  mensagem: string;
}) {
  const socket = getSocket();
  socket.emit("Mensagem Chegada Cliente", dadosMensagem);
}
