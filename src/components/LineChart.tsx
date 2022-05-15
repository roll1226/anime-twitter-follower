import { getDocs, limit, orderBy, query } from "firebase/firestore";
import { FCX, useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import styled from "styled-components";
import GeneralColorStyle from "styles/colors/GeneralColorStyle";
import { Spacer } from "styles/spacer/GeneralSpacerStyle";
import {
  GeneralFontSize,
  GeneralFontWeight,
  GeneralText,
} from "styles/typography/GeneralTextStyle";
import DateUtil from "utils/date/DateUtil";
import LoggerUtil from "utils/debugger/LoggerUtil";
import FireStoreUtil from "utils/lib/Firebase/FireStoreUtil";

const LineChartContainer = styled.div``;

const LineChartCard = styled.div`
  margin: 0 auto;
  padding: 40px;
  width: 80%;
  height: 60vh;
  border-radius: 30px;
  background: ${GeneralColorStyle.Main.LightDark};
`;

const LineChartText = styled(GeneralText)`
  display: block;
  text-align: center;
`;

type ChartProps = {
  year: string;
  cours: string;
  animeId: string;
};

const LineChart: FCX<ChartProps> = ({ className, year, cours, animeId }) => {
  const [chartData, setChartData] = useState<{
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      fill: boolean;
      borderColor: string;
      backgroundColor: string;
    }[];
  } | null>(null);

  useEffect(() => {
    if (!year || !cours || !animeId) return;

    const test = async (year: string, cours: string, animeId: string) => {
      const labels: string[] = [];
      const getChartData: number[] = [];

      const followerQuery = query(
        FireStoreUtil.getAnimeFollower(year, cours, animeId),
        orderBy("createdAt", "desc"),
        limit(10)
      );

      const snapshots = await getDocs(followerQuery);
      snapshots.forEach((snapshot) => {
        const date = DateUtil.getDateString(snapshot.data().createdAt);

        labels.unshift(date);
        getChartData.unshift(snapshot.data().follower);
      });

      const data = {
        labels: labels,
        datasets: [
          {
            label: "フォロワー数",
            data: getChartData,
            fill: true,
            borderColor: "rgba(29, 161, 242, 1)",
            backgroundColor: "rgba(29, 161, 242, 0.2)",
          },
        ],
      };

      setChartData(data);
    };
    test(year, cours, animeId);
  }, [year, cours, animeId]);

  const options: {} = {
    maintainAspectRatio: false,
    responsive: true,
    tooltips: {
      callbacks: {
        label: function (tooltipItem: any, data: any) {
          return (
            data.labels[tooltipItem.index] +
            ": " +
            Number(data.datasets[0].data[tooltipItem.index]).toLocaleString() +
            " 人"
          );
        },
      },
    },
    scales: {
      xAxes: [
        {
          ticks: {},
        },
      ],
      yAxes: [
        {
          ticks: {
            callback: function (label: any, index: any, labels: any) {
              return (
                label.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") +
                " 人"
              );
            },
          },
        },
      ],
    },
  };

  return (
    <LineChartContainer>
      <LineChartText
        fontSize={GeneralFontSize.SIZE_32}
        fontWeight={GeneralFontWeight.BOLD}
      >
        フォロワー数の推移
      </LineChartText>

      <Spacer size={20} />

      <LineChartCard>
        {chartData && <Line data={chartData} options={options} />}
      </LineChartCard>
    </LineChartContainer>
  );
};

export default LineChart;
