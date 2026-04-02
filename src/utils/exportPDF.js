import jsPDF from "jspdf";

export const exportToPDF = (expenses, summary, selectedEvent) => {
    const doc = new jsPDF();

    let y = 10;

    // 🔹 TITLE
    doc.setFontSize(16);
    doc.text(`Expense Report - ${selectedEvent}`, 10, y);
    y += 10;

    // 🔹 SUMMARY
    doc.setFontSize(12);
    doc.text(`Total Credit: ₹${summary.totalCredit}`, 10, y);
    y += 7;
    doc.text(`Total Expense: ₹${summary.totalExpense}`, 10, y);
    y += 7;
    doc.text(`Balance: ₹${summary.balance}`, 10, y);
    y += 10;

    // 🔹 TABLE HEADER
    doc.text("Transactions:", 10, y);
    y += 8;

    expenses.forEach((e, index) => {
        const line = `${index + 1}. ${e.description} | ₹${e.amount} | ${e.type}`;

        doc.text(line, 10, y);
        y += 6;

        // prevent overflow
        if (y > 280) {
            doc.addPage();
            y = 10;
        }
    });

    // 🔹 DOWNLOAD
    doc.save(`Expense_Report_${selectedEvent}.pdf`);
};