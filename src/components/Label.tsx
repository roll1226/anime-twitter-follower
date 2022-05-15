import { FCX } from "react";
import styled from "styled-components";
import {
  GeneralFontSize,
  GeneralFontWeight,
  GeneralText,
} from "styles/typography/GeneralTextStyle";

const LabelContainer = styled.div<{ color: string }>`
  padding: 8p;
  background: ${({ color }) => color};
  width: 116px;
  border-radius: 4px;
  text-align: center;
`;

type LabelProps = {
  color: string;
  text: string;
};

const Label: FCX<LabelProps> = ({ className, color, text }) => {
  return (
    <LabelContainer color={color} className={className}>
      <GeneralText
        fontSize={GeneralFontSize.SIZE_20}
        fontWeight={GeneralFontWeight.BOLD}
      >
        {text}
      </GeneralText>
    </LabelContainer>
  );
};

export default Label;
