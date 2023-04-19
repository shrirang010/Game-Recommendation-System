import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import get_genre_rank from "../../graph/genre";
import type { genres } from "../../types/genres";
import style from "./statistics.module.css";

function getObjectKey(obj: { [x: string]: any }, value: any) {
  return Object.keys(obj).find((key) => obj[key] === value);
}

function createData(rank: number, genre: string | undefined, metric: number) {
  return { rank, genre, metric };
}
const genrelist: genres = {
  Action: [],
  Adventure: [],
  Indie: [],
  RPG: [],
  Racing: [],
  Simulation: [],
  Sports: [],
  Strategy: [],
};

const rows: any[] = [];
let data = [];
let genre = get_genre_rank(genrelist);
let genreName: string[] = Object.keys(genre);
let genreMetric = Object.values(genre);
genreMetric.sort((a, b) => b - a);

for (let i in genreMetric) {
  rows[Number(i)] = createData(
    Number(i) + 1,
    getObjectKey(genre, genreMetric[i]),
    Number(genreMetric[i])
  );
}
export default function BasicTable() {
  return (
    <div className={style.container}>
      <div className={style.heading}> Genre Rank </div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell
                align="right"
                sx={{ fontSize: "1.5rem", fontFamily: "Readex Pro" }}
              >
                Rank{" "}
              </TableCell>
              <TableCell
                align="right"
                sx={{ fontSize: "1.5rem", fontFamily: "Readex Pro" }}
              >
                Genre{" "}
              </TableCell>
              <TableCell
                align="right"
                sx={{ fontSize: "1.5rem", fontFamily: "Readex Pro" }}
              >
                Metric score{" "}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.name}>
                <TableCell
                  align="right"
                  sx={{ fontSize: "1.5rem", fontFamily: "Readex Pro" }}
                >
                  {row.rank}
                </TableCell>
                <TableCell
                  align="right"
                  sx={{ fontSize: "1.5rem", fontFamily: "Readex Pro" }}
                >
                  {row.genre}
                </TableCell>
                <TableCell
                  align="right"
                  sx={{ fontSize: "1.5rem", fontFamily: "Readex Pro" }}
                >
                  {row.metric}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
