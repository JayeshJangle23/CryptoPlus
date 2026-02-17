export default async function handler(req, res) {
  try {
    const response = await fetch("https://api.coingecko.com/api/v3/global");

    const data = await response.json();

    res.setHeader("Cache-Control", "s-maxage=60, stale-while-revalidate");
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: "Error fetching global data" });
  }
}
