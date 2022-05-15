import AnimeCard from "components/AnimeCard";
import HeadClient from "components/Head";
import SideMenu from "components/SideMenu";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { Spacer } from "styles/spacer/GeneralSpacerStyle";
import {
  GeneralFontSize,
  GeneralText,
} from "styles/typography/GeneralTextStyle";
import { Anime } from "types/shangriLa";
import CoursUtil from "utils/cours/CoursUtil";
import LoggerUtil from "utils/debugger/LoggerUtil";
import ShangriLaUtil from "utils/lib/ShangriLa/ShangriLaUtil";

const HomeContainer = styled.div`
  padding: 80px 0;
  display: flex;
  justify-content: center;
  gap: 0 40px;
`;

const AnimeCardsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 20px;
`;

const Home: NextPage = () => {
  const [animes, setAnimes] = useState<Anime[]>([]);
  const [year, setYear] = useState("");
  const [cours, setCounrts] = useState("");

  useEffect(() => {
    fetchAnimes("2022", "2");
  }, []);

  const fetchAnimes = async (year: string, cours: string) => {
    LoggerUtil.debug(year, cours);
    const animesJson = await ShangriLaUtil.fetchYearAndCours(year, cours);
    setAnimes(animesJson);
    setYear(year);
    setCounrts(cours);
  };

  return (
    <HomeContainer>
      <HeadClient
        title={"アニメ情報サイト"}
        description={"アニメ情報サイト"}
        keyword={"アニメ Twitter ツイッター 今期"}
        url={"/"}
        top={false}
      />

      <SideMenu onCoursClick={fetchAnimes} />

      <div>
        <div>
          <GeneralText fontSize={GeneralFontSize.SIZE_32}>{year}</GeneralText>
          <Spacer size={10} horizontal={true} />
          <GeneralText fontSize={GeneralFontSize.SIZE_20}>
            {CoursUtil.string(Number(cours))}
          </GeneralText>
        </div>

        <Spacer size={4} />

        <AnimeCardsContainer>
          {animes.map((anime, animeIndex) => (
            <div key={animeIndex}>
              <AnimeCard
                src={anime.ogp.og_image}
                title={anime.title}
                animeId={anime.id}
                year={year}
                cours={cours}
              />
            </div>
          ))}
        </AnimeCardsContainer>
      </div>
    </HomeContainer>
  );
};

export default Home;
