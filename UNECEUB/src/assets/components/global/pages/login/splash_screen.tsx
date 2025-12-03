import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator, StatusBar } from 'react-native';

// =========================================================================
// Definição da Paleta de Cores baseada na imagem da UneCEUB (Roxo e Branco)
// =========================================================================
const colors = {
  primary: '#4F1E7F',     // Roxo Principal (Destaque, Loader)
  logoAccent: '#BF0087',  // Lilás/Magenta do logo
  background: '#FFFFFF',  // Fundo Branco
  text: '#000000',        // Texto Preto
};

interface SplashScreenProps {
  isLoading: boolean; // Propriedade para indicar que o carregamento está ativo
}

const SplashScreen: React.FC<SplashScreenProps> = ({ isLoading }) => {
  return (
    <View style={styles.container}>
      {/* Garante que a barra de status combine com o tema claro */}
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />

      {/* LOGO UneCEUB - Implementado com Text para consistência e visibilidade */}
      <View style={styles.logoContainer}>
        {/* Primeira parte do texto (Roxo Principal) */}
        <Text style={styles.logoTextPart1}>UneCEU</Text>
        {/* Segunda parte do texto (Magenta/Lilás de destaque) */}
        <Text style={styles.logoTextPart2}>B</Text>
      </View>
      
      <Text style={styles.subtitle}>Portal do Aluno</Text>
      
      {/* Indicador de Carregamento animado */}
      {isLoading && (
        <View style={styles.loadingContainer}>
          {/* O ActivityIndicator usa a cor Roxo Principal */}
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={styles.loadingText}>Carregando dados...</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background, // Fundo Branco
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  // ============ Estilos para o Logo de Texto ============
  logoContainer: {
    flexDirection: 'row',
    marginBottom: 20, // Espaço após o logo
  },
  logoTextPart1: {
    fontSize: 50,
    fontWeight: 'bold',
    color: colors.primary, // Roxo Principal
  },
  logoTextPart2: {
    fontSize: 50,
    fontWeight: 'bold',
    color: colors.logoAccent, // Lilás/Magenta
  },
  // =====================================================
  
  subtitle: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.text, // Texto Preto
    letterSpacing: 0.5,
    marginBottom: 50, // Espaço antes do carregador, se houver
  },
  loadingContainer: {
    position: 'absolute',
    bottom: 80,
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: colors.primary, // Cor de destaque no texto de carregamento
  }
});

export default SplashScreen;