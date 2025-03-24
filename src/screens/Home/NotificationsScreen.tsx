import React, { useEffect, useCallback, useState } from "react";
import { View, Text, Button, FlatList, ActivityIndicator, RefreshControl } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { ScreenProps } from "/Users/aditya/CDKScreen/AP/src/navigation/types.ts";
import { fetchNotificationsThunk } from "/Users/aditya/CDKScreen/AP/src/redux/slices/NotificationSlice.ts";
import { AppDispatch, RootState } from "/Users/aditya/CDKScreen/AP/src/redux/store.ts";

const NotificationsScreen: React.FC<ScreenProps<"Notifications">> = ({ navigation }) => {
  const dispatch = useDispatch<AppDispatch>(); // ✅ Ensure correct dispatch type
  const { notifications, loading } = useSelector((state: RootState) => state.notifications);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    dispatch(fetchNotificationsThunk(3)); // Replace 3 with the actual user ID
  }, [dispatch]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    dispatch(fetchNotificationsThunk(3)).finally(() => setRefreshing(false));
  }, [dispatch]);

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>Notifications</Text>
      {loading && <ActivityIndicator size="large" color="#0000ff" />}
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={{ padding: 10, borderBottomWidth: 1, borderColor: "#ccc" }}>
            <Text style={{ fontSize: 16, fontWeight: item.isRead ? "normal" : "bold" }}>{item.title}</Text>
            <Text>{item.message}</Text>
          </View>
        )}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      />
      <Button title="Back to Home" onPress={() => navigation.navigate("Home")} />
    </View>
  );
};

export default NotificationsScreen;
