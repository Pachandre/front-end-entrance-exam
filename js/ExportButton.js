import { element } from "./dom";
import Ripple from "./Ripple";
function exportResume() {
    const resume = document.querySelector("iframe");
    resume.focus();
    resume.contentWindow?.print();
    //     const resume = document
    //         .getElementById("resume")!
    //         .cloneNode(true) as HTMLDivElement;
    //     const printWindow = window.open("", "", "width=800,height=600");
    //     if (!printWindow) {
    //         console.error("Couldn't open window to print resume");
    //         return;
    //     }
    //     printWindow.document.writeln(`
    //     <html>
    //       <head>
    //         <title>Resume</title>
    //         <link rel="stylesheet" href="./css/style.css" />
    //       </head>
    //       <body>
    //         ${resume.outerHTML}
    //       </body>
    //     </html>
    //   `);
}
export default function ExportButton() {
    return Ripple(element("button", {
        id: "export",
        text: "Save as PDF",
        events: {
            click: exportResume,
        },
    }));
}
