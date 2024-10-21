import { entregasTipo } from "@/types/entregasTypes";
import * as React from "react";
import { Text, View } from "react-native";
import { Button, List } from "react-native-paper";
import {
  atualizarEntregas,
  localizarEntrega,
  mensagemEntrega,
} from "./entregasHooks";

const EntregasAndamento = ({
  entregasLista,
}: {
  entregasLista: entregasTipo[] | null;
}) => {
  const [expanded, setExpanded] = React.useState<string | null>(null);

  const handlePress = (id: string) => {
    setExpanded(expanded === id ? null : id);
  };

  const enviarMensagem = async () => {
    const mensagem = `
      Sua entrega chegou!
    `;

    const contato = "554187280741";
    const dadosMensagem = {
      contato,
      mensagem,
    };
    mensagemEntrega(dadosMensagem);
  };

  const enviarLocalizacao = async (entrega: entregasTipo) => {
    const dadosMensagem = {
      contato: "554187280741",
      mensagem: "",
    };
    localizarEntrega(entrega, dadosMensagem);
  };

  React.useEffect(() => {
    console.log(entregasLista);
  }, [entregasLista]);

  return (
    <List.Accordion
      title="Entregas em Andamento"
      description="Todas as entregas em andamento"
      style={{
        width: 300,
      }}
      titleStyle={{ fontSize: 20 }}
    >
      {entregasLista?.map((cadaEntrega) => {
        const isExpanded = expanded === cadaEntrega.nome;

        if (cadaEntrega.status === "Andamento") {
          return (
            <List.Accordion
              key={cadaEntrega.nome}
              title={cadaEntrega.nome}
              style={{
                maxWidth: 300,
                backgroundColor: isExpanded ? "#22333b" : "white",
              }}
              titleStyle={{
                color: isExpanded ? "white" : "black",
              }}
              expanded={isExpanded}
              onPress={() => handlePress(cadaEntrega.nome)}
              titleNumberOfLines={4}
            >
              <List.Item
                title={
                  <View>
                    <Text style={{ color: "white" }}>
                      Entregador: {cadaEntrega.entregador}
                    </Text>
                    <Text style={{ color: "white" }}>
                      Bairro: {cadaEntrega.bairro}
                    </Text>
                    <Text style={{ color: "white" }}>
                      Rua: {cadaEntrega.rua}
                    </Text>
                    <Text style={{ color: "white" }}>
                      Número: {cadaEntrega.numero}
                    </Text>
                    <Text style={{ color: "white" }}>
                      Valor: {cadaEntrega.valor}
                    </Text>
                    <Text style={{ color: "white" }}>
                      Volume: {cadaEntrega.volume}
                    </Text>
                    <Text style={{ color: "white" }}>
                      Pagameto: {cadaEntrega.pagamento}
                    </Text>
                  </View>
                }
                style={{ backgroundColor: "#22333b" }}
              />
              <List.Item
                style={{
                  backgroundColor: "#22333b",
                }}
                title={
                  <View style={{ gap: 10 }}>
                    <Button
                      mode="contained"
                      style={{ width: 260 }}
                      onPress={() => {
                        enviarLocalizacao(cadaEntrega);
                      }}
                    >
                      Localização da Entrega
                    </Button>

                    <Button
                      mode="contained"
                      style={{ width: 260 }}
                      onPress={() => {
                        enviarMensagem();
                      }}
                    >
                      Mensagem para o Cliente
                    </Button>

                    <Button
                      mode="contained"
                      style={{ width: 260 }}
                      onPress={() => {
                        let entregaUpdate = cadaEntrega;
                        entregaUpdate.status = "Disponível";
                        atualizarEntregas(entregaUpdate);
                      }}
                    >
                      Disponibilizar Entrega
                    </Button>

                    <Button
                      mode="contained"
                      style={{ width: 260 }}
                      onPress={() => {
                        let entregaUpdate = cadaEntrega;
                        entregaUpdate.status = "Concluída";
                        atualizarEntregas(entregaUpdate);
                      }}
                    >
                      Confirmar Entrega
                    </Button>
                  </View>
                }
              />
            </List.Accordion>
          );
        }
      })}
    </List.Accordion>
  );
};

export default EntregasAndamento;
