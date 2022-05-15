import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faHouseChimney } from "@fortawesome/free-solid-svg-icons";
import LineChart from "components/LineChart";
import CircleButton from "components/CircleButton";
import Label from "components/Label";
import { useRouter } from "next/router";
import React, { FC, FCX, useEffect, useState } from "react";
import styled from "styled-components";
import GeneralColorStyle from "styles/colors/GeneralColorStyle";
import { Spacer } from "styles/spacer/GeneralSpacerStyle";
import {
  GeneralFontSize,
  GeneralFontWeight,
  GeneralText,
} from "styles/typography/GeneralTextStyle";
import LoggerUtil from "utils/debugger/LoggerUtil";
import ShangriLaUtil from "utils/lib/ShangriLa/ShangriLaUtil";
import ColorUtil from "utils/debugger/color/ColorUtil";
import Image from "next/image";
import HeadClient from "components/Head";
import { NextPage } from "next";

const AnimeDetailContainer = styled.div``;

const AnimeImage = styled.img`
  width: 100vw;
  display: block;
`;

const AnimeDataContainer = styled.div`
  padding: 32px 80px 92px;
  background: ${GeneralColorStyle.Main.LightDark};
  border-radius: 0 0 33px 33px;
  display: flex;
  flex-direction: column;
`;

const AnimeTitle = styled(GeneralText)`
  line-height: 4rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 0 16px;
`;

const LabelContainer = styled.div`
  display: flex;
  gap: 0 12px;
`;

const NoImage = styled.div`
  padding: 12px;
  width: 100%;
  height: 70vh;
  border-radius: 4px;
  background: ${ColorUtil.addOpacity(GeneralColorStyle.Main.White, 0.1)};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 8px 0;
`;

const AnimeDetail: NextPage = () => {
  const router = useRouter();
  const { year, cours, id } = router.query;
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [titleEn, setTitleEn] = useState("");
  const [sex, setSex] = useState(0);
  const [sequel, setSequel] = useState(0);
  const [publicUrl, setPublicUrl] = useState("");
  const [twitterAccount, setTwitterAccount] = useState("");
  const [productCompanies, setProductCompanies] = useState("");

  const [isData, setIsData] = useState(true);
  const [isErrorImage, setIsErrorImage] = useState(false);

  useEffect(() => {
    if (!year || !cours) return;

    const fetchAnime = async (year: string, cours: string) => {
      const animes = await ShangriLaUtil.fetchYearAndCours(year, cours);
      const anime = animes.filter((anime) => {
        return anime.id == Number(id);
      });

      if (anime.length == 0) return setIsData(false);

      const animeData = anime[0];

      setImage(animeData.ogp.og_image);
      setTitle(animeData.title);
      setTitleEn(animeData.title_en);
      setSex(animeData.sex);
      setSequel(animeData.sequel);
      setPublicUrl(animeData.public_url);
      setTwitterAccount(animeData.twitter_account);
      setProductCompanies(animeData.product_companies);
      LoggerUtil.debug(animeData);
    };

    fetchAnime(String(year), String(cours));
  }, [year, cours]);

  return (
    <AnimeDetailContainer>
      <HeadClient
        title={`${title} | アニメ情報サイト`}
        description={"アニメ情報サイト"}
        keyword={"アニメ Twitter ツイッター 今期"}
        url={"/"}
        top={false}
      />

      {image && !isErrorImage && (
        <AnimeImage
          src={image}
          alt={title}
          onError={(e) => setIsErrorImage(true)}
        />
      )}

      {(!image || isErrorImage) && (
        <NoImage>
          <Image
            src="/20200502_noimage.svg"
            width={170 * 0.8}
            height={159.4 * 0.8}
            alt="no image"
          />
        </NoImage>
      )}

      <AnimeDataContainer>
        <ButtonContainer>
          <CircleButton href={publicUrl} icon={faHouseChimney} />

          <CircleButton
            href={`https://twitter.com/${twitterAccount}`}
            icon={faTwitter}
          />
        </ButtonContainer>

        <Spacer size={24} />

        <LabelContainer>
          <Label
            color={
              sequel === 0
                ? GeneralColorStyle.Label.New
                : GeneralColorStyle.Label.Sequel
            }
            text={sequel === 0 ? "新作アニメ" : "続編アニメ"}
          />
          <Label
            color={
              sex === 0
                ? GeneralColorStyle.Label.Man
                : GeneralColorStyle.Label.Woman
            }
            text={sex === 0 ? "男性向け" : "女性向け"}
          />
        </LabelContainer>

        <Spacer size={4} />

        <GeneralText fontSize={GeneralFontSize.SIZE_20}>
          制作会社: {productCompanies}
        </GeneralText>
        <Spacer size={10} />
        <AnimeTitle
          fontSize={GeneralFontSize.SIZE_60}
          fontWeight={GeneralFontWeight.BOLD}
        >
          {title}
        </AnimeTitle>
        <GeneralText
          fontSize={GeneralFontSize.SIZE_28}
          fontWeight={GeneralFontWeight.BOLD}
        >
          {titleEn}
        </GeneralText>
      </AnimeDataContainer>

      <Spacer size={60} />
      <LineChart
        year={String(year)}
        cours={String(cours)}
        animeId={String(id)}
      />
      <Spacer size={120} />
    </AnimeDetailContainer>
  );
};

export default AnimeDetail;
