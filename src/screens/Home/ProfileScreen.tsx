
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { ScreenProps } from "../../navigation/types";

const ProfileScreen: React.FC<ScreenProps<"Profile">> = ({ navigation }) => {
  const user = useSelector((state: RootState) => state.auth.user);
  const unreadCount = useSelector((state: RootState) =>
    state.notifications.notifications.filter(n => !n.isRead).length
  );

  return (
    <View style={styles.container}>
      {/* Navbar with dynamic notification count */}
      <View style={styles.navbar}>
        <Text style={styles.logo}>AutoNation</Text>
        <View style={styles.navButtons}>
          <TouchableOpacity onPress={() => navigation.navigate("Home")}>
            <Text style={styles.navButton}></Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.notificationButton}
            onPress={() => navigation.navigate("Notifications")}
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
            onPress={() => navigation.navigate("Profile")}
          >
            <Text style={styles.profileIcon}>👤</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Content container for profile card */}
      <View style={styles.contentContainer}>
        {user ? (
          <>
            <View style={styles.card}>
              <Text style={styles.label}>Name</Text>
              <Text style={styles.value}>{user.name || "N/A"}</Text>

              <Text style={styles.label}>Registered Email</Text>
              <Text style={styles.value}>{user.email}</Text>

              <Text style={styles.label}>Registered Mobile Number</Text>
              <Text style={styles.value}>{user.phoneNumber || "N/A"}</Text>
            </View>

            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Sign Out</Text>
            </TouchableOpacity>
          </>
        ) : (
          <Text style={styles.text}>No user logged in</Text>
        )}
      </View>

      {/* Footer container to stick at bottom */}
      <View style={styles.footerContainer}>
        <Text style={styles.footer}>Powered by CDK GLOBAL</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  navbar: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 12,
    backgroundColor: "#000",
    alignItems: "center",
  },
  logo: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  navButtons: {
    flexDirection: "row",
    alignItems: "center",
  },
  navButton: {
    color: "#fff",
    marginRight: 24,
    fontSize: 18,
  },
  notificationButton: {
    position: "relative",
    marginRight: 20,
  },
  notificationIcon: {
    fontSize: 22,
  },
  notificationBadge: {
    position: "absolute",
    top: -8,
    right: -8,
    backgroundColor: "#f03e3e",
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  notificationCount: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
  profileButton: {
    // No additional styles needed beyond icon
  },
  profileIcon: {
    fontSize: 22,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  card: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    width: "100%",
  },
  label: {
    fontSize: 14,
    color: "gray",
    marginTop: 10,
  },
  value: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  button: {
    backgroundColor: "#3478f6",
    paddingVertical: 12,
    width: "100%",
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  footerContainer: {
    padding: 24,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  footer: {
    fontSize: 12,
    color: "black",
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
  },
});

export default ProfileScreen;
