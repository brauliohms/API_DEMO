import pgp from "pg-promise";
import CITIES_IBGE from "./cidades-ibge-uf.json";
import CITIES_TOM from "./municipios-TOM-IBGE.json";

const db = pgp()("postgres://usuario:123456@localhost:5433/app");

async function seedIbgeDatabase() {
  try {
    for (const city of CITIES_IBGE) {
      const codigoTom = CITIES_TOM.find(
        (cityTom) => cityTom["CODIGO-MUNICIPIO-IBGE"] === city.codigo,
      )?.["CODIGO-MUNICIPIO-TOM"];
      await db.none(
        `INSERT INTO uf (codigo, sigla, nome) VALUES ($1, $2, $3)
        ON CONFLICT (codigo) DO NOTHING`,
        [city.codigoUf, city.uf, city.ufNome],
      );
      await db.none(
        `INSERT INTO cidade (codigo, nome, microrregiao, regiao_imediata, codigo_tom, sigla_uf, codigo_uf, nome_uf)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        ON CONFLICT (codigo) DO NOTHING`,
        [
          city.codigo,
          city.nome,
          city.microrregiao,
          city.regiaoImediata,
          codigoTom,
          city.uf,
          city.codigoUf,
          city.ufNome,
        ],
      );
    }
  } catch (error) {
    console.error("Erro ao popular o banco de dados:", error);
  } finally {
    await db.$pool.end();
  }
}

void seedIbgeDatabase();
// To make a seed:
// npx tsx ./database-ibge/seedIbgeDatabase.ts
