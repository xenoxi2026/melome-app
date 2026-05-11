import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  RefreshControl,
  Alert
} from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import { getAssignedOrders, saveAssignedOrders, addToSyncQueue } from '../storage/offlineStorage';
import io from 'socket.io-client';

const DriverDashboard = ({ navigation }) => {
  const [orders, setOrders] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // Check network status
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsOnline(state.isConnected);
    });

    loadOrders();
    connectSocket();

    return () => {
      unsubscribe();
      if (socket) socket.disconnect();
    };
  }, []);

  const connectSocket = () => {
    const newSocket = io('https://melome-web.netlify.app', {
      transports: ['websocket'],
      autoConnect: true
    });
    setSocket(newSocket);
  };

  const loadOrders = async () => {
    const storedOrders = await getAssignedOrders();
    setOrders(storedOrders);
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadOrders();
    setRefreshing(false);
  }, []);

  const updateOrderStatus = async (orderId, newStatus) => {
    const updatedOrders = orders.map(order =>
      order.id === orderId ? { ...order, status: newStatus } : order
    );
    setOrders(updatedOrders);
    await saveAssignedOrders(updatedOrders);

    // If offline, add to sync queue
    if (!isOnline) {
      await addToSyncQueue({
        type: 'UPDATE_STATUS',
        orderId,
        status: newStatus,
        timestamp: new Date().toISOString()
      });
      Alert.alert('Offline Mode', 'Status saved. Will sync when online.');
    } else {
      // Send to server
      try {
        // API call to update status
        console.log(`Updating order ${orderId} to ${newStatus}`);
        Alert.alert('Success', `Order status updated to ${newStatus}`);
      } catch (error) {
        Alert.alert('Error', 'Failed to update status');
      }
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return '#f59e0b';
      case 'assigned': return '#8b5cf6';
      case 'picked-up': return '#3b82f6';
      case 'in-transit': return '#3b82f6';
      case 'delivered': return '#10b981';
      default: return '#64748b';
    }
  };

  const renderOrder = ({ item }) => (
    <TouchableOpacity
      style={styles.orderCard}
      onPress={() => navigation.navigate('OrderDetail', { order: item, updateOrderStatus })}
    >
      <View style={styles.orderHeader}>
        <Text style={styles.orderId}>{item.id}</Text>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) }]}>
          <Text style={styles.statusText}>{item.status}</Text>
        </View>
      </View>

      <View style={styles.orderDetails}>
        <Text style={styles.route}>ðŸ“ {item.pickup?.city || 'JHB'} â†’ ðŸ“¦ {item.delivery?.city || 'CPT'}</Text>
        <Text style={styles.amount}>R{item.amount?.toLocaleString()}</Text>
      </View>

      <View style={styles.actionButtons}>
        {item.status === 'assigned' && (
          <TouchableOpacity
            style={[styles.actionBtn, styles.pickupBtn]}
            onPress={() => updateOrderStatus(item.id, 'picked-up')}
          >
            <Text style={styles.actionBtnText}>Confirm Pickup</Text>
          </TouchableOpacity>
        )}
        {item.status === 'picked-up' && (
          <TouchableOpacity
            style={[styles.actionBtn, styles.transitBtn]}
            onPress={() => updateOrderStatus(item.id, 'in-transit')}
          >
            <Text style={styles.actionBtnText}>Start Delivery</Text>
          </TouchableOpacity>
        )}
        {item.status === 'in-transit' && (
          <TouchableOpacity
            style={[styles.actionBtn, styles.deliverBtn]}
            onPress={() => updateOrderStatus(item.id, 'delivered')}
          >
            <Text style={styles.actionBtnText}>Mark Delivered</Text>
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Deliveries</Text>
        <View style={[styles.onlineBadge, { backgroundColor: isOnline ? '#10b981' : '#ef4444' }]}>
          <Text style={styles.onlineText}>{isOnline ? 'â— Online' : 'â— Offline'}</Text>
        </View>
      </View>

      <FlatList
        data={orders}
        renderItem={renderOrder}
        keyExtractor={(item) => item.id}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#10b981" />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No assigned orders</Text>
            <Text style={styles.emptySubtext}>Pull down to refresh</Text>
          </View>
        }
        contentContainerStyle={orders.length === 0 ? styles.emptyList : null}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a'
  },
  header: {
    backgroundColor: '#1e293b',
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#334155'
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white'
  },
  onlineBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20
  },
  onlineText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600'
  },
  orderCard: {
    backgroundColor: '#1e293b',
    marginHorizontal: 16,
    marginTop: 16,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#334155'
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12
  },
  orderId: {
    color: '#10b981',
    fontSize: 14,
    fontFamily: 'monospace'
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20
  },
  statusText: {
    color: 'white',
    fontSize: 11,
    fontWeight: '600'
  },
  orderDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12
  },
  route: {
    color: '#cbd5e1',
    fontSize: 14
  },
  amount: {
    color: '#10b981',
    fontSize: 16,
    fontWeight: 'bold'
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12
  },
  actionBtn: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center'
  },
  pickupBtn: {
    backgroundColor: '#3b82f6'
  },
  transitBtn: {
    backgroundColor: '#8b5cf6'
  },
  deliverBtn: {
    backgroundColor: '#10b981'
  },
  actionBtnText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 12
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 100
  },
  emptyText: {
    color: '#64748b',
    fontSize: 16,
    marginBottom: 8
  },
  emptySubtext: {
    color: '#475569',
    fontSize: 14
  },
  emptyList: {
    flex: 1
  }
});

export default DriverDashboard;