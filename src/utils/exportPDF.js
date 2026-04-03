import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const exportToPDF = (expenses, summary, selectedEvent) => {
    const doc = new jsPDF();

    const { totalCredit, totalExpense, balance } = summary;

    // 🎯 HEADER
    doc.setFontSize(18);
    doc.setTextColor(40, 40, 40);
    doc.text("Expense Report", 14, 20);

    doc.setFontSize(11);
    doc.setTextColor(100);
    doc.text(`Event: ${selectedEvent}`, 14, 28);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 14, 34);

    // 🎯 SUMMARY BOX
    const startY = 45;

    doc.setFillColor(240, 240, 240);
    doc.roundedRect(14, startY, 180, 25, 3, 3, "F");

    doc.setFontSize(11);

    doc.setTextColor(0, 150, 0);
    doc.text(`Credit: Rs.${totalCredit}`, 18, startY + 10);

    doc.setTextColor(200, 0, 0);
    doc.text(`Expense: Rs.${totalExpense}`, 18, startY + 18);

    doc.setTextColor(0, 0, 150);
    doc.text(`Balance: Rs.${balance}`, 110, startY + 14);

    // 🎯 TABLE DATA
    const tableData = expenses.map((e) => [
        new Date(
            e.createdAt?.seconds
                ? e.createdAt.seconds * 1000
                : Date.now()
        ).toLocaleDateString(),
        e.description,
        e.event || "general",
        e.type === "credit" ? `+Rs.${e.amount}` : `-Rs.${e.amount}`,
    ]);

    // 🎯 TABLE
    autoTable(doc, {
        startY: startY + 35,
        head: [["Date", "Description", "Event", "Amount"]],
        body: tableData,

        styles: {
            fontSize: 10,
            cellPadding: 4,
        },

        headStyles: {
            fillColor: [63, 81, 181], // Indigo
            textColor: 255,
        },

        didParseCell: function (data) {
            if (data.column.index === 3) {
                if (data.cell.raw.includes("+")) {
                    data.cell.styles.textColor = [0, 150, 0];
                } else {
                    data.cell.styles.textColor = [200, 0, 0];
                }
            }
        },
    });

    // 🎯 FOOTER
    const pageHeight = doc.internal.pageSize.height;

    doc.setFontSize(9);
    doc.setTextColor(150);
    doc.text(
        `Generated on ${new Date().toLocaleString()}`,
        14,
        pageHeight - 10
    );

    // 🎯 SAVE
    doc.save(`Expense_Report_${selectedEvent}.pdf`);
};