import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import * as Location from "expo-location";
import { Avatar } from "react-native-paper";
import getSocket from "@/clientSocket/clienteSocket";
import { entregasTipo } from "@/types/entregasTypes";
import EntregasDia from "./entregasComponents/entregaComp";
import EntregasAndamento from "./entregasComponents/entregaAndamento";
import { ScrollView } from "react-native";
import { usuarioTipo } from "@/types/userTypes";

let inicializador = false;
const socket = getSocket();

const LocationComponent = (usuarioLogado: usuarioTipo) => {
  const [location, setLocation] =
    useState<Location.LocationObjectCoords | null>(null);

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;

    const getLocation = async () => {
      console.log("Pegando localização");
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location.coords);

      /**Verificando se o usuário está logado, então eu consigo atualizar os valores de suas cooredenadas e repassar ao usuario */
      if (usuarioLogado) {
        console.log(usuarioLogado.localizacao.latitude);
        usuarioLogado.localizacao.latitude = location.coords.latitude;
        console.log(usuarioLogado.localizacao.latitude);
        usuarioLogado.localizacao.longitude = location.coords.longitude;

        socket.emit("Localizar Entregador", usuarioLogado);
      }
    };
    getLocation(); // Fetch initial location
    interval = setInterval(getLocation, 5000); // Fetch location every 30 seconds

    return () => {
      if (interval) clearInterval(interval); // Clean up on unmount
    };
  }, []);

  return (
    <View>
      {location ? (
        <Text style={{ textAlign: "center" }}>
          Latitude: {location.latitude}, Longitude: {location.longitude}
        </Text>
      ) : (
        <Text>Obtendo localização...</Text>
      )}
    </View>
  );
};

export default function UserScreen() {
  const usuarioRecebidoRota = useLocalSearchParams<{ [key: string]: string }>();
  const usuarioAuth: usuarioTipo = {
    userName: usuarioRecebidoRota.userName,
    status: usuarioRecebidoRota.status,
    localizacao: JSON.parse(usuarioRecebidoRota.localizacao || "{}"), // Parseando de volta para objeto
    senha: usuarioRecebidoRota.senha,
  };
  const [entregasDoDia, setEntregasDoDia] = useState<entregasTipo[] | null>(
    null
  );

  const buscarEntregas = () => {
    console.log("Buscar entregas está sendo chamada");
    socket.emit("Buscar Entregas");
  };

  useEffect(() => {
    if (!inicializador) {
      inicializador = true;
      buscarEntregas();
    }
    socket.on("Atualizando entregas", (todasEntregas) => {
      setEntregasDoDia(todasEntregas);
    });

    return () => {
      socket.off("Entregas Atualizadas");
      socket.off("Atualizando entregas");
    };
  }, []);

  return (
    <ScrollView
      style={{ width: "100%", height: "100%", backgroundColor: "white" }}
    >
      <View style={{ width: "100%", flex: 1, alignItems: "center" }}>
        <Avatar.Image
          size={200}
          style={{
            backgroundColor: "white",
            borderColor: "black",
            borderWidth: 2,
            marginBottom: 10,
          }}
          source={require("../assets/logo.png")}
        />
        <Text style={{ fontSize: 25, marginBottom: 30 }}>
          Bem-vindo, {usuarioAuth.userName}!
        </Text>
        <View
          style={{ borderWidth: 2, borderColor: "black", borderRadius: 20 }}
        >
          <EntregasDia entregasLista={entregasDoDia}></EntregasDia>
        </View>
        <View
          style={{
            borderWidth: 2,
            borderColor: "black",
            borderRadius: 20,
            marginTop: 30,
          }}
        >
          <EntregasAndamento entregasLista={entregasDoDia}></EntregasAndamento>
        </View>
      </View>
      {LocationComponent(usuarioAuth)}
    </ScrollView>
  );
}
