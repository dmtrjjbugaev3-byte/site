// api/pusher-auth.js
import Pusher from 'pusher';

const pusher = new Pusher({
  appId: "2047105",
  key: "6ead994314cfeaa97dc6",
  secret: "55623997f2e8e5a73e6e",
  cluster: "eu",
  useTLS: true
});

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { socket_id, channel_name } = req.body;
    
    try {
      const auth = pusher.authenticate(socket_id, channel_name);
      res.status(200).json(auth);
    } catch (error) {
      res.status(500).json({ error: 'Authentication failed' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}