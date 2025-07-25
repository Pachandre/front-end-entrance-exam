import { element } from "./dom";
import Ripple from "./Ripple";

// function exportResume() {
//     const resume = document.querySelector<HTMLDivElement>("#resume")!;
//     const win = window.open("", "_blank", "width=800,height=1000");
//     if (!win) {
//         console.error("Popup blocked or failed to open");
//         return;
//     }
//     win.document.open();
//     win.document.write(`
//     <!DOCTYPE html>
// <html lang="en">

// <head>
// 	<meta charset="UTF-8">
// 	<meta name="viewport" content="width=device-width, initial-scale=1.0">
// 	<title>RESUME</title>
// 	<link rel="stylesheet" href="./css/fonts.css">
// 	<link rel="stylesheet" href="./css/style.css">
//     <style>
//     @page {
//       margin: 0;
//     }
//     * {
//       box-sizing: border-box;
//     }
//     html, body {
//       margin: 0;
//       padding: 0;
//       width: 100%;
//       height: 100%;
//       overflow: hidden;
//       font-family: Arial, sans-serif;
//     }
//     .scaler {
//       width: max-content;
//       height: max-content;
//       transform-origin: top left;
//     }
//   </style>
// </head>

// <body>
// <div class="scaler">
// ${resume.outerHTML}
// </div>
// </body>

// </html>
//   `);
//     win.document.close();

//     win.onload = () => {
//         const printable = win.document.querySelector<HTMLElement>(".scaler")!;
//         const pageWidth = 210;
//         const dpi = 96;
//         const pxPerMm = dpi / 25.4;

//         const maxWidthPx = pageWidth * pxPerMm;
//         const actualWidth = printable.offsetWidth;

//         const scale = maxWidthPx / actualWidth;

//         printable.style.transform = `scale(${scale})`;

//         win.focus();
//         win.print();
//         win.close();
//     };
// }

function exportResume() {
    const resume = document.querySelector<HTMLDivElement>("#resume")!;
    // @ts-ignore
    const { jsPDF } = window.jspdf;

    const makePDF = (canvas: HTMLCanvasElement) => {
        const pdf = new jsPDF("p", "mm", [canvas.width, canvas.height]);
        const imgData = canvas.toDataURL("image/png");

        pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
        pdf.save("resume.pdf");
    };

    // @ts-ignore
    html2canvas(resume, {
        useCORS: true,
    }).then(makePDF);
}

export default function ExportButton() {
    return Ripple(
        element("button", {
            id: "export",
            text: "Save as PDF",
            events: {
                click: exportResume,
            },
        })
    );
}
