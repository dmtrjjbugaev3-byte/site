import Pusher from "pusher";

const pusher = new Pusher({
  appId: "2047105",
  key: "6ead994314cfeaa97dc6",
  secret: "55623997f2e8e5a73e6e",
  cluster: "eu",
  useTLS: true
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { state, senderId } = req.body || {};
  if (!state) return res.status(400).json({ error: "Missing state" });

  try {
    await pusher.trigger("game-channel", "state-update", { state, senderId });
    res.json({ status: "ok" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to send event" });
  }
}
