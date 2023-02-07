import { CompanyData } from '../../api/stocks';
import { SnowflakeScoreChart } from '../SnowflakeScoreChart';
import styles from './companyTile.module.scss';

type Props = Omit<CompanyData, 'id'>;

export function CompanyTile({ name, unique_symbol, score }: Props) {
  return (
    <div className={styles.card}>
      <div className={styles.chartWrapper}>
        <SnowflakeScoreChart score={score.data} />
      </div>
      <div className={styles.info}>
        <span className={styles.fullName}>{unique_symbol}</span>
        <span>{name}</span>
      </div>
    </div>
  );
}
