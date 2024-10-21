import React, { useEffect, useState } from "react";
import { Button, TextInput } from "react-native-paper";
import getSocket from "@/clientSocket/clienteSocket";
import { router } from "expo-router";
import { View } from "react-native";
import { black } from "react-native-paper/lib/typescript/styles/themes/v2/colors";

const Form = () => {
  const [userName, setUserName] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false); // Estado para loading
  let socket = getSocket();

  const autenticarUsuario = () => {
    setLoading(true); // Ativando o loading
    console.log(userName);
    socket.emit("Autenticar Usuario", { userName, senha });
  };

  /***Processos de localização de rotas */
  useEffect(() => {
    socket.on("Usuario Autenticado", (usuarioAuth) => {
      console.log("Um usuário foi conectado pelo cliente");
      setLoading(true);
      console.log(usuarioAuth);
      setTimeout(() => {
        router.push({
          pathname: "/usuario",
          params: { userName: usuarioAuth.userName },
        });
        setLoading(false); // Desativando o loading
      }, 3000);
    });
    return () => {
      socket.off("Usuario Autenticado");
    };
  }, []);

  return (
    <>
      <View
        style={{
          width: "100%",
          height: "100%",
          position: "relative",
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#153a64",
        }}
      >
        <View
          style={{
            gap: 10,
            backgroundColor: "white",
            padding: 10,
            width: 300,
            height: 200,
            position: "relative",
          }}
        >
          <TextInput
            label="Nome do usuário:"
            value={userName}
            onChangeText={(text) => setUserName(text)}
          />
          <TextInput
            label="Senha"
            secureTextEntry
            value={senha}
            right={<TextInput.Icon icon="eye" />}
            onChangeText={(text) => setSenha(text)}
          />
          <Button
            style={{ width: 250, marginHorizontal: "auto" }}
            mode="contained"
            onPress={autenticarUsuario} // Desativando onPress se estiver carregando
            loading={loading} // Estado de loading no botão
          >
            Autenticar Usuário
          </Button>
        </View>
      </View>
    </>
  );
};

export default Form;
