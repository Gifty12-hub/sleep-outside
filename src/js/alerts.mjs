// creating an alert for the index.html for any activity done in the webpage
// first create and export the default class function Alert

export default class Alert {
    constructor() {
        this.alertsPath = "/json/alerts.json";
    }

    async init() {
        try {

            const response = await fetch(this.alertsPath);

            if (!response.ok) throw new Error("Network response was not ok");

            const alerts = await response.json();

            if (alerts && alerts.length > 0) {
                const alertSection = document.createElement("section");
                alertSection.classList.add("alert-list");

                alerts.forEach((alert) => {
                    const p = document.createElement("p");
                    p.textContent = alert.message;

                    p.style.backgroundColor = alert.backgroundColor;
                    p.style.color = alert.textColor;
                    p.style.border = `1px solid ${alert.textColor}`;
                    p.style.fontSize = "1rem";
                    p.style.padding = "1rem";
                    p.style.margin = "0.5rem 1rem";
                    p.style.borderRadius = "4px";
                    p.style.position = "relative";
                    p.style.textAlign = "center";
                    p.style.fontWeight = "bold";

                    if (alert.type) {
                        p.classList.add(`alert-${alert.type}`);
                    }

                    // Close button (×)
                    const closeBtn = document.createElement("span");
                    closeBtn.textContent = "×";
                    closeBtn.style.position = "absolute";
                    closeBtn.style.right = "1rem";
                    closeBtn.style.top = "50%";
                    closeBtn.style.transform = "translateY(-50%)";
                    closeBtn.style.fontSize = "1.5rem";
                    closeBtn.style.cursor = "pointer";
                    closeBtn.style.opacity = "0.7";
                    closeBtn.onclick = () => p.remove();

                    p.appendChild(closeBtn);

                    // Optional: auto-dismiss after duration (if provided and > 0)
                    if (alert.duration && alert.duration > 0) {
                        setTimeout(() => {
                            if (p.isConnected) { // Only remove if still on page
                                p.remove();
                            }
                        }, alert.duration);
                    }

                    alertSection.appendChild(p);

                });

                // Prepend to <main>
                const main = document.querySelector("main");
                if (main) {
                    main.prepend(alertSection);
                }

            }

        } catch (error) {
            console.error("Error loading alerts:", error);
        }
    }
}