import { InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import styles from './countrySelect.module.scss';
import countryList from 'country-list';
import 'flag-icons/css/flag-icons.min.css';

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export function CountrySelect({ value, onChange }: Props) {
  const handleChange = (event: SelectChangeEvent) => {
    onChange(event.target.value);
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
      {Object.entries(countryList.getCodeList()).map(([code, name]) => (
        <MenuItem key={code} value={code}>
          <span className={`fi fi-${code} `}></span>
          <span className={styles.countryName}>{name}</span>
        </MenuItem>
      ))}
    </Select>
  );
}
