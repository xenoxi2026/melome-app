// SMS notification service using Twilio
// You'll need to sign up for Twilio and get credentials

const TWILIO_ACCOUNT_SID = 'YOUR_TWILIO_ACCOUNT_SID';
const TWILIO_AUTH_TOKEN = 'YOUR_TWILIO_AUTH_TOKEN';
const TWILIO_PHONE_NUMBER = '+1234567890'; // Your Twilio phone number

// Send SMS notification
export const sendSMS = async (to, message) => {
  // For demo/local development, we'll log and store in localStorage
  // In production, this would call Twilio API
  
  console.log(`ðŸ“± SENDING SMS to: ${to}`);
  console.log(`Message: ${message}`);
  
  // Store notification in localStorage for demo
  const notifications = JSON.parse(localStorage.getItem('melome_sms') || '[]');
  notifications.push({
    id: Date.now(),
    type: 'sms',
    to,
    message,
    createdAt: new Date().toISOString(),
    status: 'sent'
  });
  localStorage.setItem('melome_sms', JSON.stringify(notifications));
  
  // In production, uncomment this:
  /*
  try {
    const client = require('twilio')(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);
    const response = await client.messages.create({
      body: message,
      from: TWILIO_PHONE_NUMBER,
      to: to
    });
    return { success: true, sid: response.sid };
  } catch (error) {
    console.error('SMS send failed:', error);
    return { success: false, error };
  }
  */
  
  return { success: true };
};

// SMS templates for different milestones
export const smsTemplates = {
  quoteReceived: (quoteId) => 
    `Melome Logistics: Quote ${quoteId} received. We'll respond within 2 hours. Track status: https://melome-web.netlify.app/portal/dashboard`,
  
  paymentConfirmed: (orderId, trackingNumber) => 
    `Melome Logistics: Payment confirmed for order ${orderId}. Tracking: ${trackingNumber}. Track here: https://melome-web.netlify.app/portal/tracking?order=${trackingNumber}`,
  
  shipmentDispatched: (orderId, trackingNumber) => 
    `Melome Logistics: Your shipment ${orderId} is on the way! Track live: https://melome-web.netlify.app/portal/tracking?order=${trackingNumber}`,
  
  delivered: (orderId) => 
    `Melome Logistics: Order ${orderId} has been delivered successfully. Thank you for choosing Melome!`,
  
  outForDelivery: (orderId) => 
    `Melome Logistics: Your shipment ${orderId} is out for delivery. Expect delivery today. Track: https://melome-web.netlify.app/portal/tracking?order=${orderId}`
};