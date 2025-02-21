import express, { Request, Response, Router } from "express";
import morgan from "morgan";
import { PgPromiseAdapter } from "./adapters/database/pg-promise/DatabaseConnectionPgPromise";
import { Cidade } from "./adapters/database/schemas/IbgeSchema";

// Configuração Ambiente ----------------------------------------------
console.info(`🟢 ENVIRONMENT: ${process.env.NODE_ENV ?? "development"} 🟢`);
// Inicia Servidor Express ------------------------------------------
const app = express();
// Configuração Básica ----------------------------------------------
// app.use(corsMiddleware())
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.listen(process.env.PORT ?? 7000, () => {
  console.info(
    `🔥 Server is up and running @ http://localhost:${process.env.PORT ?? ""}`
  );
});
// Configuração Banco de Dados --------------------------------------
const connection = new PgPromiseAdapter();
const tableUf = "uf";
const tableCity = "cidade";
// Rotas -----------------------------------------------------------
const v1Router = Router();
app.use("/v1", v1Router);

v1Router.get("/ping", function (req: Request, res: Response) {
  res.status(200).json({ message: "pong" });
});

v1Router.get("/estados", async function (req: Request, res: Response) {
  const statement = `SELECT * FROM ${tableUf}`;
  const ufs = await connection.query(statement);
  res.status(200).send(ufs);
});

v1Router.get(
  "/estados/:ufSigla/cidades",
  async function (req: Request, res: Response) {
    const uf = req.params.ufSigla;
    const statement = `SELECT codigo, nome from ${tableCity} WHERE sigla_uf = $1`;
    const cities = await connection.query(statement, [uf.toUpperCase()]);
    res.status(200).send(cities);
  }
);

v1Router.get("/cidades", async function (req: Request, res: Response) {
  const parcialName = req.query.parcial_name;
  const statement = `SELECT * from ${tableCity} WHERE nome ILIKE $1`;
  const cities = await connection.query(statement, [`%${parcialName}%`]);
  res.status(200).send(cities);
});

v1Router.get("/cidades/:id", async function (req: Request, res: Response) {
  const id = req.params.id;
  const statement = `SELECT * from ${tableCity} WHERE codigo = $1`;
  const [city] = await connection.query<Cidade[]>(statement, [id]);
  if (city.nome === "São Paulo") {
    console.log("É São Paulo");
  } else {
    console.log("Não é São Paulo");
  }
  res.status(200).send(city.nome);
});

// (GET) /cidades
// (GET) /cidades/:id
// (DELETE) /cidades/:id

// (POST) /cidades
// (PUT/PATCH) /cidades/:id
