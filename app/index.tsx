import React, { useEffect, useState } from "react";
import { Button, TextInput } from "react-native-paper";
import getSocket from "@/clientSocket/clienteSocket";
import { router } from "expo-router";
import { View } from "react-native";

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
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View
          style={{
            gap: 10,
            backgroundColor: "white",
            elevation: 5,
            padding: 10,
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
