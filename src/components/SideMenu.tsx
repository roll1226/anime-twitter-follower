import { FCX, useEffect, useState } from "react";
import styled from "styled-components";
import GeneralColorStyle from "styles/colors/GeneralColorStyle";
import { Cours } from "types/shangriLa";
import ShangriLaUtil from "utils/lib/ShangriLa/ShangriLaUtil";
import SideMenuItems from "./SideMenuItems";

const SideMenuContainer = styled.div`
  padding: 20px;
  background: ${GeneralColorStyle.Main.LightDark};
  border-radius: 20px;
  width: 162px;
  height: fit-content;
  text-align: center;
`;
type SideMenuProps = {
  onCoursClick: (year: string, cours: string) => Promise<void>;
  nowYear: number;
};

const SideMenu: FCX<SideMenuProps> = ({ className, onCoursClick, nowYear }) => {
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
          <SideMenuItems
            cours={cours}
            onCoursClick={onCoursClick}
            coursYear={coursYear}
            coursIndex={coursIndex}
            nowYear={nowYear}
          />
        </div>
      ))}
    </SideMenuContainer>
  );
};

export default SideMenu;
