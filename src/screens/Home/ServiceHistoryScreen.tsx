
import React from "react";
import { Image, Text, ScrollView, FlatList } from "react-native";
import { ScreenProps } from "../../navigation/types";
import { useDispatch, useSelector } from "react-redux";
import { getVehicles, selectVehicle } from "../../redux/slices/vehicleSlice";
import { fetchServiceHistoryThunk, selectServiceHistory } from "../../redux/slices/serviceHistorySlice";
import { Picker } from "@react-native-picker/picker";
import styled from "styled-components/native";
import { RootState } from "../../redux/store";

const ServiceHistoryScreen: React.FC<ScreenProps<"ServiceHistory">> = ({ navigation }) => {
  const dispatch = useDispatch();
  const { list, selectedVehicle } = useSelector((state: any) => state.vehicles);
  const serviceHistory = useSelector(selectServiceHistory);
  const user = useSelector((state: any) => state.auth.user) ?? null;
  const unreadCount = useSelector((state: RootState) =>
    state.notifications.notifications.filter(n => !n.isRead).length
  );

  React.useEffect(() => {
    if (user && user.id && list.length === 0) {
      dispatch(getVehicles(user.id) as any);
    }
  }, [dispatch, user]);

  React.useEffect(() => {
    if (selectedVehicle?.id) {
      dispatch(fetchServiceHistoryThunk(selectedVehicle.id) as any);
    }
  }, [selectedVehicle, dispatch]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const renderServiceHistoryCard = ({ item }: { item: any }) => (
    <ServiceHistoryCard>
      <CardContent>
        <CardRow>
          <CardColumn>
            <CardLabel>
              <Text>RO#</Text>
            </CardLabel>
            <CardValue>
              <Text>{item.id}</Text>
            </CardValue>
          </CardColumn>
          <CardColumn>
            <CardLabel>
              <Text>RO Status</Text>
            </CardLabel>
            <CardValue>
              <Text>In Review</Text>
            </CardValue>
          </CardColumn>
          <CardColumn>
            <CardLabel>
              <Text>Date</Text>
            </CardLabel>
            <CardValue>
              <Text>{formatDate(item.serviceDate)}</Text>
            </CardValue>
          </CardColumn>
        </CardRow>
        <ViewDetailsButton onPress={() => { /* Navigate to details later */ }}>
          <ViewDetailsText>
            <Text>View Details</Text>
          </ViewDetailsText>
        </ViewDetailsButton>
      </CardContent>
    </ServiceHistoryCard>
  );

  return (
    <Container>
      {/* Navbar with dynamic notification count */}
      <Navbar>
        <Logo>
          <Text>AutoNation</Text>
        </Logo>
        <NavButtons>
          <NavButton onPress={() => navigation.navigate("Home")}>
            <Text></Text>
          </NavButton>
          <NotificationButton onPress={() => navigation.navigate("Notifications")}>
            <NotificationIcon>
              <Text>🔔</Text>
            </NotificationIcon>
            {unreadCount > 0 && (
              <NotificationBadge>
                <NotificationCount>
                  <Text>{unreadCount}</Text>
                </NotificationCount>
              </NotificationBadge>
            )}
          </NotificationButton>
          <ProfileButton onPress={() => navigation.navigate("Profile")}>
            <Text>👤</Text>
          </ProfileButton>
        </NavButtons>
      </Navbar>

      <ContentContainer>
        <ScrollView contentContainerStyle={{ padding: 16 }}>
          <Title>
            <Text>Service History</Text>
          </Title>

          <Section>
            <PickerContainer>
              <Picker
                selectedValue={selectedVehicle?.id || ""}
                onValueChange={(value) => {
                  const vehicle = list.find((v: any) => v.id === value);
                  dispatch(selectVehicle(vehicle));
                }}
              >
                <Picker.Item label="Select a vehicle" value="" />
                {list.map((vehicle: any) => (
                  <Picker.Item
                    key={vehicle.id}
                    label={`${vehicle.year} ${vehicle.model}`}
                    value={vehicle.id}
                  />
                ))}
              </Picker>
            </PickerContainer>
          </Section>

          {selectedVehicle && (
            <VehicleDetail>
              <VehicleTitle>
                <Text>{selectedVehicle.year} {selectedVehicle.model}</Text>
              </VehicleTitle>
              <VehicleVin>
                <Text>{selectedVehicle.vin || "1FMDK02W88GA39298"}</Text>
              </VehicleVin>
              <VehicleInfoRow>
                <VehicleInfoColumn>
                  <VehicleInfoItem>
                    <VehicleInfoLabel>
                      <Text>Model</Text>
                    </VehicleInfoLabel>
                    <VehicleInfoValue>
                      <Text>{selectedVehicle.model}</Text>
                    </VehicleInfoValue>
                  </VehicleInfoItem>
                  <VehicleInfoItem>
                    <VehicleInfoLabel>
                      <Text>Year</Text>
                    </VehicleInfoLabel>
                    <VehicleInfoValue>
                      <Text>{selectedVehicle.year}</Text>
                    </VehicleInfoValue>
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

          {serviceHistory.length > 0 ? (
            <FlatList
              data={serviceHistory}
              renderItem={renderServiceHistoryCard}
              keyExtractor={(item) => item.id.toString()}
              scrollEnabled={false}
            />
          ) : (
            <Message>
              <Text>No service history yet</Text>
            </Message>
          )}
        </ScrollView>
      </ContentContainer>

      <Footer>
        <FooterText>
          <Text>Powered by CDK GLOBAL</Text>
        </FooterText>
      </Footer>
    </Container>
  );
};

// Styled components (unchanged)
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

const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 16px;
`;

const ServiceHistoryCard = styled.View`
  border: 1px solid #ddd;
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 24px;
  background-color: #fff;
  elevation: 5;
  shadow-color: #000;
  shadow-offset: 0px 4px;
  shadow-opacity: 0.3;
  shadow-radius: 6px;
`;

const CardContent = styled.View`
  flex-direction: column;
`;

const CardRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 16px;
`;

const CardColumn = styled.View`
  flex: 1;
  margin-right: 12px;
  align-items: flex-start;
`;

const CardLabel = styled.Text`
  font-size: 14px;
  color: #666;
  font-weight: 500;
  margin-bottom: 6px;
`;

const CardValue = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: #333;
`;

const ViewDetailsButton = styled.TouchableOpacity`
  background-color: #4285f4;
  padding: 12px 24px;
  border-radius: 8px;
  align-self: flex-end;
`;

const ViewDetailsText = styled.Text`
  color: #fff;
  font-size: 16px;
  font-weight: bold;
`;

const Message = styled.Text`
  font-size: 16px;
  color: #666;
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

export default ServiceHistoryScreen;
