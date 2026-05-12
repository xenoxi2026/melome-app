// Combined notification service for email, SMS, and in-app notifications
import { sendEmail, emailTemplates } from './emailService';
import { sendSMS, smsTemplates } from './smsService';

// Send all notifications for a quote
export const notifyQuoteReceived = async (client, quote) => {
  const promises = [];
  
  if (client.email) {
    // Send Email
    const emailTemplate = emailTemplates.quoteReceived(client.name, quote.id, quote.estimatedPrice);
    promises.push(sendEmail(client.email, emailTemplate.subject, emailTemplate.html, emailTemplate.text));
  }
  
  // Send SMS
  if (client.phone) {
    const smsMessage = smsTemplates.quoteReceived(quote.id);
    promises.push(sendSMS(client.phone, smsMessage));
  }
  
  // Store in-app notification
  const notifications = JSON.parse(localStorage.getItem('melome_notifications') || '[]');
  notifications.unshift({
    id: Date.now(),
    type: 'quote_received',
    title: 'Quote Request Received',
    message: `Your quote ${quote.id} has been received. We'll respond within 2 hours.`,
    read: false,
    createdAt: new Date().toISOString(),
    data: { quoteId: quote.id }
  });
  localStorage.setItem('melome_notifications', JSON.stringify(notifications.slice(0, 100)));
  
  await Promise.all(promises);
  return { emailSent: !!client.email, smsSent: !!client.phone };
};

// Send payment confirmation notifications
export const notifyPaymentConfirmed = async (client, order) => {
  const promises = [];
  
  if (client.email) {
    const emailTemplate = emailTemplates.paymentConfirmed(client.name, order.id, order.trackingNumber);
    promises.push(sendEmail(client.email, emailTemplate.subject, emailTemplate.html, emailTemplate.text));
  }
  
  if (client.phone) {
    const smsMessage = smsTemplates.paymentConfirmed(order.id, order.trackingNumber);
    promises.push(sendSMS(client.phone, smsMessage));
  }
  
  // Store in-app notification
  const notifications = JSON.parse(localStorage.getItem('melome_notifications') || '[]');
  notifications.unshift({
    id: Date.now(),
    type: 'payment_confirmed',
    title: 'Payment Confirmed',
    message: `Your payment for order ${order.id} has been confirmed.`,
    read: false,
    createdAt: new Date().toISOString(),
    data: { orderId: order.id, trackingNumber: order.trackingNumber }
  });
  localStorage.setItem('melome_notifications', JSON.stringify(notifications.slice(0, 100)));
  
  await Promise.all(promises);
  return { emailSent: !!client.email, smsSent: !!client.phone };
};

// Send shipment dispatched notification
export const notifyShipmentDispatched = async (client, order, estimatedDelivery) => {
  const promises = [];
  
  if (client.email) {
    const emailTemplate = emailTemplates.shipmentDispatched(client.name, order.id, order.trackingNumber, estimatedDelivery);
    promises.push(sendEmail(client.email, emailTemplate.subject, emailTemplate.html, emailTemplate.text));
  }
  
  if (client.phone) {
    const smsMessage = smsTemplates.shipmentDispatched(order.id, order.trackingNumber);
    promises.push(sendSMS(client.phone, smsMessage));
  }
  
  // Store in-app notification
  const notifications = JSON.parse(localStorage.getItem('melome_notifications') || '[]');
  notifications.unshift({
    id: Date.now(),
    type: 'shipment_dispatched',
    title: 'Shipment Dispatched',
    message: `Your shipment ${order.trackingNumber} is on the way!`,
    read: false,
    createdAt: new Date().toISOString(),
    data: { orderId: order.id, trackingNumber: order.trackingNumber }
  });
  localStorage.setItem('melome_notifications', JSON.stringify(notifications.slice(0, 100)));
  
  await Promise.all(promises);
  return { emailSent: !!client.email, smsSent: !!client.phone };
};

// Send delivery confirmation notification
export const notifyDelivered = async (client, order) => {
  const promises = [];
  
  if (client.email) {
    const emailTemplate = emailTemplates.delivered(client.name, order.id, order.trackingNumber);
    promises.push(sendEmail(client.email, emailTemplate.subject, emailTemplate.html, emailTemplate.text));
  }
  
  if (client.phone) {
    const smsMessage = smsTemplates.delivered(order.id);
    promises.push(sendSMS(client.phone, smsMessage));
  }
  
  // Store in-app notification
  const notifications = JSON.parse(localStorage.getItem('melome_notifications') || '[]');
  notifications.unshift({
    id: Date.now(),
    type: 'delivered',
    title: 'Package Delivered',
    message: `Your shipment ${order.trackingNumber} has been delivered successfully!`,
    read: false,
    createdAt: new Date().toISOString(),
    data: { orderId: order.id, trackingNumber: order.trackingNumber }
  });
  localStorage.setItem('melome_notifications', JSON.stringify(notifications.slice(0, 100)));
  
  await Promise.all(promises);
  return { emailSent: !!client.email, smsSent: !!client.phone };
};

// Get client details from user ID
export const getClientDetails = (userId) => {
  const users = JSON.parse(localStorage.getItem('melome_users') || '[]');
  const user = users.find(u => u.id === userId);
  return user || null;
};

// Get all notifications for a user
export const getNotifications = () => {
  return JSON.parse(localStorage.getItem('melome_notifications') || '[]');
};

// Mark notification as read
export const markNotificationRead = (notificationId) => {
  const notifications = JSON.parse(localStorage.getItem('melome_notifications') || '[]');
  const updated = notifications.map(n => 
    n.id === notificationId ? { ...n, read: true } : n
  );
  localStorage.setItem('melome_notifications', JSON.stringify(updated));
  return updated;
};

// Get unread count
export const getUnreadCount = () => {
  const notifications = JSON.parse(localStorage.getItem('melome_notifications') || '[]');
  return notifications.filter(n => !n.read).length;
};