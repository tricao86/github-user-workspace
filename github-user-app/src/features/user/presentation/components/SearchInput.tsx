import TextField from '@mui/material/TextField';

interface Props {
  placeholder: string,
  value: string;
  onChange: (value: string) => void;
}

export const SearchInput = ({ placeholder, value, onChange }: Props) => (
  <TextField
    fullWidth
    variant="outlined"
    label=""
    placeholder={placeholder || 'Search...'}
    value={value}
    onChange={(e) => onChange(e.target.value)}
  />
);