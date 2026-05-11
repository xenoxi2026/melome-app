import io from 'socket.io-client';

const SOCKET_URL = process.env.REACT_APP_SOCKET_URL || 'http://localhost:5000';

let socket = null;

export const initializeSocket = () => {
  socket = io(SOCKET_URL, {
    auth: {
      token: localStorage.getItem('authToken')
    }
  });

  socket.on('connect', () => {
    console.log('Socket connected:', socket.id);
  });

  socket.on('disconnect', () => {
    console.log('Socket disconnected');
  });

  socket.on('error', (error) => {
    console.error('Socket error:', error);
  });

  return socket;
};

export const getSocket = () => {
  if (!socket) {
    return initializeSocket();
  }
  return socket;
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};

// Real-time tracking events
export const subscribeToTracking = (orderId, callback) => {
  const socket = getSocket();
  socket.emit('subscribe_tracking', orderId);
  socket.on(`tracking_${orderId}`, callback);
};

export const unsubscribeFromTracking = (orderId) => {
  const socket = getSocket();
  socket.emit('unsubscribe_tracking', orderId);
  socket.off(`tracking_${orderId}`);
};

export default socket;
