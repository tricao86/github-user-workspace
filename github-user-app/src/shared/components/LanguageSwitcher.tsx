import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { type SelectChangeEvent } from "@mui/material/Select";
import { useTranslation } from "react-i18next";

const LanguageSwitcher = () => {
  const { t, i18n } = useTranslation();

  const handleChange = (event: SelectChangeEvent) => {
    i18n.changeLanguage(event.target.value);
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
      <FormControl size="small" variant="outlined">
        <InputLabel id="lang-select-label">{t("language")}</InputLabel>
        <Select
          labelId="lang-select-label"
          id="lang-select"
          value={i18n.language}
          onChange={handleChange}
          label="Language"
          sx={{ minWidth: 140 }}
        >
          <MenuItem value="en">English</MenuItem>
          <MenuItem value="vi">Tiếng Việt</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default LanguageSwitcher;
