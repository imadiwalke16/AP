import React, { useState, useMemo } from "react";
import { 
  View, Text, TextInput, Button, FlatList, StyleSheet, Alert, TouchableOpacity 
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchServiceCenters } from "../../redux/slices/serviceCenterSlice";
import { fetchServiceTypes } from "../../redux/slices/serviceTypeSlice";
import { getVehicles } from "../../redux/slices/vehicleSlice";
import { selectTransportMode } from "../../redux/slices/transportSlice";
import { RootState } from "../../redux/store";
import { Picker } from "@react-native-picker/picker";
import { bookAppointment } from "/Users/aditya/CDKScreen/AP/src/utils/api.ts";
import {} from '/Users/aditya/CDKScreen/AP/src/redux/slices/authSlice.ts'
const transportModes = [
  { name: "Self-Drive", cost: 0 },
  { name: "Pickup", cost: 200 },
  { name: "Drop-Off", cost: 200 },
];

const BookAppointmentScreen: React.FC = () => {
  const [pinCode, setPinCode] = useState("");
  const [selectedCenter, setSelectedCenter] = useState<number | null>(null);
  const [selectedServices, setSelectedServices] = useState<number[]>([]);
  const [selectedVehicle, setSelectedVehicle] = useState<number | null>(null);
  const [selectedTransport, setSelectedTransport] = useState<string | null>(null);
const user = useSelector((state: RootState) => state.auth.user);

  const dispatch = useDispatch();
  const { centers } = useSelector((state: RootState) => state.serviceCenters);
  const { services } = useSelector((state: RootState) => state.serviceTypes);
  const { list: vehicles } = useSelector((state: RootState) => state.vehicles);

  const handleSearch = () => {
    if (pinCode.length !== 6) {
      Alert.alert("Invalid Pin Code", "Please enter a valid 6-digit pin code.");
      return;
    }
    dispatch(fetchServiceCenters(pinCode) as any);
  };

  const handleSelectServiceCenter = (centerId: number) => {
    setSelectedCenter(centerId);
    setSelectedServices([]);
    dispatch(fetchServiceTypes(centerId) as any);
  };

  const handleToggleService = (serviceId: number) => {
    setSelectedServices((prevSelected) =>
      prevSelected.includes(serviceId) ? prevSelected.filter((id) => id !== serviceId) : [...prevSelected, serviceId]
    );
  };

  const handleGoBack = () => {
    setSelectedCenter(null);
    setSelectedServices([]);
    setSelectedVehicle(null);
    setSelectedTransport(null);
  };

  const handleProceedToVehicleSelection = () => {
    dispatch(getVehicles(3) as any); // Replace 3 with the actual customer ID
  };

  const handleSelectTransportMode = (mode: string) => {
    setSelectedTransport(mode);
    dispatch(selectTransportMode(mode));
  };

  // Calculate Total Cost
  const totalCost = useMemo(() => {
    const serviceCost = selectedServices.reduce((total, id) => {
      const service = services.find((s) => s.id === id);
      return total + (service ? service.price : 0);
    }, 0);

    const transportCost = transportModes.find((t) => t.name === selectedTransport)?.cost || 0;

    return serviceCost + transportCost;
  }, [selectedServices, selectedTransport, services]);

  const handleConfirmBooking = async () => {
    try {
      const appointmentData = {
        appointmentDate: new Date().toISOString(),  // Use current date/time or selected date
        userId: user?.id,  // Ensure this comes from Redux or Context
        vehicleId: selectedVehicle,  
        serviceCenterId: selectedCenter,
        transportMode: selectedTransport,  
        transportCharge: totalCost,  
        serviceOfferedIds: selectedServices,  
      };
  
      await bookAppointment(appointmentData);  // Call API function
  
      Alert.alert("Success", "Booked Successfully", [
        { text: "OK", onPress: resetBookingFlow }, // Reset after success
      ]); // Show alert on success
    } catch (error) {
      Alert.alert("Error", "Booking failed. Please try again.");  // Handle errors
    }
  };
  const resetBookingFlow = () => {
    setPinCode("");
    setSelectedCenter(null);
    setSelectedServices([]);
    setSelectedVehicle(null);
    setSelectedTransport(null);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Book Appointment</Text>

      {!selectedCenter && (
        <>
          <Text style={styles.label}>Enter Pin Code:</Text>
          <TextInput 
            style={styles.input} 
            value={pinCode} 
            onChangeText={setPinCode} 
            keyboardType="numeric" 
            maxLength={6} 
            placeholder="560001" 
          />
          <Button title="Find Service Centers" onPress={handleSearch} />
        </>
      )}

      {!selectedCenter && (
        <FlatList
          data={centers}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity 
              style={[styles.card, selectedCenter === item.id && styles.selectedCard]} 
              onPress={() => handleSelectServiceCenter(item.id)}
            >
              <Text style={styles.name}>{item.name}</Text>
              <Text>{item.address}</Text>
              <Text>{item.phoneNumber}</Text>
              <Text>Brands: {item.brandsSupported.join(", ")}</Text>
            </TouchableOpacity>
          )}
        />
      )}

      {selectedCenter && !selectedVehicle && (
        <>
          <Button title="← Back to Service Centers" onPress={handleGoBack} />
          <Text style={styles.subTitle}>Available Services:</Text>

          <FlatList
            data={services}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity 
                style={[styles.serviceCard, selectedServices.includes(item.id) && styles.selectedServiceCard]} 
                onPress={() => handleToggleService(item.id)}
              >
                <Text style={styles.serviceName}>{item.name}</Text>
                <Text>Price: ₹{item.price}</Text>
              </TouchableOpacity>
            )}
          />

          {selectedServices.length > 0 && (
            <Button title="Proceed to Vehicle Selection" onPress={handleProceedToVehicleSelection} />
          )}
        </>
      )}

      {selectedServices.length > 0 && !selectedTransport && (
        <>
          <Text style={styles.subTitle}>Select Your Vehicle:</Text>

          <Picker 
            selectedValue={selectedVehicle} 
            onValueChange={(value) => setSelectedVehicle(value)}
          >
            <Picker.Item label="Select a Vehicle" value={null} />
            {vehicles?.map((vehicle: any) => (
              <Picker.Item 
                key={vehicle.id} 
                label={`${vehicle.make} ${vehicle.model}`}  
                value={vehicle.id} 
              />
            ))}
          </Picker>

          {selectedVehicle && (
            <Button title="Proceed to Transport Selection" onPress={() => setSelectedTransport("")} />
          )}
        </>
      )}

      {selectedVehicle && selectedTransport === "" && (
        <>
          <Text style={styles.subTitle}>Select Transport Mode:</Text>
          <FlatList
            data={transportModes}
            keyExtractor={(item) => item.name}
            renderItem={({ item }) => (
              <TouchableOpacity 
                style={styles.transportCard} 
                onPress={() => handleSelectTransportMode(item.name)}
              >
                <Text style={styles.transportName}>{item.name} (₹{item.cost})</Text>
              </TouchableOpacity>
            )}
          />
        </>
      )}

{selectedTransport && (
  <>
    {/* Order Summary */}
    <View style={styles.summaryContainer}>
      <Text style={styles.summaryTitle}>Order Summary</Text>
      
      <Text style={styles.summaryItem}>🛠️ Service Center: {centers.find(c => c.id === selectedCenter)?.name}</Text>
      
      <Text style={styles.summaryItem}>📌 Services Selected:</Text>
      {selectedServices.map(serviceId => {
        const service = services.find(s => s.id === serviceId);
        return (
          <Text key={serviceId} style={styles.summarySubItem}>
            - {service?.name} (₹{service?.price})
          </Text>
        );
      })}
      
      <Text style={styles.summaryItem}>🚗 Vehicle: {vehicles.find(v => v.id === selectedVehicle)?.make} {vehicles.find(v => v.id === selectedVehicle)?.model}</Text>
      
      <Text style={styles.summaryItem}>🚚 Transport Mode: {selectedTransport}</Text>

      <Text style={styles.summaryTotal}>💰 Total Cost: ₹{totalCost}</Text>
    </View>

    {/* Confirm Booking Button */}
    <Button title="Confirm Booking" onPress={handleConfirmBooking} />
  </>
)}

    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
  label: { fontSize: 16, fontWeight: "bold", marginBottom: 5 },
  input: { borderWidth: 1, padding: 10, marginBottom: 10, borderRadius: 5 },
  card: { padding: 15, marginVertical: 10, backgroundColor: "#f9f9f9", borderRadius: 5 },
  selectedCard: { backgroundColor: "#cde6ff" },
  name: { fontSize: 18, fontWeight: "bold" },
  subTitle: { fontSize: 20, fontWeight: "bold", marginTop: 15 },
  serviceCard: { padding: 10, marginVertical: 5, backgroundColor: "#e9e9e9", borderRadius: 5 },
  selectedServiceCard: { backgroundColor: "#cde6ff" },
  serviceName: { fontSize: 16, fontWeight: "bold" },
  transportCard: { padding: 10, marginVertical: 5, backgroundColor: "#e9e9e9", borderRadius: 5 },
  transportName: { fontSize: 16, fontWeight: "bold" },
  finalText: { fontSize: 18, fontWeight: "bold", color: "green", marginTop: 20 },
  summaryContainer: { 
    backgroundColor: "#f4f4f4", 
    padding: 15, 
    borderRadius: 8, 
    marginVertical: 15 
  },
  summaryTitle: { 
    fontSize: 18, 
    fontWeight: "bold", 
    marginBottom: 5 
  },
  summaryItem: { 
    fontSize: 16, 
    marginVertical: 3 
  },
  summarySubItem: { 
    fontSize: 14, 
    marginLeft: 10 
  },
  summaryTotal: { 
    fontSize: 18, 
    fontWeight: "bold", 
    color: "green", 
    marginTop: 10 
  },
  
});

export default BookAppointmentScreen;
