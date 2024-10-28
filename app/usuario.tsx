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
import * as locExpo from "expo-location";
import * as TaskManager from "expo-task-manager";
import PermissionsButton from "./entregasComponents/localizaComponent";
import LocationComponent from "./entregasComponents/localizaComponent";

let inicializador = false;
const socket = getSocket();

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
      {LocationComponent()}
      <PermissionsButton></PermissionsButton>
    </ScrollView>
  );
}
