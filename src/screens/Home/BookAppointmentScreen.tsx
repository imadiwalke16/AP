import React, { useState, useRef } from 'react';
import { ActivityIndicator } from 'react-native';
import { WebView } from 'react-native-webview';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import styled from 'styled-components/native';
import { MainStackParamList } from '../../navigation/MainNavigator';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

type Props = NativeStackScreenProps<MainStackParamList, 'BookAppointment'>;

const BookAppointmentScreen: React.FC<Props> = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const user = useSelector((state: RootState) => state.auth.user) ?? null;
  const webViewRef = useRef<WebView>(null);

  const injectedJavaScript = `
    (function pollForButton(attemptsLeft) {
      if (attemptsLeft <= 0) {
        window.ReactNativeWebView.postMessage("Gave up: Returning Customer button not found after 10 attempts");
        return;
      }
      const returnButton = document.querySelector('[data-testid="repeatCust-button"]');
      if (returnButton) {
        returnButton.click();
        window.ReactNativeWebView.postMessage("Clicked Returning Customer");
      } else {
        window.ReactNativeWebView.postMessage("Attempt " + (11 - attemptsLeft) + ": Returning Customer button not found, retrying...");
        setTimeout(() => pollForButton(attemptsLeft - 1), 500);
      }
    })(10);
    true; // Required by WebView
  `;

  const onMessageHandler = (event: any) => {
    console.log("WebView Log:", event.nativeEvent.data);
  };

  return (
    <Container>
      {loading && (
        <LoadingContainer>
          <ActivityIndicator size="large" color="#4285f4" />
        </LoadingContainer>
      )}
      {/* Placeholder for future custom Back button */}
      {/* <StyledBackButton onPress={() => navigation.goBack()}>
        <StyledBackText>Back</StyledBackText>
      </StyledBackButton> */}
      <StyledWebView
        ref={webViewRef}
        source={{ uri: 'https://api-dit.connectcdk.com/api/nc-cosa-consumer-ui-stage/v1/?cid=320004' }}
        injectedJavaScript={injectedJavaScript}
        onLoadStart={() => setLoading(true)}
        onLoadEnd={() => {
          setLoading(false);
          webViewRef.current?.injectJavaScript(injectedJavaScript);
        }}
        onMessage={onMessageHandler}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        mixedContentMode="always"
        originWhitelist={['*']}
      />
    </Container>
  );
};

// Styled Components
const Container = styled.View`
  flex: 1;
  background-color: #ffffff;
`;

const LoadingContainer = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.8);
`;

const StyledWebView = styled(WebView)`
  flex: 1;
`;

// Placeholder for custom Back button styles
// const StyledBackButton = styled.TouchableOpacity`
//   background-color: #4285f4;
//   padding: 12px;
//   border-radius: 8px;
//   margin: 16px;
//   align-items: center;
// `;

// const StyledBackText = styled.Text`
//   color: #fff;
//   font-size: 16px;
//   font-weight: bold;
// `;

export default BookAppointmentScreen;