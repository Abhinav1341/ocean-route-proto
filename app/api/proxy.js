const axios = require("axios");

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const response = await axios.post(
        "http://3.27.184.84:5000/getRoute",
        req.body,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      res.status(200).json(response.data);
    } catch (error) {
      console.error("Error forwarding POST request:", error.message);
      res.status(500).json({ error: "Failed to fetch data from HTTP server" });
    }
  } else {
    res.status(405).json({ message: "Only POST requests are allowed" });
  }
}
