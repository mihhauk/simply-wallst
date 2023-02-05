import React from 'react';
import { PolarGrid, Radar, RadarChart, ResponsiveContainer } from 'recharts';
import { CompanyData } from '../../api/stocks';

type Props = {
  score: CompanyData['score'];
};

const MAX_SCORE = 10;

export function SnowflakeScoreChart({ score }: Props) {
  const { value, income, health, past, future } = score.data;

  const chartData = [
    {
      subject: 'value',
      score: value,
      fullMark: MAX_SCORE,
    },
    {
      subject: 'income',
      score: income,
      fullMark: MAX_SCORE,
    },
    {
      subject: 'health',
      score: health,
      fullMark: MAX_SCORE,
    },
    {
      subject: 'past',
      score: past,
      fullMark: MAX_SCORE,
    },
    {
      subject: 'future',
      score: future,
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
          stroke="#415a77"
          fill="#415a77"
          fillOpacity={0.8}
        />
      </RadarChart>
    </ResponsiveContainer>
  );
}
