import postgraphile from "postgraphile"
import { PG_URI } from "./config.js"

const middleware = postgraphile(PG_URI, "public", {
  watchPg: true,
  graphiql: true,
  enhanceGraphiql: true,
//   appendPlugins: [require("@graphile-contrib/pg-simplify-inflector")]
})
