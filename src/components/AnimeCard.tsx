import Image from "next/image";
import Link from "next/link";
import { FCX, useEffect, useState } from "react";
import styled from "styled-components";
import GeneralColorStyle from "styles/colors/GeneralColorStyle";
import {
  GeneralFontSize,
  GeneralText,
} from "styles/typography/GeneralTextStyle";
import ColorUtil from "utils/debugger/color/ColorUtil";
import { Img } from "react-image";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const AnimeCardContainer = styled.div`
  width: 267px;
  border-radius: 4px;
  cursor: pointer;
`;

const AnimeCardImage = styled(Img)`
  width: 100%;
  border-radius: 4px;
`;

const NoImage = styled.div`
  padding: 12px;
  width: 267px;
  height: 140.17px;
  border-radius: 4px;
  background: ${ColorUtil.addOpacity(GeneralColorStyle.Main.White, 0.1)};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 8px 0;
`;

const CustomSkeleton = styled(Skeleton)`
  width: 267px;
  height: 140.17px;
  border-radius: 4px;
`;

type AnimeCardProps = {
  src: string;
  title: string;
  animeId: number;
  year: string;
  cours: string;
};

const AnimeCard: FCX<AnimeCardProps> = ({
  className,
  src,
  title,
  animeId,
  year,
  cours,
}) => {
  return (
    <Link href={`/${year}/${cours}/${animeId}`}>
      <AnimeCardContainer className={className}>
        <AnimeCardImage
          src={src}
          loader={
            <SkeletonTheme baseColor="#202020" highlightColor="#242424">
              <CustomSkeleton />
            </SkeletonTheme>
          }
          unloader={
            <NoImage>
              <Image
                src="/20200502_noimage.svg"
                width={170 * 0.4}
                height={159.4 * 0.4}
                alt="no image"
              />
              <GeneralText fontSize={GeneralFontSize.SIZE_12}>
                {title}
              </GeneralText>
            </NoImage>
          }
          alt={title}
        />
      </AnimeCardContainer>
    </Link>
  );
};

export default AnimeCard;
