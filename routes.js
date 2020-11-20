const Request = require("request");
const parse = require("node-html-parser").parse;
const HtmlTableToJson = require("html-table-to-json");

async function routes(fastify, options) {
  fastify.get("/gettabledata", async (request, reply) => {
    await Request(
      "https://unemploymentinindia.cmie.com/kommon/bin/sr.php?kall=wsttimeseries&index_code=050050000000&dtype=total",
      function (err, res, body) {
        if (err) console.log(err);
        const root = parse(body);
        reply.send({
          table: HtmlTableToJson.parse(root.querySelector("#ftable").toString())
            .results,
        });
      }
    );
  });
}

module.exports = routes;
