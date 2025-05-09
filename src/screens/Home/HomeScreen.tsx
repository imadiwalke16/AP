import React, { useEffect } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MainStackParamList } from "../../navigation/MainNavigator";
import { useDispatch, useSelector } from "react-redux";
import { getVehicles, selectVehicle } from "../../redux/slices/vehicleSlice";
import { Picker } from "@react-native-picker/picker";
import styled from "styled-components/native";
import { RootState } from "../../redux/store";

type Props = NativeStackScreenProps<MainStackParamList, "Home">;

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const dispatch = useDispatch();
  const { list, selectedVehicle, loading } = useSelector((state: any) => state.vehicles);
  const user = useSelector((state: RootState) => state.auth.user) ?? null;
  const themeConfig = useSelector((state: RootState) => state.auth.themeConfig);
  const logoUrl = useSelector((state: RootState) => state.auth.logoUrl);
  const backgroundImageUrl = useSelector((state: RootState) => state.auth.backgroundImageUrl);
  const unreadCount = useSelector((state: RootState) =>
    state.notifications.notifications.filter((n: any) => !n.isRead).length
  );

  useEffect(() => {
    if (user && user.id) {
      dispatch(getVehicles(user.id) as any);
    }
  }, [dispatch, user]);

  useEffect(() => {
    console.log("Selected Vehicle Data:", selectedVehicle);
  }, [selectedVehicle]);

  return (
    


    <Container>
      <Navbar style={{ backgroundColor: themeConfig?.navbarColor || "#000" }}>
        {logoUrl ? (
          <Image source={{ uri: logoUrl }} style={styles.logo} />
        ) : (
          <Image source={require("/Users/aditya/AP/asset/image.png")} style={styles.logo} />
        )}
        <NavButtons>
          <NavButton onPress={() => navigation.navigate("Home")}></NavButton>
          <NotificationButton onPress={() => navigation.navigate("Notifications")}>
            <NotificationIcon>🔔</NotificationIcon>
            {unreadCount > 0 && (
              <NotificationBadge>
                <NotificationCount>{unreadCount}</NotificationCount>
              </NotificationBadge>
            )}
          </NotificationButton>
          <ProfileButton onPress={() => navigation.navigate("Profile")}>👤</ProfileButton>
        </NavButtons>
      </Navbar>
      <ContentContainer>
        <Section>
          <PickerContainer>
            <Picker
              selectedValue={selectedVehicle?.id || ""}
              onValueChange={(value) => {
                const vehicle = list.find((v: any) => v.id === value);
                dispatch(selectVehicle(vehicle));
              }}
            >
              {list.map((vehicle: any) => (
                <Picker.Item key={vehicle.id} label={`${vehicle.year} ${vehicle.model}`} value={vehicle.id} />
              ))}
            </Picker>
          </PickerContainer>
        </Section>
        {selectedVehicle && (
          <VehicleDetail>
            <VehicleTitle>{selectedVehicle.year} {selectedVehicle.model}</VehicleTitle>
            <VehicleVin>{selectedVehicle.vin || "1FMDK02W88GA39298"}</VehicleVin>
            <VehicleInfoRow>
              <VehicleInfoColumn>
                <VehicleInfoItem>
                  <VehicleInfoLabel>Model</VehicleInfoLabel>
                  <VehicleInfoValue>{selectedVehicle.model}</VehicleInfoValue>
                </VehicleInfoItem>
                <VehicleInfoItem>
                  <VehicleInfoLabel>Year</VehicleInfoLabel>
                  <VehicleInfoValue>{selectedVehicle.year}</VehicleInfoValue>
                </VehicleInfoItem>
              </VehicleInfoColumn>
              <VehicleImageContainer key={selectedVehicle?.id}>
                <VehicleImage
                  source={{
                    uri:
                      selectedVehicle?.imgUrl ||
                      "https://static.autonation.com/actualcdn/54168aea5275406db1faf0753b0a1e32_392x294_Q75_V4.jpg",
                  }}
                />
              </VehicleImageContainer>
            </VehicleInfoRow>
          </VehicleDetail>
        )}
        <DealerCard>
          <DealerLeft>
            <DealerLogo>AutoNation</DealerLogo>
            <CallButton>
              <CallIcon>📞</CallIcon>
              <Text>Call Dealer</Text>
            </CallButton>
          </DealerLeft>
          <DealerRight>
            <DealerLabel>Dealership</DealerLabel>
            <DealerName>Ford of Portland</DealerName>
          </DealerRight>
        </DealerCard>
        <View style={{ height: 16 }} />
        <AdvisorCard>
          <AdvisorLeft>
            <Image
              source={{
                uri:
                  "https://img.freepik.com/premium-vector/customer-service_1162360-10046.jpg?ga=GA1.1.2048367604.1742730450&semt=ais_hybrid",
              }}
              style={{ width: 50, height: 50, borderRadius: 20 }}
            />
            <ChatButton>
              <ChatIcon>💬</ChatIcon>
              <Text>Chat</Text>
            </ChatButton>
          </AdvisorLeft>
          <AdvisorRight>
            <AdvisorLabel>Service Advisor</AdvisorLabel>
            <AdvisorName>James Smith</AdvisorName>
          </AdvisorRight>
        </AdvisorCard>
        <View style={{ height: 16 }} />
        <BottomButtons>
          <ServiceHistoryButton onPress={() => navigation.navigate("ServiceHistory")}>
            <ServiceHistoryText>Service History</ServiceHistoryText>
          </ServiceHistoryButton>
          <BookAppointmentButton onPress={() => navigation.navigate("BookAppointment")}>
            <BookAppointmentText>Book Appointment</BookAppointmentText>
          </BookAppointmentButton>
        </BottomButtons>
      </ContentContainer>
      <Footer>
        <FooterText>Powered by CDK GLOBAL</FooterText>
      </Footer>
    </Container>
  );
};

// Styled Components
const Container = styled.View`
  flex: 1;
  background-color: #ffffff;
`;

const Navbar = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding: 8px; /* Reduced padding to make navbar more compact */
  align-items: center;
`;

const NavButtons = styled.View`
  flex-direction: row;
  align-items: center;
`;

const NavButton = styled.Text`
  color: #fff;
  margin-right: 24px;
  font-size: 18px;
`;

const NotificationButton = styled.TouchableOpacity`
  position: relative;
  margin-right: 20px;
`;

const NotificationIcon = styled.Text`
  font-size: 22px;
`;

const NotificationBadge = styled.View`
  position: absolute;
  top: -8px;
  right: -8px;
  background-color: #f03e3e;
  border-radius: 10px;
  width: 20px;
  height: 20px;
  justify-content: center;
  align-items: center;
`;

const NotificationCount = styled.Text`
  color: white;
  font-size: 12px;
  font-weight: bold;
`;

const ProfileButton = styled.Text`
  font-size: 22px;
`;

const ContentContainer = styled.View`
  flex: 1;
  padding: 16px;
`;

const Section = styled.View`
  margin-bottom: 16px;
`;

const PickerContainer = styled.View`
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 2px;
  background-color: #fff;
`;

const VehicleDetail = styled.View`
  margin-bottom: 24px;
  padding: 16px;
  border-radius: 10px;
  background-color: #ffff;
`;

const VehicleTitle = styled.Text`
  font-size: 22px;
  font-weight: bold;
  color: #333;
`;

const VehicleVin = styled.Text`
  font-size: 13px;
  color: #666;
  margin-bottom: 16px;
`;

const VehicleInfoRow = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 12px;
`;

const VehicleInfoColumn = styled.View`
  flex: 1;
  justify-content: space-between;
`;

const VehicleInfoItem = styled.View`
  margin-bottom: 10px;
`;

const VehicleInfoLabel = styled.Text`
  font-size: 16px;
  color: #666;
`;

const VehicleInfoValue = styled.Text`
  font-size: 16px;
  color: #333;
  font-weight: bold;
`;

const VehicleImageContainer = styled.View`
  width: 150px;
  height: 80px;
  justify-content: center;
  align-items: center;
`;

const VehicleImage = styled.Image`
  width: 150%;
  height: 200%;
  border-radius: 8px;
  resize-mode: contain;
`;

const DealerCard = styled.View`
  flex-direction: row;
  border: 1px solid #eee;
  border-radius: 12px;
  overflow: hidden;
  background-color: #fff;
  height: 100px;
  align-items: center;
  elevation: 3;
`;

const DealerLeft = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 8px;
  border-right-width: 1px;
  border-right-color: #eee;
`;

const DealerLogo = styled.Text`
  font-weight: bold;
  font-size: 18px;
  margin-bottom: 8px;
`;

const CallButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  background-color: #eef3fd;
  padding: 6px 10px;
  border-radius: 8px;
`;

const CallIcon = styled.Text`
  font-size: 18px;
  margin-right: 6px;
`;

const DealerRight = styled.View`
  flex: 1;
  justify-content: center;
  padding: 8px;
`;

const DealerLabel = styled.Text`
  font-size: 14px;
  color: #666;
`;

const DealerName = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #333;
`;

const AdvisorCard = styled.View`
  flex-direction: row;
  border: 1px solid #eee;
  border-radius: 12px;
  overflow: hidden;
  background-color: #fff;
  height: 100px;
  elevation: 3;
`;

const AdvisorLeft = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 8px;
  border-right-width: 1px;
  border-right-color: #eee;
`;

const ChatButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  background-color: #eef3fd;
  padding: 6px 10px;
  border-radius: 8px;
`;

const ChatIcon = styled.Text`
  font-size: 18px;
  margin-right: 6px;
`;

const AdvisorRight = styled.View`
  flex: 1;
  justify-content: center;
  padding: 8px;
`;

const AdvisorLabel = styled.Text`
  font-size: 14px;
  color: #666;
`;

const AdvisorName = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #333;
`;

const BottomButtons = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 30px;
`;

const ServiceHistoryButton = styled.TouchableOpacity`
  background-color: #eef3fd;
  padding: 16px;
  border-radius: 10px;
  flex: 1;
  margin-right: 8px;
  align-items: center;
`;

const ServiceHistoryText = styled.Text`
  color: #4285f4;
  font-size: 16px;
  font-weight: bold;
`;

const BookAppointmentButton = styled.TouchableOpacity`
  background-color: #4285f4;
  padding: 16px;
  border-radius: 10px;
  flex: 1;
  margin-left: 8px;
  align-items: center;
`;

const BookAppointmentText = styled.Text`
  color: #fff;
  font-size: 16px;
  font-weight: bold;
`;

const Footer = styled.View`
  padding: 24px;
  align-items: center;
`;

const FooterText = styled.Text`
  color: black;
  font-size: 14px;
  font-weight: 600;
`;

// Inline styles for Image
const styles = StyleSheet.create({
  logo: {
    height: 30, // Reduced height to make navbar more compact
    width: undefined, // Let width adjust to maintain aspect ratio
    aspectRatio: 3, // Approximate aspect ratio for Ford logo (adjust as needed)
    resizeMode: "contain", // Ensure the full logo is shown without cropping
  },
});

export default HomeScreen;