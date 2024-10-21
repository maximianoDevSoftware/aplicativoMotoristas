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

let inicializador = false;

const LocationComponent = () => {
  const [location, setLocation] =
    useState<Location.LocationObjectCoords | null>(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location.coords);
    })();
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
  const { userName } = useLocalSearchParams();
  const [entregasDoDia, setEntregasDoDia] = useState<entregasTipo[] | null>(
    null
  );

  const socket = getSocket();

  const buscarEntregas = () => {
    console.log("Buscar entregas está sendo chamada");
    socket.emit("Buscar Entregas", (todasEntregas: entregasTipo[]) => {
      console.log(todasEntregas);
      setEntregasDoDia(todasEntregas);
    });
  };

  useEffect(() => {
    if (!inicializador) {
      inicializador = true;
      buscarEntregas();
    }
    socket.on("Entregas Atualizadas", (todasEntregas) => {
      setEntregasDoDia(todasEntregas);
    });

    return () => {
      socket.off("Entregas Atualizadas");
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
          Bem-vindo, {userName}!
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
      {LocationComponent()}
    </ScrollView>
  );
}
