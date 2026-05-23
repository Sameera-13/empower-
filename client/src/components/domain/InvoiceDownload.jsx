import { jsPDF } from 'jspdf';

export default function InvoiceDownload({ order }) {
  const handleDownload = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    let y = 20;

    // Header
    doc.setFontSize(20);
    doc.setFont('helvetica', 'bold');
    doc.text('Empower Stop', pageWidth / 2, y, { align: 'center' });
    y += 8;
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text('Invoice / Receipt', pageWidth / 2, y, { align: 'center' });
    y += 15;

    // Order info
    doc.setFontSize(10);
    doc.text(`Order ID: ${order._id}`, 20, y);
    doc.text(`Date: ${new Date(order.createdAt).toLocaleDateString('en-IN')}`, pageWidth - 20, y, { align: 'right' });
    y += 6;
    doc.text(`Payment ID: ${order.razorpayPaymentId || 'N/A'}`, 20, y);
    doc.text(`Status: ${order.status.charAt(0).toUpperCase() + order.status.slice(1)}`, pageWidth - 20, y, { align: 'right' });
    y += 10;

    // Shipping address
    const addr = order.shippingAddress;
    doc.setFont('helvetica', 'bold');
    doc.text('Ship To:', 20, y);
    y += 5;
    doc.setFont('helvetica', 'normal');
    doc.text(`${addr.name}, ${addr.phone}`, 20, y); y += 5;
    doc.text(`${addr.address}, ${addr.city}`, 20, y); y += 5;
    doc.text(`${addr.state} - ${addr.pincode}`, 20, y); y += 12;

    // Table header
    doc.setFont('helvetica', 'bold');
    doc.setFillColor(245, 245, 245);
    doc.rect(20, y - 4, pageWidth - 40, 8, 'F');
    doc.text('Item', 22, y);
    doc.text('Qty', 120, y);
    doc.text('Price', 145, y);
    doc.text('Total', pageWidth - 22, y, { align: 'right' });
    y += 8;

    // Items
    doc.setFont('helvetica', 'normal');
    order.items.forEach((item) => {
      const title = item.title.length > 40 ? item.title.substring(0, 40) + '...' : item.title;
      doc.text(title, 22, y);
      doc.text(String(item.quantity), 123, y);
      doc.text(`${item.price}`, 145, y);
      doc.text(`${(item.price * item.quantity).toLocaleString('en-IN')}`, pageWidth - 22, y, { align: 'right' });
      y += 7;
    });

    y += 5;
    doc.setDrawColor(200);
    doc.line(20, y, pageWidth - 20, y);
    y += 8;

    // Totals
    const subtotal = order.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    doc.text('Subtotal:', 120, y);
    doc.text(`${subtotal.toLocaleString('en-IN')}`, pageWidth - 22, y, { align: 'right' });
    y += 6;

    if (order.couponDiscount > 0) {
      doc.setTextColor(107, 203, 119);
      doc.text(`Coupon (${order.couponCode}):`, 120, y);
      doc.text(`-${order.couponDiscount.toLocaleString('en-IN')}`, pageWidth - 22, y, { align: 'right' });
      y += 6;
      doc.setTextColor(0);
    }

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.text('Total:', 120, y);
    doc.text(`Rs. ${order.totalAmount.toLocaleString('en-IN')}`, pageWidth - 22, y, { align: 'right' });

    doc.save(`EmpowerStop-Invoice-${order._id}.pdf`);
  };

  return (
    <button
      onClick={handleDownload}
      className="inline-flex items-center gap-1.5 text-sm text-[#FF6B9D] hover:text-[#FF6B9D]/80 font-medium transition-colors"
    >
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
      Download Invoice
    </button>
  );
}
