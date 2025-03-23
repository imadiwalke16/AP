import React, { useEffect } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MainStackParamList } from "../../navigation/MainNavigator";
import { useDispatch, useSelector } from "react-redux";
import { getVehicles, selectVehicle } from "../../redux/slices/vehicleSlice";
import { Picker } from "@react-native-picker/picker";
import styled from "styled-components/native";
import { RootState } from "../../redux/store";

// Define props type
type Props = NativeStackScreenProps<MainStackParamList, "Home">;

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const dispatch = useDispatch();
  const { list, selectedVehicle, loading } = useSelector((state: any) => state.vehicles);
  const user = useSelector((state: RootState) => state.auth.user) ?? null;

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
      {/* Navbar */}
      <Navbar>
        <Logo>AutoNation</Logo>
        <NavButtons>
          <NavButton onPress={() => navigation.navigate("Home")}></NavButton>
          <NotificationButton onPress={() => navigation.navigate("Notifications")}>
            <NotificationIcon>🔔</NotificationIcon>
            {/* Red notification badge */}
            <NotificationBadge>
              <NotificationCount>3</NotificationCount>
            </NotificationBadge>
          </NotificationButton>
          <ProfileButton onPress={() => navigation.navigate("Profile")}>👤</ProfileButton>
        </NavButtons>
      </Navbar>

      {/* Main Content */}
      <ContentContainer>
        {/* Vehicle Selection */}
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

       {/* Vehicle Details */}
{selectedVehicle && (
  <VehicleDetail>
    <VehicleTitle>{selectedVehicle.year} {selectedVehicle.model}</VehicleTitle>
    <VehicleVin>{selectedVehicle.vin || "1FMDK02W88GA39298"}</VehicleVin>
    
    <VehicleInfoRow>
      {/* Left Column: Model & Year */}
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

      {/* Right Column: Car Image */}
      <VehicleImageContainer key={selectedVehicle?.id}>
        <VehicleImage source={{uri: selectedVehicle?.imgUrl || "https://static.autonation.com/actualcdn/54168aea5275406db1faf0753b0a1e32_392x294_Q75_V4.jpg" }} />
      </VehicleImageContainer>
    </VehicleInfoRow>
  </VehicleDetail>
)}


        {/* Dealer Info Card */}
        {/* Dealer Info Card */}
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
{/* Service Advisor Card */}
<AdvisorCard>
  <AdvisorLeft>
  <Image 
    source={{ uri: "https://img.freepik.com/premium-vector/customer-service_1162360-10046.jpg?ga=GA1.1.2048367604.1742730450&semt=ais_hybrid" }} 
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
        {/* Action Buttons */}
        <BottomButtons>
          <ServiceHistoryButton onPress={() => navigation.navigate("ServiceHistory")}>
            <ServiceHistoryText>Service History</ServiceHistoryText>
          </ServiceHistoryButton>
          <BookAppointmentButton onPress={() => navigation.navigate("BookAppointment")}>
            <BookAppointmentText>Book Appointment</BookAppointmentText>
          </BookAppointmentButton>
        </BottomButtons>
      </ContentContainer>

      {/* Footer */}
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
  padding: 12px;
  background-color: #000;
  align-items: center;
`;

const Logo = styled.Text`
  color: #fff;
  font-size: 20px;
  font-weight: bold;
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

const SectionLabel = styled.Text`
  font-size: 16px;
  color: #666;
  margin-bottom: 8px;
`;

const PickerContainer = styled.View`
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 2px;
  background-color: #fff;
`;

// const VehicleDetail = styled.View`
//   margin-bottom: 24px;
// `;

// const VehicleTitle = styled.Text`
//   font-size: 25px;
//   font-weight: bold;
//   color: #333;
// `;

// const VehicleVin = styled.Text`
//   font-size: 13px;
//   color: #666;
//   margin-bottom: 16px;
// `;

// const VehicleInfoRow = styled.View`
//   flex-direction: row;
//   justify-content: space-between;
//   margin-top: 12px;
// `;

// const VehicleInfoColumn = styled.View`
//   flex: 1;
// `;

// const VehicleInfoLabel = styled.Text`
//   font-size: 16px;
//   color: #666;
// `;

// const VehicleInfoValue = styled.Text`
//   font-size: 16px;
//   color: #333;
//   font-weight: bold;
// `;

// const VehicleImage = styled.Image`
//   width: 150px;
//   height: 80px;
//   border-radius: 8px;
// `;

// const DealerCard = styled.View`
//   border: 1px solid #eee;
//   border-radius: 12px;
//   margin-bottom: 16px;
//   overflow: hidden;
// `;

const DealerCardHeader = styled.View`
  flex-direction: row;
  padding: 16px;
  border-bottom-width: 1px;
  border-bottom-color: #eee;
`;

// const DealerLogo = styled.Text`
//   width: 80px;
//   font-weight: bold;
//   padding-right: 16px;
// `;

const DealerInfoContainer = styled.View`
  flex: 1;
`;

// const DealerLabel = styled.Text`
//   font-size: 16px;
//   color: #666;
// `;

// const DealerName = styled.Text`
//   font-size: 18px;
//   font-weight: bold;
//   color: #333;
// `;

// const CallButton = styled.TouchableOpacity`
//   flex-direction: row;
//   align-items: center;
//   padding: 12px;
// `;

// const CallIcon = styled.Text`
//   color: #4285f4;
//   font-size: 18px;
//   margin-right: 8px;
// `;

const CallText = styled.Text`
  color: #4285f4;
  font-size: 16px;
  font-weight: bold;
`;

// const AdvisorCard = styled.View`
//   border: 1px solid #eee;
//   border-radius: 12px;
//   margin-bottom: 24px;
//   overflow: hidden;
// `;

const AdvisorCardHeader = styled.View`
  flex-direction: row;
  padding: 16px;
  border-bottom-width: 1px;
  border-bottom-color: #eee;
`;

// const AdvisorAvatar = styled.View`
//   width: 48px;
//   height: 48px;
//   border-radius: 24px;
//   background-color: #ccc;
//   margin-right: 16px;
// `;

const AdvisorInfoContainer = styled.View`
  flex: 1;
`;

// const AdvisorLabel = styled.Text`
//   font-size: 16px;
//   color: #666;
// `;

// const AdvisorName = styled.Text`
//   font-size: 18px;
//   font-weight: bold;
//   color: #333;
// `;

// const ChatButton = styled.TouchableOpacity`
//   flex-direction: row;
//   align-items: center;
//   padding: 12px;
// `;

// const ChatIcon = styled.Text`
//   color: #4285f4;
//   font-size: 18px;
//   margin-right: 8px;
// `;

const ChatText = styled.Text`
  color: #4285f4;
  font-size: 16px;
  font-weight: bold;
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
  font-weight: semi-bold;
  
`;
const DealerCard = styled.View`
  flex-direction: row;
  border: 1px solid #eee;
  border-radius: 12px;
  overflow: hidden;
  background-color: #fff;
  height: 100px;  /* Limit height */
  align-items: center; /* Align content properly */
  elevation: 3; /* Elevation for Android */
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
padding: 6px 10px; /* Reduce button padding */
  border-radius: 8px;
`;

const CallIcon = styled.Text`
  font-size: 18px;
  margin-right: 6px;
`;

const DealerRight = styled.View`
  flex: 1;
  justify-content: center;
  padding: 8px; /* Reduce padding */
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

// Service Advisor Card Fix
const AdvisorCard = styled.View`
  flex-direction: row;
  border: 1px solid #eee;
  border-radius: 12px;
  overflow: hidden;
  background-color: #fff;
    height: 100px;
    elevation: 3; /* Elevation for Android */
`;

const AdvisorLeft = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 8px;
  border-right-width: 1px;
  border-right-color: #eee;
`;

const AdvisorAvatar = styled.View`
  width: 40px;
  height: 40px;
  border-radius: 25px;
  background-color: #ccc;
  margin-bottom: 8px;
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
const VehicleDetail = styled.View`
  margin-bottom: 24px;
  padding: 16px;
  border-radius: 10px;
  background-color : #ffff;
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



export default HomeScreen;