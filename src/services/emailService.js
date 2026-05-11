// Email notification service using SendGrid
// You'll need to sign up for SendGrid and get an API key

const SENDGRID_API_KEY = 'YOUR_SENDGRID_API_KEY'; // Replace with your actual key
const FROM_EMAIL = 'notifications@melome.co.za';
const FROM_NAME = 'Melome Logistics';

// Send email notification
export const sendEmail = async (to, subject, htmlContent, textContent) => {
  // For demo/local development, we'll log and store in localStorage
  // In production, this would call SendGrid API
  
  console.log(`ðŸ“§ SENDING EMAIL to: ${to}`);
  console.log(`Subject: ${subject}`);
  console.log(`Content: ${textContent || htmlContent}`);
  
  // Store notification in localStorage for demo
  const notifications = JSON.parse(localStorage.getItem('melome_notifications') || '[]');
  notifications.push({
    id: Date.now(),
    type: 'email',
    to,
    subject,
    content: textContent || htmlContent,
    createdAt: new Date().toISOString(),
    status: 'sent'
  });
  localStorage.setItem('melome_notifications', JSON.stringify(notifications));
  
  // In production, uncomment this:
  /*
  try {
    const response = await axios.post('https://api.sendgrid.com/v3/mail/send', {
      personalizations: [{ to: [{ email: to }] }],
      from: { email: FROM_EMAIL, name: FROM_NAME },
      subject: subject,
      content: [
        { type: 'text/plain', value: textContent },
        { type: 'text/html', value: htmlContent }
      ]
    }, {
      headers: {
        'Authorization': `Bearer ${SENDGRID_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });
    return { success: true };
  } catch (error) {
    console.error('Email send failed:', error);
    return { success: false, error };
  }
  */
  
  return { success: true };
};

// Email templates for different milestones
export const emailTemplates = {
  // Quote Submitted
  quoteReceived: (clientName, quoteId, amount) => ({
    subject: `Quote Received: ${quoteId} - Melome Logistics`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #10b981; padding: 20px; text-align: center;">
          <h1 style="color: white; margin: 0;">Melome Logistics</h1>
        </div>
        <div style="padding: 20px; border: 1px solid #e2e8f0;">
          <h2>Quote Received âœ“</h2>
          <p>Dear ${clientName},</p>
          <p>Thank you for your logistics request. We have received your quote and our team will review it shortly.</p>
          <div style="background: #f7fafc; padding: 15px; margin: 20px 0;">
            <p><strong>Quote Reference:</strong> ${quoteId}</p>
            <p><strong>Estimated Amount:</strong> R${amount?.toLocaleString()}</p>
          </div>
          <p>You will receive a response within 2 hours.</p>
          <a href="https://melome-web.netlify.app/portal/dashboard" style="background: #10b981; color: white; padding: 10px 20px; text-decoration: none; display: inline-block; margin-top: 15px;">View Quote Status</a>
          <hr style="margin: 20px 0; border: none; border-top: 1px solid #e2e8f0;" />
          <p style="color: #718096; font-size: 12px;">Melome Logistics | Moving your business forward</p>
        </div>
      </div>
    `,
    text: `Melome Logistics\n\nQuote Received: ${quoteId}\n\nDear ${clientName},\n\nThank you for your logistics request. We have received your quote (${quoteId}) for R${amount?.toLocaleString()} and will respond within 2 hours.\n\nView status: https://melome-web.netlify.app/portal/dashboard`
  }),

  // Payment Confirmed
  paymentConfirmed: (clientName, orderId, trackingNumber) => ({
    subject: `Payment Confirmed - Order ${orderId}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #10b981; padding: 20px; text-align: center;">
          <h1 style="color: white; margin: 0;">Payment Confirmed âœ“</h1>
        </div>
        <div style="padding: 20px; border: 1px solid #e2e8f0;">
          <h2>Your payment has been received</h2>
          <p>Dear ${clientName},</p>
          <p>Thank you for your payment. Your order has been confirmed and is now being processed.</p>
          <div style="background: #f7fafc; padding: 15px; margin: 20px 0;">
            <p><strong>Order Reference:</strong> ${orderId}</p>
            <p><strong>Tracking Number:</strong> ${trackingNumber}</p>
          </div>
          <p>You will receive updates when your shipment is dispatched.</p>
          <a href="https://melome-web.netlify.app/portal/tracking?order=${trackingNumber}" style="background: #10b981; color: white; padding: 10px 20px; text-decoration: none; display: inline-block; margin-top: 15px;">Track Shipment</a>
          <hr style="margin: 20px 0; border: none; border-top: 1px solid #e2e8f0;" />
          <p style="color: #718096; font-size: 12px;">Melome Logistics | Moving your business forward</p>
        </div>
      </div>
    `,
    text: `Payment Confirmed - Order ${orderId}\n\nDear ${clientName},\n\nYour payment has been received. Your order is confirmed.\n\nTracking: ${trackingNumber}\n\nTrack here: https://melome-web.netlify.app/portal/tracking?order=${trackingNumber}`
  }),

  // Shipment Dispatched
  shipmentDispatched: (clientName, orderId, trackingNumber, estimatedDelivery) => ({
    subject: `Your Shipment is On The Way - ${orderId}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #3b82f6; padding: 20px; text-align: center;">
          <h1 style="color: white; margin: 0;">Shipment Dispatched ðŸšš</h1>
        </div>
        <div style="padding: 20px; border: 1px solid #e2e8f0;">
          <h2>Your order is on the way!</h2>
          <p>Dear ${clientName},</p>
          <p>Great news! Your shipment has been dispatched and is now in transit.</p>
          <div style="background: #f7fafc; padding: 15px; margin: 20px 0;">
            <p><strong>Order Reference:</strong> ${orderId}</p>
            <p><strong>Tracking Number:</strong> ${trackingNumber}</p>
            <p><strong>Estimated Delivery:</strong> ${estimatedDelivery || '2-3 business days'}</p>
          </div>
          <p>You can track your shipment in real-time.</p>
          <a href="https://melome-web.netlify.app/portal/tracking?order=${trackingNumber}" style="background: #3b82f6; color: white; padding: 10px 20px; text-decoration: none; display: inline-block; margin-top: 15px;">Live Tracking â†’</a>
          <hr style="margin: 20px 0; border: none; border-top: 1px solid #e2e8f0;" />
          <p style="color: #718096; font-size: 12px;">Melome Logistics | Securing the North-South Corridor</p>
        </div>
      </div>
    `,
    text: `Shipment Dispatched - ${orderId}\n\nDear ${clientName},\n\nYour shipment is on the way!\n\nTracking: ${trackingNumber}\nEstimated Delivery: ${estimatedDelivery || '2-3 business days'}\n\nTrack here: https://melome-web.netlify.app/portal/tracking?order=${trackingNumber}`
  }),

  // Delivered
  delivered: (clientName, orderId, trackingNumber, podUrl) => ({
    subject: `Delivered âœ“ - Order ${orderId}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #10b981; padding: 20px; text-align: center;">
          <h1 style="color: white; margin: 0;">Delivered Successfully âœ“</h1>
        </div>
        <div style="padding: 20px; border: 1px solid #e2e8f0;">
          <h2>Your shipment has been delivered</h2>
          <p>Dear ${clientName},</p>
          <p>Your shipment has been successfully delivered to the destination.</p>
          <div style="background: #f7fafc; padding: 15px; margin: 20px 0;">
            <p><strong>Order Reference:</strong> ${orderId}</p>
            <p><strong>Tracking Number:</strong> ${trackingNumber}</p>
            <p><strong>Status:</strong> Delivered âœ“</p>
          </div>
          <p>Thank you for choosing Melome Logistics.</p>
          <a href="https://melome-web.netlify.app/portal/orders" style="background: #10b981; color: white; padding: 10px 20px; text-decoration: none; display: inline-block; margin-top: 15px;">View Order History</a>
          <hr style="margin: 20px 0; border: none; border-top: 1px solid #e2e8f0;" />
          <p style="color: #718096; font-size: 12px;">Melome Logistics | Moving your business forward</p>
        </div>
      </div>
    `,
    text: `Delivered âœ“ - ${orderId}\n\nDear ${clientName},\n\nYour shipment has been successfully delivered.\n\nTracking: ${trackingNumber}\n\nThank you for choosing Melome Logistics.`
  })
};