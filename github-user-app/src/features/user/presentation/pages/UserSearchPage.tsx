import { Container, Typography } from "@mui/material";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

import { useAppDispatch } from "@app/hooks/useAppDispatch";
import { RootState } from "@app/store";
import { ErrorMessage } from "@shared/components/ErrorMessage";
import LanguageSwitcher from "@shared/components/LanguageSwitcher";
import { LoadingIndicator } from "@shared/components/LoadingIndicator";
import { fetchUsers, setQuery, reset } from "../../state/searchSlice";
import { SearchInput } from "../components/SearchInput";
import { UserTable } from "../components/UserTable";

const UserSearchPage = () => {
  const dispatch = useAppDispatch();
  const query = useSelector((state: RootState) => state.search.query);
  const { users, loading, error } = useSelector(
    (state: RootState) => state.search
  );

  useEffect(() => {
    if (query.length >= 3) {
      dispatch(fetchUsers(query));
    } else {
      dispatch(reset());
    }
  }, [query, dispatch]);

  const { t } = useTranslation();

  return (
    <Container maxWidth="md" sx={{ paddingY: 4 }}>
      <LanguageSwitcher />
      <Typography variant="h4" gutterBottom>
        {t("title")}
      </Typography>
      <SearchInput
        placeholder={t("search_placeholder")}
        value={query}
        onChange={(value) => dispatch(setQuery(value))}
      />
      {loading && <LoadingIndicator message={t("loading")} />}
      {error && <ErrorMessage message={error} />}
      {users.length > 0 && <UserTable users={users} />}
      {!loading && !error && users.length === 0 && query.length >= 3 && (
        <Typography variant="body2" align="center" sx={{ mt: 2 }}>
          {t("no_results")}
        </Typography>
      )}
    </Container>
  );
};

export default UserSearchPage;
