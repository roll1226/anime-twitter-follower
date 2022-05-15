import { ReactElement } from "react";
import styled from "styled-components";
import GeneralColorStyle from "styles/colors/GeneralColorStyle";

const MainLayoutContainer = styled.div`
  width: 100vw;
  min-height: 100vh;
  background: ${GeneralColorStyle.Main.Dark};
  color: ${GeneralColorStyle.Text.White};
`;

type LayoutProps = Required<{
  readonly children: ReactElement;
}>;

export const MainLayout = ({ children }: LayoutProps) => (
  <MainLayoutContainer>{children}</MainLayoutContainer>
);
