import React from "react";
import { Provider } from "react-redux";
import { store } from "./src/redux/store";
import { NavigationContainer } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { RootState } from "./src/redux/store";
import AuthNavigator from "./src/navigation/AuthNavigator";
import MainNavigator from "./src/navigation/MainNavigator";

const AppContent = () => {
  const token = useSelector((state: RootState) => state.auth.token);
  return token ? <MainNavigator /> : <AuthNavigator />;
};

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <AppContent />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
