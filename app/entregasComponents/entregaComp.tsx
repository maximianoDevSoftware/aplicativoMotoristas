import { entregasTipo } from "@/types/entregasTypes";
import * as React from "react";
import { Text, View } from "react-native";
import { Button, List } from "react-native-paper";
import { atualizarEntregas } from "./entregasHooks";

const EntregasDia = ({
  entregasLista,
}: {
  entregasLista: entregasTipo[] | null;
}) => {
  const [expanded, setExpanded] = React.useState<string | null>(null);

  const handlePress = (id: string) => {
    setExpanded(expanded === id ? null : id);
  };

  React.useEffect(() => {}, [entregasLista]);

  return (
    <List.Accordion
      title="Entregas Disponíveis"
      description="Todas as entregas disponíveis no dia"
      style={{ width: 300 }}
      titleStyle={{ fontSize: 20 }}
    >
      {entregasLista?.map((cadaEntrega) => {
        const isExpanded = expanded === cadaEntrega.nome;
        if (cadaEntrega.status === "Disponível") {
          return (
            <List.Accordion
              key={cadaEntrega.nome}
              title={cadaEntrega.nome}
              style={{
                width: 300,
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
                }}
                title={
                  <Button
                    mode="contained"
                    style={{ width: 260 }}
                    onPress={() => {
                      let entregaUpdate = cadaEntrega;
                      entregaUpdate.status = "Andamento";
                      atualizarEntregas(entregaUpdate);
                    }}
                  >
                    Iniciar Entrega
                  </Button>
                }
              />
            </List.Accordion>
          );
        }
      })}
    </List.Accordion>
  );
};

export default EntregasDia;
