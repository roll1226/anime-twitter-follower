import { faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FCX, useEffect, useState } from "react";
import styled, { css } from "styled-components";
import GeneralColorStyle from "styles/colors/GeneralColorStyle";
import { Spacer } from "styles/spacer/GeneralSpacerStyle";
import {
  GeneralFontSize,
  GeneralFontWeight,
  GeneralText,
} from "styles/typography/GeneralTextStyle";
import { Cours } from "types/shangriLa";
import CoursUtil from "utils/cours/CoursUtil";
import ColorUtil from "utils/debugger/color/ColorUtil";
import LoggerUtil from "utils/debugger/LoggerUtil";

const SideMenuItemsContainer = styled.div``;

const Line = styled.div<{ width: number }>`
  margin: 0 auto;
  width: ${({ width }) => width}px;
  height: 2px;
  background: ${GeneralColorStyle.Main.White};
`;

const CoursContainer = styled.div<{ isOpen: boolean }>`
  display: none;
  ${({ isOpen }) =>
    isOpen &&
    css`
      display: block;
    `}
`;

const CoursLink = styled(GeneralText)`
  cursor: pointer;
  display: block;
  width: 100%;

  &:hover {
    background: ${ColorUtil.addOpacity(GeneralColorStyle.Main.Dark, 0.6)};
  }
`;

const YearText = styled(GeneralText)`
  display: block;
  cursor: pointer;

  &:hover {
    background: ${ColorUtil.addOpacity(GeneralColorStyle.Main.Dark, 0.6)};
  }
`;

const ArrowContainer = styled.div<{ isOpen: boolean }>`
  margin: 0 auto;
  background: ${ColorUtil.addOpacity(GeneralColorStyle.Main.White, 0.1)};
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 100000px;
  cursor: pointer;

  &:hover {
    background: ${ColorUtil.addOpacity(GeneralColorStyle.Main.White, 0.2)};
  }

  ${({ isOpen }) =>
    isOpen &&
    css`
      transform: rotate(180deg);
    `}
`;

const YearLine = () => {
  return (
    <>
      <Spacer size={10} />
      <Line width={100} />
      <Spacer size={10} />
    </>
  );
};

const CoursLine = () => {
  return (
    <>
      <Spacer size={4} />
      <Line width={30} />
      <Spacer size={4} />
    </>
  );
};

type SideMenuItemsProps = {
  cours: Cours[];
  onCoursClick: (year: string, cours: string) => Promise<void>;
  coursYear: Cours[][];
  coursIndex: number;
  nowYear: number;
};

const SideMenuItems: FCX<SideMenuItemsProps> = ({
  className,
  cours,
  onCoursClick,
  coursYear,
  coursIndex,
  nowYear,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!nowYear || !cours.length) return;

    if (nowYear === cours[0].year) {
      setIsOpen(true);
    }
  }, []);

  return (
    <SideMenuItemsContainer className={className}>
      <YearText
        fontSize={GeneralFontSize.SIZE_24}
        fontWeight={GeneralFontWeight.BOLD}
        onClick={() => setIsOpen((isOpen) => !isOpen)}
      >
        {cours[0].year}
      </YearText>

      {YearLine()}

      <CoursContainer isOpen={isOpen}>
        {cours.map((cour, courIndex) => (
          <div key={courIndex}>
            <div
              onClick={() =>
                onCoursClick(String(cour.year), String(cour.cours))
              }
            >
              <CoursLink
                fontSize={GeneralFontSize.SIZE_16}
                fontWeight={GeneralFontWeight.BOLD}
              >
                {CoursUtil.string(cour.cours)}
              </CoursLink>
            </div>

            {cours.length - 1 != courIndex && CoursLine()}
          </div>
        ))}
      </CoursContainer>
      {isOpen && <Spacer size={4} />}
      <ArrowContainer
        isOpen={isOpen}
        onClick={() => setIsOpen((isOpen) => !isOpen)}
      >
        <FontAwesomeIcon icon={faAngleUp} width={20} />
      </ArrowContainer>
      {coursYear.length - 1 != coursIndex && <Spacer size={20} />}
    </SideMenuItemsContainer>
  );
};

export default SideMenuItems;
