import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  // Importando AsyncStorage ou SecureStore para armazenar o token
  // IMPORTANTE: Para ambiente Expo, instale e use expo-secure-store.
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Sugestão para React Native/Expo para tokens

// Importa ícones da biblioteca Expo
import { MaterialIcons } from '@expo/vector-icons'; 

// URL DO SEU BACKEND: SUBSTITUA 'localhost' PELO IP REAL DA SUA MÁQUINA
const API_BASE_URL = 'http://192.168.56.1:3000/api'; 

// =========================================================================
// Definição da Paleta de Cores da UneCEUB
// =========================================================================
const colors = {
  primary: '#4F1E7F',     // Roxo Principal (Base do logo e botão "Acessar")
  logoAccent: '#BF0087',  // Lilás/Magenta do logo (Parte 'B' ou 'P')
  secondary: '#662C92',   // Roxo Secundário (Links, destaque)
  background: '#FFFFFF',  // Fundo Branco
  text: '#000000',        // Texto Preto
  placeholder: '#888888', // Cinza para placeholder
  error: '#FF4081',       // Magenta para Erro 
  inputBorder: '#E0E0E0', // Borda sutil para os inputs
};

interface LoginScreenProps {
  onLoginSuccess: () => void; 
  onNavigateToRegister: () => void; // Propriedade para ir para o Cadastro
}

// =========================================================================
// Componente principal da tela de Login (com chamada real ao Backend)
// =========================================================================
const LoginScreen: React.FC<LoginScreenProps> = ({ onLoginSuccess, onNavigateToRegister }) => {
  const [identifier, setIdentifier] = useState<string>(''); // CPF
  const [password, setPassword] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const handleSubmit = async () => {
    setError(''); 

    if (!identifier || !password) {
      setError('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    // 1. Validação de CPF (11 dígitos)
    const rawCpf = identifier.replace(/\D/g, ''); 

    if (rawCpf.length !== 11) {
      setError('O CPF deve conter exatamente 11 dígitos.');
      return;
    }

    setIsLoading(true);
    
    // --- CHAMADA AO BACKEND (LOGIN) ---
    try {
      const response = await fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cpf: rawCpf,
          password: password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Login bem-sucedido: o backend retornou o JWT
        const token = data.token;
        
        // Armazena o token para uso futuro (MUITO IMPORTANTE!)
        // Em um projeto real, use expo-secure-store para segurança máxima.
        await AsyncStorage.setItem('userToken', token);
        
        // Navega para a tela Home
        onLoginSuccess();
      } else {
        // Erro de Autenticação (401 - CPF ou Senha inválidos) ou outro erro do servidor
        setError(data.message || 'Falha no login. Verifique suas credenciais.');
      }
      
    } catch (e) {
      console.error("Erro de Rede:", e);
      // Erro de conexão (servidor backend não está rodando ou URL incorreta)
      setError('Não foi possível conectar ao servidor. Verifique o backend.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    Alert.alert('Recuperação', 'Redirecionando para recuperação de senha...');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <View style={styles.content}>
          
          {/* LOGO UneCEUB - Usando Text para garantir visibilidade e estilo da marca. */}
          <View style={styles.logoContainer}>
            <Text style={styles.logoTextPart1}>UneCEU</Text>
            <Text style={styles.logoTextPart2}>B</Text>
          </View>
          
          <Text style={styles.title}>
            Entrar
          </Text>

          {/* Campo de Identificação (CPF) */}
          <View style={styles.inputContainer}>
            <MaterialIcons name="person-outline" size={24} color={colors.primary} style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Insira o CPF"
              placeholderTextColor={colors.placeholder}
              value={identifier}
              onChangeText={setIdentifier}
              keyboardType="numeric" 
              maxLength={14} // Permite a digitação de caracteres de formatação (., -)
              autoCapitalize="none"
              underlineColorAndroid="transparent" 
            />
          </View>

          {/* Campo Senha */}
          <View style={[styles.inputContainer, styles.passwordInputContainer]}>
            <MaterialIcons name="lock-outline" size={24} color={colors.primary} style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Senha"
              placeholderTextColor={colors.placeholder}
              value={password}
              onChangeText={setPassword}
              secureTextEntry={true} 
              autoCapitalize="none"
              underlineColorAndroid="transparent" 
            />
          </View>

          {/* Link Esqueceu a Senha */}
          <TouchableOpacity onPress={handleForgotPassword} style={styles.forgotPasswordButton}>
            <Text style={styles.forgotPasswordText}>Esqueceu a senha?</Text>
          </TouchableOpacity>

          {/* Mensagem de Erro */}
          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          {/* Botão de Ação Principal */}
          <TouchableOpacity 
            style={[styles.button, isLoading && styles.buttonDisabled]} 
            onPress={handleSubmit}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color={colors.background} />
            ) : (
              <Text style={styles.buttonText}>
                Acessar
              </Text>
            )}
          </TouchableOpacity>
        
          {/* Link Cadastrar-se */}
          <View style={styles.registerContainer}>
              <Text style={styles.registerText}>Não tem conta?</Text>
              <TouchableOpacity onPress={onNavigateToRegister} style={styles.registerButton}>
                  <Text style={styles.registerButtonText}>Cadastre-se</Text>
              </TouchableOpacity>
          </View>
          
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 30,
    paddingTop: Platform.OS === 'android' ? 50 : 0, 
  },
  content: {
    alignItems: 'flex-start', 
    width: '100%',
    paddingTop: 50, 
  },
  
  logoContainer: {
    flexDirection: 'row',
    alignSelf: 'center', 
    marginBottom: 80,
  },
  logoTextPart1: {
    fontSize: 40,
    fontWeight: 'bold',
    color: colors.primary, 
  },
  logoTextPart2: {
    fontSize: 40,
    fontWeight: 'bold',
    color: colors.logoAccent, 
  },

  title: {
    fontSize: 26,
    color: colors.text,
    marginBottom: 50, 
    fontWeight: 'normal', 
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 40,
    marginBottom: 25, 
    borderBottomWidth: 1, 
    borderBottomColor: colors.inputBorder,
  },
  passwordInputContainer: {
    marginBottom: 10, 
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 40,
    color: colors.text,
    fontSize: 16,
    paddingHorizontal: 0, 
  },
  errorText: {
    color: colors.error,
    marginBottom: 15,
    textAlign: 'center',
    fontWeight: '600',
    width: '100%',
  },
  forgotPasswordButton: {
    alignSelf: 'flex-end',
    marginBottom: 50, 
  },
  forgotPasswordText: {
    color: colors.secondary, 
    fontSize: 14,
    fontWeight: 'normal', 
  },
  button: {
    width: '100%',
    height: 55,
    backgroundColor: colors.primary, 
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4, 
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    marginBottom: 20, // Espaço antes do link de cadastro
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: colors.background, 
    fontSize: 18,
    fontWeight: 'bold',
  },
  // ESTILOS PARA O LINK DE CADASTRO
  registerContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: 10,
  },
  registerText: {
    fontSize: 16,
    color: colors.text,
  },
  registerButton: {
    marginLeft: 5,
  },
  registerButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.secondary,
  }
});

export default LoginScreen;