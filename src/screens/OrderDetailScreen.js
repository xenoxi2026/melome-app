import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  TextInput
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const OrderDetailScreen = ({ route, navigation }) => {
  const { order, updateOrderStatus } = route.params;
  const [signature, setSignature] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCompleteDelivery = async () => {
    if (order.status === 'in-transit') {
      Alert.alert(
        'Complete Delivery',
        'Confirm this delivery is complete?',
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Confirm',
            onPress: async () => {
              setIsSubmitting(true);
              await updateOrderStatus(order.id, 'delivered');
              setIsSubmitting(false);
              navigation.goBack();
            }
          }
        ]
      );
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.label}>Order ID</Text>
        <Text style={styles.value}>{order.id}</Text>

        <Text style={styles.label}>Customer</Text>
        <Text style={styles.value}>{order.clientName}</Text>

        <Text style={styles.label}>Pickup Location</Text>
        <Text style={styles.value}>{order.pickup?.address || '123 Main St'}</Text>
        <Text style={styles.value}>{order.pickup?.city || 'Johannesburg'}</Text>

        <Text style={styles.label}>Delivery Location</Text>
        <Text style={styles.value}>{order.delivery?.address || '456 Beach Rd'}</Text>
        <Text style={styles.value}>{order.delivery?.city || 'Cape Town'}</Text>

        <Text style={styles.label}>Package Details</Text>
        <Text style={styles.value}>{order.package?.weight} kg - {order.package?.type}</Text>

        <Text style={styles.label}>Amount</Text>
        <Text style={[styles.value, styles.amount]}>R{order.amount?.toLocaleString()}</Text>

        {order.status === 'in-transit' && (
          <TouchableOpacity
            style={styles.completeBtn}
            onPress={handleCompleteDelivery}
            disabled={isSubmitting}
          >
            <Text style={styles.completeBtnText}>
              {isSubmitting ? 'Processing...' : 'Mark as Delivered âœ“'}
            </Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.mapCard}>
        <Text style={styles.mapTitle}>ðŸ“ Live Tracking</Text>
        <View style={styles.mapPlaceholder}>
          <Text style={styles.mapPlaceholderText}>
            Map view will show driver location and route
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a'
  },
  card: {
    backgroundColor: '#1e293b',
    margin: 16,
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#334155'
  },
  label: {
    color: '#64748b',
    fontSize: 12,
    marginTop: 12,
    marginBottom: 4
  },
  value: {
    color: 'white',
    fontSize: 16,
    marginBottom: 8
  },
  amount: {
    color: '#10b981',
    fontSize: 20,
    fontWeight: 'bold'
  },
  completeBtn: {
    backgroundColor: '#10b981',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20
  },
  completeBtnText: {
    color: '#0f172a',
    fontWeight: 'bold',
    fontSize: 16
  },
  mapCard: {
    backgroundColor: '#1e293b',
    margin: 16,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#334155'
  },
  mapTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12
  },
  mapPlaceholder: {
    height: 200,
    backgroundColor: '#0f172a',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#334155'
  },
  mapPlaceholderText: {
    color: '#64748b',
    textAlign: 'center'
  }
});

export default OrderDetailScreen;