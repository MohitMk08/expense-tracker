import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import html2canvas from "html2canvas";
import "../utils/fonts/NotoSans";
import { convertFromINR } from "../services/currencyService";

const CHART_COLORS = [
    [99, 102, 241],   // indigo
    [34, 197, 94],    // green
    [239, 68, 68],    // red
    [245, 158, 11],   // amber
    [59, 130, 246],   // blue
    [168, 85, 247],   // purple
    [20, 184, 166],   // teal
];

export const exportToPDF = async (
    expenses,
    summary,
    selectedEvent,
    currency = "INR",
    user,
    rates
) => {

    const currencySymbolMap = {
        INR: "₹",
        USD: "$",
        EUR: "€",
        GBP: "£",
    };

    const symbol = currencySymbolMap[currency] || "₹";

    const convert = (amount) => {
        return rates
            ? convertFromINR(amount, currency, rates)
            : amount;
    };

    const formatCurrency = (amount) => {
        const val = convert(amount);
        return `${symbol} ${Number(val).toLocaleString("en-IN")}`;
    };

    const doc = new jsPDF();
    doc.setFont("NotoSans", "normal");

    const pageWidth = doc.internal.pageSize.getWidth();

    const primaryColor = [99, 102, 241];
    const secondaryColor = [168, 85, 247];

    const loadImage = (src) =>
        new Promise((resolve) => {
            const img = new Image();
            img.src = src;
            img.onload = () => resolve(img);
        });

    const logo = await loadImage("/EXP-Logo.png");

    // ---------------- HEADER ----------------
    doc.setFontSize(20);
    doc.setTextColor(...primaryColor);
    doc.text("Expense Tracker", 14, 18);

    doc.setFontSize(11);
    doc.setTextColor(...secondaryColor);
    doc.text("Smart Financial Report", 14, 25);

    doc.setFontSize(10);
    doc.setTextColor(120);
    doc.text(`User: ${user?.email || "N/A"}`, 14, 32);
    doc.text(`Event: ${selectedEvent}`, 14, 38);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 14, 44);

    doc.addImage(logo, "PNG", pageWidth - 30, 10, 16, 16);

    // ---------------- SUMMARY ----------------
    const startY = 55;

    const totalCredit = convert(summary.totalCredit);
    const totalExpense = convert(summary.totalExpense);
    const balance = totalCredit - totalExpense;

    doc.setFillColor(245, 247, 250);
    doc.roundedRect(14, startY, 180, 30, 4, 4, "F");

    doc.setFontSize(11);

    doc.setTextColor(34, 197, 94);
    doc.text(`Credit: ${symbol} ${totalCredit.toFixed(2)}`, 18, startY + 12);

    doc.setTextColor(239, 68, 68);
    doc.text(`Expense: ${symbol} ${totalExpense.toFixed(2)}`, 18, startY + 22);

    doc.setTextColor(...primaryColor);
    doc.text(`Balance: ${symbol} ${balance.toFixed(2)}`, 110, startY + 17);

    // ---------------- FINTECH CHART ----------------
    let chartY = startY + 45;

    const categoryMap = {};

    expenses.forEach((e) => {
        if ((e.type || "expense") !== "expense") return;

        const key = (e.event || "general").trim();
        categoryMap[key] = (categoryMap[key] || 0) + convert(e.amount);
    });

    const sorted = Object.entries(categoryMap)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 6);

    if (sorted.length > 0) {

        const total = sorted.reduce((sum, [, v]) => sum + v, 0);
        const maxValue = Math.max(...sorted.map(([, v]) => v));

        const startX = 14;
        const cardWidth = 180;

        doc.setFillColor(248, 250, 255);
        doc.roundedRect(startX, chartY, cardWidth, 85, 6, 6, "F");

        doc.setFontSize(12);
        doc.setTextColor(30);
        doc.text("Spending Insights", startX + 8, chartY + 12);

        let rowY = chartY + 22;

        sorted.forEach(([cat, val], index) => {

            const percent = ((val / total) * 100).toFixed(1);
            const color = CHART_COLORS[index % CHART_COLORS.length];

            const leftX = startX + 8;
            const rightX = startX + cardWidth - 8;

            // CATEGORY
            doc.setFontSize(9);
            doc.setTextColor(60);
            doc.text(`${index + 1}. ${cat}`, leftX, rowY);

            // VALUE
            doc.setFontSize(9);
            doc.setTextColor(30);
            doc.text(
                `${symbol}${val.toFixed(0)}`,
                rightX,
                rowY,
                { align: "right" }
            );

            // BAR AREA
            const barY = rowY + 4;
            const barHeight = 5;

            const barLeft = leftX;
            const barRight = rightX - 22;
            const barWidth = barRight - barLeft;

            // 🔲 OUTLINE (HOLLOW)
            doc.setDrawColor(...color);
            doc.setLineWidth(0.5);
            doc.roundedRect(barLeft, barY, barWidth, barHeight, 2, 2);

            // 🔥 FIXED: 100% SCALE BASED ON TOTAL (NOT MAX)
            const fillWidth = (val / total) * barWidth;

            doc.setFillColor(...color);
            doc.roundedRect(barLeft, barY, fillWidth, barHeight, 2, 2, "F");

            // PERCENT
            doc.setFontSize(8);
            doc.setTextColor(100);
            doc.text(
                `${percent}%`,
                rightX,
                barY + 4,
                { align: "right" }
            );

            rowY += 16;
        });

        chartY += 95;
    }

    // ---------------- TABLE ----------------
    const tableData = expenses.map((e) => {
        const converted = convert(e.amount);

        return [
            new Date(
                e.createdAt?.seconds
                    ? e.createdAt.seconds * 1000
                    : Date.now()
            ).toLocaleDateString(),
            e.description,
            e.event || "general",
            e.type === "credit"
                ? `+ ${symbol} ${converted.toFixed(2)}`
                : `- ${symbol} ${converted.toFixed(2)}`
        ];
    });

    autoTable(doc, {
        startY: chartY,
        head: [["Date", "Description", "Event", "Amount"]],
        body: tableData,

        styles: {
            font: "NotoSans",
            fontSize: 10,
            cellPadding: 4,
        },

        headStyles: {
            fillColor: primaryColor,
            textColor: 255,
        },

        columnStyles: {
            0: { cellWidth: 28 },
            1: { cellWidth: 60 },
            2: { cellWidth: 40 },
            3: { cellWidth: 45 },
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

    // ---------------- FOOTER ----------------
    const pageHeight = doc.internal.pageSize.height;

    doc.setFontSize(9);
    doc.setTextColor(150);
    doc.text(
        `Generated on ${new Date().toLocaleString()}`,
        14,
        pageHeight - 10
    );

    doc.save(`Expense_Report_${selectedEvent}.pdf`);
};