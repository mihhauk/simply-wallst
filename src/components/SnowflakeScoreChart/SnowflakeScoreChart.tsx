import { useMemo } from 'react';
import { PolarGrid, Radar, RadarChart, ResponsiveContainer } from 'recharts';
import { CompanyData } from '../../api/stocks';

type Props = {
  score: CompanyData['score']['data'];
};

const MAX_SCORE = 6;

const getScoreColor = (...score: number[]): string => {
  const totalScore = Object.values(score).reduce((a, b) => a + b, 0);
  return `hsla(${totalScore * 4}, 100%, 50%, 1)`;
};

export function SnowflakeScoreChart({ score }: Props) {
  // to my understanding based on this article
  // https://support.simplywall.st/hc/en-us/articles/360001740916-How-does-the-Snowflake-work
  const { value, income, health, past, future } = score;
  const color = useMemo(
    () => getScoreColor(value, income, health, past, future),
    [value, income, health, past, future]
  );

  const chartData = [
    {
      subject: 'value',
      score: value,
      fullMark: MAX_SCORE,
    },
    {
      subject: 'future',
      score: future,
      fullMark: MAX_SCORE,
    },
    {
      subject: 'past',
      score: past,
      fullMark: MAX_SCORE,
    },
    {
      subject: 'health',
      score: health,
      fullMark: MAX_SCORE,
    },
    {
      subject: 'income',
      score: income,
      fullMark: MAX_SCORE,
    },
  ];

  return (
    <ResponsiveContainer width="100%" height="100%">
      <RadarChart data={chartData} outerRadius="100%">
        <PolarGrid stroke="#999" />
        <Radar
          legendType="none"
          dataKey="score"
          stroke={color}
          fill={color}
          fillOpacity={0.8}
        />
      </RadarChart>
    </ResponsiveContainer>
  );
}
