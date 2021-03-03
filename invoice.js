const PDFDocument = require("pdfkit");
const fs = require("fs");
let finalLine;

function createInvoice(invoice) {
  const size = [80, 120 + invoice.items.length * 5];
  let doc = new PDFDocument({ size: size, margin: 5 });

  generateHeader(doc);
  generateCustomerInformation(doc, invoice);
  generateInvoiceTable(doc, invoice);
  generateFooter(doc);

  doc.end();
  doc.pipe(fs.createWriteStream("routes/output.pdf"));

}

function generateHeader(doc) {
  doc
    .fillColor("#444444")
    .fontSize(3)
    .text("Pañalera Donde Line", 0, 5, { align: "center" })
    .text("Lineth León Villegas", 0, 10, { align: "center" })
    .text("CED: 6-0324-0115", 0, 15, { align: "center" })
    .text("Régimen Simplificado", 0, 20, { align: "center" })
    .text("TEL: 2431-1215", 0, 25, { align: "center" })
    .moveDown();
}

function generateCustomerInformation(doc, invoice) {
  doc.fillColor("#444444").fontSize(3);

  generateHr(doc, 33);

  const customerInformationTop = 35;

  doc
    .fontSize(2)
    .text("Número de Factura:", 5, customerInformationTop)
    .font("Helvetica-Bold")
    .text(invoice.invoice_nr, 23, customerInformationTop)
    .font("Helvetica")
    .text("Fecha:", 5, customerInformationTop + 4)
    .text(formatDate(new Date()), 12, customerInformationTop + 4)
    .text("CLIENTE:", 5, customerInformationTop + 8)
    .font("Helvetica")
    .text(invoice.shipping.id, 15, customerInformationTop + 8)
    .text(invoice.shipping.name, 15, customerInformationTop + 12)
    .text(invoice.shipping.address, 15, customerInformationTop + 16)
    .moveDown();

  generateHr(doc, 55);
}

function generateInvoiceTable(doc, invoice) {
  let i;
  const invoiceTableTop = 60;

  doc.font("Helvetica-Bold");
  generateTableRow(doc, invoiceTableTop, "CANT", "DESCRPCIÓN", "PRECIO IVI");
  //generateHr(doc, invoiceTableTop + 20);
  doc.font("Helvetica");

  for (i = 0; i < invoice.items.length; i++) {
    const item = invoice.items[i];
    const position = invoiceTableTop + (i + 1) * 4;
    generateTableRow(
      doc,
      position,
      item.quantity,
      item.description,
      formatCurrency(item.amount)
    );

    //generateHr(doc, position + 3);
  }

  let subtotalPosition = invoiceTableTop + (i + 2) * 4;
  generateHr(doc, subtotalPosition);
  subtotalPosition = subtotalPosition + 3;
  generateTableRow(
    doc,
    subtotalPosition,
    "",
    "Subtotal",
    formatCurrency(invoice.subtotal)
  );

  const paidToDatePosition = subtotalPosition + 3;
  generateTableRow(
    doc,
    paidToDatePosition,
    "",
    "Impuesto",
    formatCurrency(invoice.taxes)
  );

  const duePosition = paidToDatePosition + 3;
  doc.font("Helvetica-Bold");
  generateTableRow(
    doc,
    duePosition,
    "",
    "Total",
    formatCurrency(invoice.total)
  );
  doc.font("Helvetica");

  finalLine = duePosition + 10;
}

function generateFooter(doc) {
  doc
    .fontSize(2)
    .text(
      "Autorizado mediante resolución N°. 11-97 Gaceta",
      10,
      finalLine + 1,
      {
        align: "center",
        width: 60,
      }
    )
    .text(
      "N°. 171 del 5-9-1997, de la Dirección General de",
      10,
      finalLine + 4,
      {
        align: "center",
        width: 60,
      }
    )
    .text("Tributación Directa", 10, finalLine + 7, {
      align: "center",
      width: 60,
    })
    .text(
      "Original: Cliente, Copia, Trámite y Contabilidad",
      10,
      finalLine + 10,
      {
        align: "center",
        width: 60,
      }
    );
}

function generateTableRow(doc, y, quantity, description, lineTotal) {
  doc
    .fontSize(2)
    .text(quantity, 5, y)
    .text(description, 15, y)
    .text(lineTotal, 0, y, { align: "right" });
}

function generateHr(doc, y) {
  doc
    .strokeColor("#aaaaaa")
    .lineWidth(0.3)
    .moveTo(5, y)
    .lineTo(75, y)
    .dash(2, { space: 1 })
    .stroke();
}

function formatCurrency(value) {
  const formatterPeso = new Intl.NumberFormat("es-CR", {
    style: "currency",
    currency: "CRC",
    minimumFractionDigits: 0,
  });
  let valueFinal = formatterPeso.format(value);

  return valueFinal;
}

function formatDate(date) {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return year + "/" + month + "/" + day;
}

module.exports = { createInvoice };
