import React, { useState, useEffect } from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';

// IMPORTANTE: Estes imports funcionam se os 4 arquivos
// (App.tsx, splash_screen.tsx, login_screen.tsx, home_screen.tsx) estiverem na mesma pasta.
import SplashScreen from './splash_screen.tsx';
import LoginScreen from './login_screen.tsx';
import HomeScreen from './home_screen.tsx';

// Define os estados possíveis da aplicação
type AppState = 'splash' | 'login' | 'home';

const App: React.FC = () => {
  // Estado inicial é 'splash'
  const [appState, setAppState] = useState<AppState>('splash');
  const [splashLoading, setSplashLoading] = useState<boolean>(true);

  // useEffect para simular o tempo da SplashScreen
  useEffect(() => {
    // Simula um carregamento de 3 segundos
    const timer = setTimeout(() => {
      setSplashLoading(false); // Desativa o indicador de carregamento na splash
      setAppState('login');    // Transita para a tela de login após a splash
    }, 3000); // 3 segundos (Ajuste este valor conforme necessário)

    // Limpa o timer se o componente for desmontado
    return () => clearTimeout(timer);
  }, []);

  // Função chamada pelo LoginScreen após sucesso
  const handleLoginSuccess = () => {
    setAppState('home');
  };

  // Função chamada para fazer Logout (retorna à tela de Login)
  const handleLogout = () => {
    setAppState('login');
  };

  const renderScreen = () => {
    if (appState === 'splash') {
      return <SplashScreen isLoading={splashLoading} />;
    } else if (appState === 'login') {
      return <LoginScreen onLoginSuccess={handleLoginSuccess} />;
    } else if (appState === 'home') {
      return <HomeScreen onLogout={handleLogout} />;
    }
    return null; // Retorna null para estados inesperados
  };

  return (
    <View style={styles.container}>
      {/* A barra de status será definida pela tela atual */}
      <StatusBar barStyle={appState === 'splash' || appState === 'login' ? 'dark-content' : 'dark-content'} />
      {renderScreen()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;