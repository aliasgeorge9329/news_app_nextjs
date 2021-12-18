const { news } = require("./data.json");

export default function handler(req, res) {
  if (req.method === "GET") {
    const singlenews = news.filter((items) => items.slug === req.query.slug);
    res.status(200).json(singlenews);
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).json({ message: `Method ${req.method} is not allowed.` });
  }
}
