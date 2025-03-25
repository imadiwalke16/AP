import React, { useEffect, useCallback, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { ScreenProps } from '../../navigation/types';
import {
  fetchNotificationsThunk,
  markNotificationAsReadThunk,
  clearReadNotifications,
} from '../../redux/slices/NotificationSlice';
import { AppDispatch, RootState } from '../../redux/store';

const NotificationsScreen: React.FC<ScreenProps<'Notifications'>> = ({ navigation }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { notifications, loading } = useSelector((state: RootState) => state.notifications);
  const [refreshing, setRefreshing] = useState(false);
  const user = useSelector((state: RootState) => state.auth.user) ?? null;

  useEffect(() => {
    if (user?.id) {
      dispatch(fetchNotificationsThunk(user.id));
    }
  }, [dispatch, user]);

  const onRefresh = useCallback(() => {
    if (!user?.id) return;
    setRefreshing(true);
    dispatch(fetchNotificationsThunk(user.id)).finally(() => setRefreshing(false));
  }, [dispatch, user]);

  const handleMarkAsRead = (notificationId: number) => {
    dispatch(markNotificationAsReadThunk(notificationId));
  };

  // ✅ Function to clear read notifications
  const handleClearRead = () => {
    dispatch(clearReadNotifications());
  };

  const renderItem = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={[styles.card, !item.isRead && styles.unreadCard]}
      onPress={() => handleMarkAsRead(item.id)}
    >
      <View style={styles.avatarContainer}>
        <Text style={styles.avatarText}>{item.title.charAt(0)}</Text>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.message}>{item.message}</Text>
        <Text style={styles.time}>{item.createdAt}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Notifications</Text>

      {/* ✅ "Clear Read" Button */}
      <TouchableOpacity style={styles.clearButton} onPress={handleClearRead}>
        <Text style={styles.clearButtonText}>Clear Read</Text>
      </TouchableOpacity>

      {loading && <ActivityIndicator size="large" color="#0000ff" />}
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  clearButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  clearButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  card: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    alignItems: 'center',
  },
  unreadCard: {
    backgroundColor: '#e3f2fd]',
  },
  avatarContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#007bff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  avatarText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  message: {
    fontSize: 14,
    color: '#555',
  },
  time: {
    fontSize: 12,
    color: '#888',
    marginTop: 4,
  },
});

export default NotificationsScreen;
