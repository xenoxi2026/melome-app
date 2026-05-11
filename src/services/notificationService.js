import { sendEmail, emailTemplates } from './emailService';
import { sendSMS, smsTemplates } from './smsService';

// Send notifications for different milestones
export const notifyQuoteReceived = async (client, quote) => {
  const { email, phone, name } = client;
  const { id, estimatedPrice } = quote;
  
  // Send email
  const emailTemplate = emailTemplates.quoteReceived(name, id, estimatedPrice);
  await sendEmail(email, emailTemplate.subject, emailTemplate.html, emailTemplate.text);
  
  // Send SMS if phone number exists
  if (phone) {
    const smsMessage = smsTemplates.quoteReceived(id);
    await sendSMS(phone, smsMessage);
  }
  
  return { emailSent: true, smsSent: !!phone };
};

export const notifyPaymentConfirmed = async (client, order) => {
  const { email, phone, name } = client;
  const { id, trackingNumber } = order;
  
  // Send email
  const emailTemplate = emailTemplates.paymentConfirmed(name, id, trackingNumber);
  await sendEmail(email, emailTemplate.subject, emailTemplate.html, emailTemplate.text);
  
  // Send SMS
  if (phone) {
    const smsMessage = smsTemplates.paymentConfirmed(id, trackingNumber);
    await sendSMS(phone, smsMessage);
  }
  
  return { emailSent: true, smsSent: !!phone };
};

export const notifyShipmentDispatched = async (client, order, estimatedDelivery) => {
  const { email, phone, name } = client;
  const { id, trackingNumber } = order;
  
  // Send email
  const emailTemplate = emailTemplates.shipmentDispatched(name, id, trackingNumber, estimatedDelivery);
  await sendEmail(email, emailTemplate.subject, emailTemplate.html, emailTemplate.text);
  
  // Send SMS
  if (phone) {
    const smsMessage = smsTemplates.shipmentDispatched(id, trackingNumber);
    await sendSMS(phone, smsMessage);
  }
  
  return { emailSent: true, smsSent: !!phone };
};

export const notifyDelivered = async (client, order) => {
  const { email, phone, name } = client;
  const { id, trackingNumber, podUrl } = order;
  
  // Send email
  const emailTemplate = emailTemplates.delivered(name, id, trackingNumber, podUrl);
  await sendEmail(email, emailTemplate.subject, emailTemplate.html, emailTemplate.text);
  
  // Send SMS
  if (phone) {
    const smsMessage = smsTemplates.delivered(id);
    await sendSMS(phone, smsMessage);
  }
  
  return { emailSent: true, smsSent: !!phone };
};

// Get client details from user ID
export const getClientDetails = (userId) => {
  const users = JSON.parse(localStorage.getItem('melome_users') || '[]');
  const user = users.find(u => u.id === userId);
  return user || null;
};