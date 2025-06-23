import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import type { GithubUser } from "@schedulo/github-user-core-lib";
import { useTranslation } from "react-i18next";

export const UserTable = ({ users }: { users: GithubUser[] }) => {
  const { t } = useTranslation();

  return (
    <TableContainer component={Paper} sx={{ marginTop: 2 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <b>{t("avatar")}</b>
            </TableCell>
            <TableCell>
              <b>{t("user_name")}</b>
            </TableCell>
            <TableCell>
              <b>{t("type")}</b>
            </TableCell>
            <TableCell>
              <b>{t("score")}</b>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((u) => (
            <TableRow key={u.id}>
              <TableCell>
                <img src={u.avatar_url} alt={u.login} width={40} />
              </TableCell>
              <TableCell>{u.login}</TableCell>
              <TableCell>{u.type}</TableCell>
              <TableCell>{u.score.toFixed(2)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
