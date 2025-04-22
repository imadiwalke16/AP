import React, { useEffect, useCallback, useState, useMemo } from 'react';
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
  const unreadCount = useSelector((state: RootState) =>
    state.notifications.notifications.filter(n => !n.isRead).length
  );
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

  const handleClearRead = () => {
    dispatch(clearReadNotifications());
  };

  const isOperational = (notification: any) => {
    const content = `${notification.title} ${notification.message}`.toLowerCase();
    const promotionalKeywords = ['offer', 'discount', 'sale', 'promotion', 'deal', 'save'];
    return !promotionalKeywords.some(keyword => content.includes(keyword));
  };

  const sortedNotifications = useMemo(() => {
    return [...notifications].sort((a, b) => {
      const aIsOperational = isOperational(a);
      const bIsOperational = isOperational(b);
      if (aIsOperational && !bIsOperational) return -1;
      if (!aIsOperational && bIsOperational) return 1;
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  }, [notifications]);

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
      {/* Navbar with dynamic notification count */}
      <View style={styles.navbar}>
        <Text style={styles.logo}>AutoNation</Text>
        <View style={styles.navButtons}>
          <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <Text style={styles.navButton}></Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.notificationButton}
            onPress={() => navigation.navigate('Notifications')}
          >
            <Text style={styles.notificationIcon}>🔔</Text>
            {unreadCount > 0 && (
              <View style={styles.notificationBadge}>
                <Text style={styles.notificationCount}>{unreadCount}</Text>
              </View>
            )}
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.profileButton}
            onPress={() => navigation.navigate('Profile')}
          >
            <Text style={styles.profileIcon}>👤</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Content container for notifications */}
      <View style={styles.contentContainer}>
        <Text style={styles.header}>Notifications</Text>

        <TouchableOpacity style={styles.clearButton} onPress={handleClearRead}>
          <Text style={styles.clearButtonText}>Clear Read</Text>
        </TouchableOpacity>

        {loading && <ActivityIndicator size="large" color="#0000ff" />}
        <FlatList
          data={sortedNotifications}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        />
      </View>

      {/* Footer container */}
      <View style={styles.footerContainer}>
        <Text style={styles.footer}>Powered by CDK GLOBAL</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
    backgroundColor: '#000',
    alignItems: 'center',
  },
  logo: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  navButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  navButton: {
    color: '#fff',
    marginRight: 24,
    fontSize: 18,
  },
  notificationButton: {
    position: 'relative',
    marginRight: 20,
  },
  notificationIcon: {
    fontSize: 22,
  },
  notificationBadge: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: '#f03e3e',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationCount: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  profileButton: {},
  profileIcon: {
    fontSize: 22,
  },
  contentContainer: {
    flex: 1,
    padding: 16,
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
    backgroundColor: '#e3f2fd',
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
  footerContainer: {
    padding: 24,
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  footer: {
    fontSize: 12,
    color: 'black',
  },
});

export default NotificationsScreen;