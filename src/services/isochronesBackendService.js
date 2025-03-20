// Round input values before sending to backend
const z = parseFloat(inputZ).toFixed(4);    // Example: 0.0004
const logAge = parseFloat(inputAge).toFixed(2); // Example: 7.80

// Send via WebSocket or API
socket.send(JSON.stringify({ Z: z, log_age: logAge }));
