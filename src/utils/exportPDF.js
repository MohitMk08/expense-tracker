import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import html2canvas from "html2canvas";

export const exportToPDF = async (
    expenses,
    summary,
    selectedEvent,
    currency = "INR", // ✅ pass string, NOT function
    user
) => {

    const currencySymbolMap = {
        INR: "Rs.",
        USD: "$",
        EUR: "€",
        GBP: "£",
    };


    const formatCurrency = (amount) => {
        const symbol = currencySymbolMap[currency] || "₹";
        return `${symbol} ${Number(amount).toLocaleString("en-IN")}`;
    };

    const doc = new jsPDF();

    const { totalCredit, totalExpense, balance } = summary;

    const pageWidth = doc.internal.pageSize.getWidth();

    // 🖼️ LOAD LOGO
    const loadImage = (src) =>
        new Promise((resolve) => {
            const img = new Image();
            img.src = src;
            img.onload = () => resolve(img);
        });

    const logo = await loadImage("/EXP-Logo.png");

    // 🎯 HEADER (LEFT)
    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.setTextColor(40, 40, 40);
    doc.text("Expense Tracker", 14, 18);

    doc.setFontSize(11);
    doc.setTextColor(120);
    doc.text("Smart Financial Report", 14, 25);

    // 🎯 USER INFO
    doc.setFontSize(10);
    doc.text(`User: ${user?.email || "N/A"}`, 14, 32);
    doc.text(`Event: ${selectedEvent}`, 14, 38);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 14, 44);

    // 🎯 LOGO (RIGHT SIDE 🔥)
    doc.addImage(
        logo,
        "PNG",
        pageWidth - 30, // right align
        10,
        16,
        16
    );

    // 🎯 SUMMARY CARD
    const startY = 55;

    doc.setFillColor(245, 247, 250);
    doc.roundedRect(14, startY, 180, 30, 4, 4, "F");

    doc.setFontSize(11);

    doc.setTextColor(34, 197, 94);
    doc.text(`Credit: ${formatCurrency(totalCredit)}`, 18, startY + 12);

    doc.setTextColor(239, 68, 68);
    doc.text(`Expense: ${formatCurrency(totalExpense)}`, 18, startY + 22);

    doc.setTextColor(99, 102, 241);
    doc.text(`Balance: ${formatCurrency(balance)}`, 110, startY + 17);

    // 🎯 CHART
    let chartY = startY + 40;

    const chartElement = document.getElementById("chart-export");

    if (chartElement) {
        const canvas = await html2canvas(chartElement, {
            backgroundColor: null,
            scale: 2,
        });

        const imgData = canvas.toDataURL("image/png");

        doc.addImage(imgData, "PNG", 50, chartY, 95, 90);

        chartY += 100;
    }

    // 🎯 TABLE DATA
    const tableData = expenses.map((e) => [
        new Date(
            e.createdAt?.seconds
                ? e.createdAt.seconds * 1000
                : Date.now()
        ).toLocaleDateString(),
        e.description,
        e.event || "general",
        e.type === "credit"
            ? `+ ${formatCurrency(e.amount)}`
            : `- ${formatCurrency(e.amount)}`,
    ]);

    // 🎯 TABLE
    autoTable(doc, {
        startY: chartY,
        head: [["Date", "Description", "Event", "Amount"]],
        body: tableData,

        styles: {
            fontSize: 10,
            cellPadding: 4,
        },

        headStyles: {
            fillColor: [99, 102, 241],
            textColor: 255,
            fontStyle: "bold",
        },

        columnStyles: {
            0: { cellWidth: 28 },  // Date
            1: { cellWidth: 60 },  // Description
            2: { cellWidth: 40 },  // Event
            3: { cellWidth: 45 },  // ✅ Amount (INCREASE THIS)
        },

        alternateRowStyles: {
            fillColor: [248, 250, 252],
        },

        didParseCell: function (data) {
            if (data.column.index === 3) {
                if (data.cell.raw.includes("+")) {
                    data.cell.styles.textColor = [34, 197, 94];
                } else {
                    data.cell.styles.textColor = [239, 68, 68];
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