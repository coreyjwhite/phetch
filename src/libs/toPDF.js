import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

export default function toPDF(element, outputFile = element) {
  const input = document.getElementById(element);
  html2canvas(input).then(canvas => {
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF();
    pdf.addImage(imgData, "JPEG", 0, 0);
    // pdf.output('dataurlnewwindow');
    pdf.save(`${outputFile}.pdf`);
  });
}
