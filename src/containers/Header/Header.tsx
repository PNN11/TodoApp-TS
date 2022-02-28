import React from "react";
import {
  Container,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";

import { useTheme } from "providers/ThemeProvider/ThemeProvider";
import { MaterialUISwitch } from "./Header.styles";
import { setItemToLocalStorage } from "helpers/localStorage";

const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  const { t, i18n } = useTranslation();

  const handleChangeLanguage = (e: SelectChangeEvent) => {
    i18n.changeLanguage(e.target.value);
    setItemToLocalStorage("lng", e.target.value);
  };

  return (
    <Paper elevation={0}>
      <Container>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="h3">{t("hello")}</Typography>
          <Stack direction="row" spacing={2} mb={2} mt={2}>
            <FormControl
              variant="outlined"
              sx={{ width: "20%", minWidth: "150px" }}
            >
              <InputLabel id="language">{t("changeLang")}</InputLabel>
              <Select
                labelId="language"
                id="language"
                label="Change language"
                name="language"
                value={i18n.language}
                onChange={handleChangeLanguage}
              >
                <MenuItem value="ru">RU</MenuItem>
                <MenuItem value="en">EN</MenuItem>
              </Select>
            </FormControl>
            <Tooltip title={<>{t("changeTheme")}</>}>
              <FormControl>
                <FormControlLabel
                  checked={theme === "dark"}
                  onChange={toggleTheme}
                  control={<MaterialUISwitch sx={{ m: 1 }} />}
                  label={
                    <Typography>
                      {theme === "dark" ? t("dark") : t("light")}
                    </Typography>
                  }
                />
              </FormControl>
            </Tooltip>
          </Stack>
        </Stack>
      </Container>
    </Paper>
  );
};

export default Header;
