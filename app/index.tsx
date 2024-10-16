// Componente Formulário
import React, { useEffect, useRef, useState } from "react";
import {
  Container,
  Label,
  Input,
  StyledButton,
  ButtonText,
  ContainerFormulario,
  CirculoLoading250,
  BolaLoading,
} from "./estiloIndex";
import getSocket from "@/clientSocket/clienteSocket";
import anime from "animejs";
import { Text } from "react-native";

const Form = () => {
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const [buttonActive, setButtonActive] = useState(false);

  const [estadoPagina, setEstadoPagina] = useState("Carregando");
  const loadingCircle = useRef(null);
  const loadingCircle2 = useRef(null);
  const loadingCircle3 = useRef(null);

  let socket = getSocket();

  const handleSubmit = () => {
    setButtonActive(true);
    setTimeout(() => setButtonActive(false), 2000);
    setEstadoPagina("Carregando");
    socket.emit("Autenticar Usuario", { usuario, senha });
  };

  /***Processos de localização de rotas */
  useEffect(() => {
    socket.on("Usuario Autenticado", (usuarioAuth) => {
      console.log("Um usuário foi conectado pelo cliente");
      console.log(usuarioAuth);
    });
    return () => {
      socket.off("Usuario Autenticado");
    };
  }, []);

  /**Processos de animações em elementos */
  useEffect(() => {
    anime({
      targets: [
        loadingCircle.current,
        loadingCircle2.current,
        loadingCircle3.current,
      ],
      rotate: "1turn",
      duration: 10000,
      loop: true,
      easing: "linear",
    });
  }, []);

  return (
    <>
      {estadoPagina === "Disponível" && (
        <Container>
          <ContainerFormulario>
            <Label>Usuario:</Label>

            <Input value={usuario} onChangeText={setUsuario} />
            <Label>Senha:</Label>
            <Input value={senha} onChangeText={setSenha} />
            <StyledButton
              active={buttonActive}
              onPress={handleSubmit}
            ></StyledButton>
          </ContainerFormulario>
        </Container>
      )}

      {estadoPagina === "Carregando" && (
        <Container>
          <CirculoLoading250 ref={loadingCircle}>
            <BolaLoading></BolaLoading>
          </CirculoLoading250>
          <CirculoLoading250 ref={loadingCircle2}>
            <BolaLoading></BolaLoading>
          </CirculoLoading250>
          <CirculoLoading250 ref={loadingCircle3}>
            <BolaLoading></BolaLoading>
          </CirculoLoading250>
        </Container>
      )}
    </>
  );
};

export default Form;
