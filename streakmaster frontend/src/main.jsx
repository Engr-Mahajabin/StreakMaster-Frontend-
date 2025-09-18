// import "./index.css"

// export const metadata = {
//     title: "HabitFlow - Track Your Daily Habits",
//     description: "A beautiful and motivating habit tracker to help you build better daily routines.",
// }

// export default function RootLayout({ children }) {
//     return (
//         <html lang="en">
//             <body className="antialiased">{children}</body>
//         </html>
//     )
// }


import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
