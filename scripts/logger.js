export function logAction(action, user = "guest", level = "info") {
  const timestamp = new Date().toISOString();
  const message = `[${timestamp}] [${user}] ${action}`;

  switch (level) {
    case "warn":
      console.warn(message);
      break;
    case "error":
      console.error(message);
      break;
    default:
      console.log(message);
  }
}
