import { MenuItem, Select, SelectChangeEvent } from '@mui/material';
import styles from './sortOptions.module.scss';

type Props = {
  value: SortOrder;
  onChange: (value: SortOrder) => void;
};

export function SortOptions({ value, onChange }: Props) {
  const handleChange = (event: SelectChangeEvent) => {
    onChange(event.target.value as SortOrder);
  };

  return (
    <Select
      className={styles.select}
      labelId="demo-simple-select-label"
      id="demo-simple-select"
      value={value}
      label="Country"
      onChange={handleChange}
    >
      <MenuItem key={'asc'} value={'asc'}>
        Market Cap Low to High
      </MenuItem>
      <MenuItem key={'desc'} value={'desc'}>
        Market Cap High to Low
      </MenuItem>
    </Select>
  );
}
