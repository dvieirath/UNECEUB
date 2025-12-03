import React, { useState, useEffect } from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';

// IMPORTANTE: Estes imports funcionam se os 4 arquivos
// (App.tsx, splash_screen.tsx, login_screen.tsx, home_screen.tsx) estiverem na mesma pasta.
import SplashScreen from './splash_screen.tsx';
import LoginScreen from './login_screen.tsx';
import HomeScreen from './home_screen.tsx';
import RegistrationScreen from './registration_screen.tsx'; // NOVO IMPORT

// Define os estados possíveis da aplicação
type AppState = 'splash' | 'login' | 'home' | 'register'; // NOVO ESTADO 'register'

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

  // --- Funções de Navegação ---

  // Função chamada pelo LoginScreen após sucesso
  const handleLoginSuccess = () => {
    setAppState('home');
  };

  // Função chamada para fazer Logout (retorna à tela de Login)
  const handleLogout = () => {
    setAppState('login');
  };
  
  // Função para ir para a tela de Cadastro
  const handleNavigateToRegister = () => {
    setAppState('register');
  };

  // Função chamada pelo RegistrationScreen após sucesso (volta para Login)
  const handleRegistrationSuccess = () => {
    setAppState('login');
  };
  
  // --- Renderização da Tela ---

  const renderScreen = () => {
    if (appState === 'splash') {
      return <SplashScreen isLoading={splashLoading} />;
    } else if (appState === 'login') {
      return (
        <LoginScreen 
          onLoginSuccess={handleLoginSuccess} 
          onNavigateToRegister={handleNavigateToRegister} // NOVO PROP
        />
      );
    } else if (appState === 'register') {
      return (
        <RegistrationScreen 
          onRegistrationSuccess={handleRegistrationSuccess} // NOVO COMPONENTE E PROP
        />
      );
    } else if (appState === 'home') {
      return <HomeScreen onLogout={handleLogout} />;
    }
    return null; 
  };

  return (
    <View style={styles.container}>
      {/* A barra de status será definida pela tela atual */}
      <StatusBar barStyle={appState === 'splash' || appState === 'login' || appState === 'register' ? 'dark-content' : 'dark-content'} />
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