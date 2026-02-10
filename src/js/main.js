import { loadHeaderFooter } from "./utils.mjs";
import Alert from "./alerts.mjs"; // Adjust path if needed (e.g., './alerts.mjs')

async function initPage() {
  await loadHeaderFooter(); // Wait for header/footer (and main) to load
  const alert = new Alert();
  await alert.init(); // Now init alerts – it prepends to main
}

initPage(); // Call the async function
