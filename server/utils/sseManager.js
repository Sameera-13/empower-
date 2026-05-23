// Manages active SSE connections for real-time notification delivery
const clients = new Map(); // userId (string) -> Set<Response>

function addClient(userId, res) {
  const id = userId.toString();
  if (!clients.has(id)) clients.set(id, new Set());
  clients.get(id).add(res);
}

function removeClient(userId, res) {
  const id = userId.toString();
  const set = clients.get(id);
  if (set) {
    set.delete(res);
    if (set.size === 0) clients.delete(id);
  }
}

function sendToUser(userId, data) {
  const id = userId.toString();
  const set = clients.get(id);
  if (set) {
    const payload = `data: ${JSON.stringify(data)}\n\n`;
    set.forEach((res) => res.write(payload));
  }
}

function sendToAll(data) {
  const payload = `data: ${JSON.stringify(data)}\n\n`;
  clients.forEach((set) => {
    set.forEach((res) => res.write(payload));
  });
}

module.exports = { addClient, removeClient, sendToUser, sendToAll };
