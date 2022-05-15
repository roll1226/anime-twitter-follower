import Link from "next/link";
import { FCX, useEffect, useState } from "react";
import styled from "styled-components";
import GeneralColorStyle from "styles/colors/GeneralColorStyle";
import { Spacer } from "styles/spacer/GeneralSpacerStyle";
import {
  GeneralFontSize,
  GeneralFontWeight,
  GeneralText,
  GeneralTextParagraph,
} from "styles/typography/GeneralTextStyle";
import { Cours } from "types/shangriLa";
import CoursUtil from "utils/cours/CoursUtil";
import ColorUtil from "utils/debugger/color/ColorUtil";
import ShangriLaUtil from "utils/lib/ShangriLa/ShangriLaUtil";

const SideMenuContainer = styled.div`
  padding: 20px;
  background: ${GeneralColorStyle.Main.LightDark};
  border-radius: 20px;
  width: 162px;
  height: fit-content;
  text-align: center;
`;

const Line = styled.div<{ width: number }>`
  margin: 0 auto;
  width: ${({ width }) => width}px;
  height: 2px;
  background: ${GeneralColorStyle.Main.White};
`;

const CoursLink = styled(GeneralText)`
  cursor: pointer;
  display: block;
  width: 100%;

  &:hover {
    background: ${ColorUtil.addOpacity(GeneralColorStyle.Main.Dark, 0.6)};
  }
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

const YearSpace = (size: number) => {
  return <Spacer size={size} />;
};

type SideMenuProps = {
  onCoursClick: (year: string, cours: string) => Promise<void>;
};

const SideMenu: FCX<SideMenuProps> = ({ className, onCoursClick }) => {
  const [coursYear, setCoursYear] = useState<Cours[][]>([]);

  useEffect(() => {
    const fetchCours = async () => {
      const coursJson = await ShangriLaUtil.fetchCours();
      setCoursYear(coursJson);
    };

    fetchCours();
  });

  return (
    <SideMenuContainer className={className}>
      {coursYear.map((cours, coursIndex) => (
        <div key={coursIndex}>
          <GeneralText
            fontSize={GeneralFontSize.SIZE_24}
            fontWeight={GeneralFontWeight.BOLD}
          >
            {cours[0].year}
          </GeneralText>

          {YearLine()}

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
              {cours.length - 1 == courIndex &&
                coursYear.length - 1 != coursIndex &&
                YearSpace(20)}
            </div>
          ))}
        </div>
      ))}
    </SideMenuContainer>
  );
};

export default SideMenu;
