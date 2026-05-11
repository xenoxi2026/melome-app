import AsyncStorage from '@react-native-async-storage/async-storage';

// Keys for storage
const KEYS = {
  USER: '@melome_driver_user',
  ASSIGNED_ORDERS: '@melome_assigned_orders',
  SYNC_QUEUE: '@melome_sync_queue',
  COMPLETED_ORDERS: '@melome_completed_orders'
};

// Save user data locally
export const saveUser = async (user) => {
  try {
    await AsyncStorage.setItem(KEYS.USER, JSON.stringify(user));
    return true;
  } catch (error) {
    console.error('Error saving user:', error);
    return false;
  }
};

// Get user data
export const getUser = async () => {
  try {
    const user = await AsyncStorage.getItem(KEYS.USER);
    return user ? JSON.parse(user) : null;
  } catch (error) {
    console.error('Error getting user:', error);
    return null;
  }
};

// Save assigned orders locally
export const saveAssignedOrders = async (orders) => {
  try {
    await AsyncStorage.setItem(KEYS.ASSIGNED_ORDERS, JSON.stringify(orders));
    return true;
  } catch (error) {
    console.error('Error saving orders:', error);
    return false;
  }
};

// Get assigned orders
export const getAssignedOrders = async () => {
  try {
    const orders = await AsyncStorage.getItem(KEYS.ASSIGNED_ORDERS);
    return orders ? JSON.parse(orders) : [];
  } catch (error) {
    console.error('Error getting orders:', error);
    return [];
  }
};

// Add to sync queue (for offline actions)
export const addToSyncQueue = async (action) => {
  try {
    const queue = await AsyncStorage.getItem(KEYS.SYNC_QUEUE);
    const syncQueue = queue ? JSON.parse(queue) : [];
    syncQueue.push({
      ...action,
      id: Date.now(),
      timestamp: new Date().toISOString()
    });
    await AsyncStorage.setItem(KEYS.SYNC_QUEUE, JSON.stringify(syncQueue));
    return true;
  } catch (error) {
    console.error('Error adding to queue:', error);
    return false;
  }
};

// Get sync queue
export const getSyncQueue = async () => {
  try {
    const queue = await AsyncStorage.getItem(KEYS.SYNC_QUEUE);
    return queue ? JSON.parse(queue) : [];
  } catch (error) {
    console.error('Error getting queue:', error);
    return [];
  }
};

// Clear sync queue
export const clearSyncQueue = async () => {
  try {
    await AsyncStorage.setItem(KEYS.SYNC_QUEUE, JSON.stringify([]));
    return true;
  } catch (error) {
    console.error('Error clearing queue:', error);
    return false;
  }
};

// Save completed order for history
export const saveCompletedOrder = async (order) => {
  try {
    const completed = await AsyncStorage.getItem(KEYS.COMPLETED_ORDERS);
    const completedOrders = completed ? JSON.parse(completed) : [];
    completedOrders.push(order);
    await AsyncStorage.setItem(KEYS.COMPLETED_ORDERS, JSON.stringify(completedOrders));
    return true;
  } catch (error) {
    console.error('Error saving completed order:', error);
    return false;
  }
};