import cors from "cors"
import express from "express"
const app = express()
import { PORT } from "./config.js"
import { postgraphile } from "postgraphile"
import { PG_URI } from "./config.js"
import { JWT_SECRET } from "./config.js"
import PgSimplifyInflectorPlugin from "@graphile-contrib/pg-simplify-inflector"

app.use(
  cors(),
  postgraphile(PG_URI, "public", {
    watchPg: true,
    graphiql: true,
    enhanceGraphiql: true,
    appendPlugins: [PgSimplifyInflectorPlugin],
    jwtPgTypeIdentifier: "public.jwt_token",
    jwtSecret: JWT_SECRET,
    pgDefaultRole: "anonymous",
    showErrorStack: true,
    extendedErrors: ["hint", "detail", "errcode"],
  })
)

app.listen({ port: PORT }, () => {
  console.log(`🚀 Server ready at http://localhost:${PORT}/graphiql`)
})
