// main.js
import "../css/style.css";
import Alert from "./alerts.mjs";
import { loadHeaderFooter } from "./utils.mjs";

// Load header and footer
loadHeaderFooter();

// creating the alert instance
const alerts = new Alert();
// Initializing alerts
alerts.init();
