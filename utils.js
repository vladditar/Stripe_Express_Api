const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const createAndSendInvoice = async (invoiceItemId) => {
  try {
    // Retrieve the invoice item
    const invoiceItem = await stripe.invoiceItems.retrieve(invoiceItemId);

    // Create an invoice
    const invoice = await stripe.invoices.create({
      customer: invoiceItem.customer,
      collection_method: 'send_invoice',
      days_until_due: 30,
      description: 'Invoice for Sunglasses',
      invoice_items: [invoiceItem.id],
    });

    // Send the invoice
    await stripe.invoices.sendInvoice(invoice.id);

    console.log('Invoice sent successfully:', invoice.id);
  } catch (error) {
    console.error('Error creating or sending invoice:', error);
  }
};
const calculatePrice = (color) => {
  switch (color) {
    case 'Blue':
      return 1000;
    case 'Red':
      return 2000;
    case 'Black':
      return 3000;
    default:
      return 100;
  }
};

module.exports = { createAndSendInvoice, calculatePrice };
