import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FCX } from "react";
import styled from "styled-components";
import GeneralColorStyle from "styles/colors/GeneralColorStyle";
import { GeneralFontSize } from "styles/typography/GeneralTextStyle";
import ColorUtil from "utils/debugger/color/ColorUtil";

const CircleButtonContainer = styled.button`
  width: 80px;
  height: 80px;
  border-radius: 100000000px;
  background: ${ColorUtil.addOpacity(GeneralColorStyle.Main.Dark, 0.6)};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &:hover {
    background: ${ColorUtil.addOpacity(GeneralColorStyle.Main.Dark, 0.2)};
  }
`;

type CircleButton = {
  href: string;
  icon: IconProp;
};

const CircleButton: FCX<CircleButton> = ({ className, href, icon }) => {
  return (
    <p className={className}>
      <a href={href} target="_blank" rel="noreferrer">
        <CircleButtonContainer>
          <FontAwesomeIcon icon={icon} width={42} />
        </CircleButtonContainer>
      </a>
    </p>
  );
};

export default CircleButton;
