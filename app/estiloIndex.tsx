// Form.styles.js
import styled from "styled-components/native";
import anime from "animejs";
import { forwardRef } from "react";
import { View, ViewProps } from "react-native";

export const Container = styled.View`
  padding: 10px;
  width: 100dvw;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ContainerFormulario = styled.View`
  width: 300px;
  border: 2px solid gray;
  padding: 20px;
  border-radius: 20px;
  background-color: white;
  elevation: 5;
`;

export const Label = styled.Text`
  font-size: 16px;
  margin-bottom: 5px;
  text-align: center;
`;

export const Input = styled.TextInput`
  border: 1px solid gray;
  padding: 10px;
  margin-bottom: 10px;
`;

interface ButtonProps {
  active: boolean;
}

export const StyledButton = styled.Pressable<ButtonProps>`
  background-color: ${(props) => (props.active ? "black" : "#6200ee")};
  padding: 10px;
  align-items: center;
  margin-top: 10px;
`;

export const ButtonText = styled.Text`
  color: white;
  font-size: 16px;
`;

export const CirculoLoading250 = styled(View)`
  width: 250px;
  height: 250px;
  border-radius: 125px; /* Metade do diâmetro */
  background-color: white; /* Cor do círculo */
  position: absolute;
  display: flex;
  background-color: red;
  align-items: center;
  justify-content: center;
`;

interface CirculoLoading250Props extends ViewProps {}

export const TestandoSamerda = forwardRef<View, CirculoLoading250Props>(
  (props, ref) => {
    return <CirculoLoading250 ref={ref} {...props} />;
  }
);

export const BolaLoading = styled.View`
  background-color: blue;
  width: 50px;
  height: 50px;
  border-radius: 50px;
  bottom: 0;
  right: 0;
  position: absolute;
`;
