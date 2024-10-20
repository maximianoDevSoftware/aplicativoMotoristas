import { entregasTipo } from "@/types/entregasTypes";
import * as React from "react";
import { Text, View } from "react-native";
import { Button, List } from "react-native-paper";

const EntregasAndamento = ({
  entregasLista,
}: {
  entregasLista: entregasTipo[] | null;
}) => {
  const [expanded, setExpanded] = React.useState<string | null>(null);

  const handlePress = (id: string) => {
    setExpanded(expanded === id ? null : id);
  };

  return (
    <List.Accordion
      title="Entregas em Andamento"
      description="Todas as entregas em andamento"
      style={{
        width: 300,
      }}
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
                titleStyle={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
                style={{
                  backgroundColor: "#22333b",
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center",
                }}
                title={
                  <View
                    style={{
                      flex: 1,
                      justifyContent: "center",
                      gap: 10,
                      alignItems: "center",
                    }}
                  >
                    <Button
                      mode="contained"
                      style={{ width: 260, marginBottom: 20 }}
                    >
                      Localização da Entrega
                    </Button>

                    <Button mode="contained" style={{ width: 260 }}>
                      Mensagem para o Cliente
                    </Button>

                    <Button mode="contained" style={{ width: 260 }}>
                      Disponibilizar Entrega
                    </Button>

                    <Button mode="contained" style={{ width: 260 }}>
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
