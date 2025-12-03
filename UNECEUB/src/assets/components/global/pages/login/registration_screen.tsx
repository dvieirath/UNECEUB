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
  SafeAreaView
} from 'react-native';

import { MaterialIcons } from '@expo/vector-icons'; 

// URL DO SEU BACKEND: SUBSTITUA 'localhost' PELO IP REAL DA SUA MÁQUINA
const API_BASE_URL = 'http://localhost:3000/api'; 
// Use 'http://SEU_IP_AQUI:3000/api' se estiver testando no celular físico

// =========================================================================
// Definição da Paleta de Cores da UneCEUB (Cores do login_screen.tsx)
// =========================================================================
const colors = {
  primary: '#4F1E7F',     // Roxo Principal
  logoAccent: '#BF0087',  // Lilás/Magenta do logo
  secondary: '#662C92',   // Roxo Secundário
  background: '#FFFFFF',  // Fundo Branco
  text: '#000000',        // Texto Preto
  placeholder: '#888888', // Cinza para placeholder
  error: '#FF4081',       // Magenta para Erro 
  inputBorder: '#E0E0E0', // Borda sutil para os inputs
  success: '#4CAF50',     // Cor Verde para Sucesso (NOVA)
};

interface RegistrationScreenProps {
  onRegistrationSuccess: () => void; // Propriedade para navegar de volta ao Login
}

// =========================================================================
// Funções Auxiliares
// =========================================================================
const calculateAge = (dob: Date): number => {
  const diff_ms = Date.now() - dob.getTime();
  const age_dt = new Date(diff_ms); 
  return Math.abs(age_dt.getUTCFullYear() - 1970);
};

const isEmailValid = (email: string): boolean => {
    // Regex básica para formato email@dominio.com
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
};

// =========================================================================
// Componente da tela de Cadastro (Agora com chamada real ao Backend)
// =========================================================================
const RegistrationScreen: React.FC<RegistrationScreenProps> = ({ onRegistrationSuccess }) => {
  const [cpf, setCpf] = useState<string>(''); 
  const [email, setEmail] = useState<string>(''); 
  const [password, setPassword] = useState<string>('');
  const [dateOfBirth, setDateOfBirth] = useState<string>(''); 
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>(''); // NOVO ESTADO

  const handleRegister = async () => {
    setError(''); 
    setSuccessMessage(''); // Limpa a mensagem de sucesso

    // --- 1. Validação de CPF (11 dígitos) ---
    const rawCpf = cpf.replace(/\D/g, ''); 
    if (rawCpf.length !== 11) {
      setError('O CPF deve conter exatamente 11 dígitos.');
      return;
    }
    
    // --- 2. Validação de Email ---
    if (!isEmailValid(email)) {
      setError('Por favor, insira um endereço de e-mail válido.');
      return;
    }

    // --- 3. Validação da Senha (Mínimo 5 caracteres) ---
    if (password.length < 5) {
      setError('A senha deve ter no mínimo 5 caracteres.');
      return;
    }
    
    // --- 4. Validação da Data de Nascimento e Idade Mínima (16 anos) ---
    const dobParts = dateOfBirth.split('/'); 
    if (dobParts.length !== 3) {
      setError('A data de nascimento deve estar no formato DD/MM/AAAA.');
      return;
    }
    
    const dob = new Date(
      parseInt(dobParts[2], 10), 
      parseInt(dobParts[1], 10) - 1, 
      parseInt(dobParts[0], 10)
    );

    if (isNaN(dob.getTime())) {
      setError('A data de nascimento é inválida.');
      return;
    }

    const age = calculateAge(dob);
    if (age < 16) {
      setError('Idade mínima para cadastro é de 16 anos.');
      return;
    }

    setIsLoading(true);
    
    // --- CHAMADA AO BACKEND (CADASTRO) ---
    try {
      const response = await fetch(`${API_BASE_URL}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cpf: rawCpf,
          email: email,
          password: password,
          dateOfBirth: `${dobParts[2]}-${dobParts[1]}-${dobParts[0]}`, // Formato ISO para PostgreSQL: YYYY-MM-DD
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // [1] Exibe a mensagem de sucesso
        setSuccessMessage(data.message || 'Cadastro realizado com sucesso!'); 
        
        // [2] Transição Automática após 2 segundos
        setTimeout(() => {
          onRegistrationSuccess(); 
        }, 2000); 

      } else {
        // Erro do Backend
        setError(data.message || 'Falha no cadastro. Tente novamente.');
      }
      
    } catch (e) {
      // Erro de conexão 
      console.error("Erro de Rede:", e);
      setError('Não foi possível conectar ao servidor. Verifique o backend.');
    } finally {
      // O indicador de carregamento só para após a tentativa de API
      if (!successMessage) { 
        setIsLoading(false);
      }
    }
  };

  const handleCpfChange = (text: string) => {
    // Mantém a formatação visual do CPF
    let formattedText = text.replace(/\D/g, '');
    if (formattedText.length > 9) {
      formattedText = formattedText.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    } else if (formattedText.length > 6) {
      formattedText = formattedText.replace(/(\d{3})(\d{3})(\d{3})/, '$1.$2.$3');
    } else if (formattedText.length > 3) {
      formattedText = formattedText.replace(/(\d{3})(\d{3})/, '$1.$2');
    }
    setCpf(formattedText);
  };

  const handleDateOfBirthChange = (text: string) => {
    // Formatação básica de Data (DD/MM/AAAA)
    let formattedText = text.replace(/\D/g, '');
    if (formattedText.length > 4) {
      formattedText = formattedText.replace(/(\d{2})(\d{2})(\d{4})/, '$1/$2/$3');
    } else if (formattedText.length > 2) {
      formattedText = formattedText.replace(/(\d{2})(\d{2})/, '$1/$2');
    }
    setDateOfBirth(formattedText);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <View style={styles.content}>
          
          {/* LOGO UneCEUB */}
          <View style={styles.logoContainer}>
            <Text style={styles.logoTextPart1}>UneCEU</Text>
            <Text style={styles.logoTextPart2}>B</Text>
          </View>
          
          <Text style={styles.title}>
            Novo Cadastro
          </Text>
          
          {/* Campos de Input aqui */}
          {/* ... (omitido: Campos Email, CPF, Data de Nascimento, Senha) ... */}

          {/* Campo Email */}
          <View style={styles.inputContainer}>
            <MaterialIcons name="email" size={24} color={colors.primary} style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="E-mail"
              placeholderTextColor={colors.placeholder}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address" 
              autoCapitalize="none"
              underlineColorAndroid="transparent" 
            />
          </View>

          {/* Campo CPF */}
          <View style={styles.inputContainer}>
            <MaterialIcons name="person-outline" size={24} color={colors.primary} style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="CPF"
              placeholderTextColor={colors.placeholder}
              value={cpf}
              onChangeText={handleCpfChange}
              keyboardType="numeric" 
              maxLength={14} 
              autoCapitalize="none"
              underlineColorAndroid="transparent" 
            />
          </View>
          
          {/* Campo Data de Nascimento */}
          <View style={styles.inputContainer}>
            <MaterialIcons name="date-range" size={24} color={colors.primary} style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Data de Nascimento (DD/MM/AAAA)"
              placeholderTextColor={colors.placeholder}
              value={dateOfBirth}
              onChangeText={handleDateOfBirthChange}
              keyboardType="numeric" 
              maxLength={10}
              autoCapitalize="none"
              underlineColorAndroid="transparent" 
            />
          </View>

          {/* Campo Senha */}
          <View style={styles.inputContainer}>
            <MaterialIcons name="lock-outline" size={24} color={colors.primary} style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Senha (mín. 5 caracteres)"
              placeholderTextColor={colors.placeholder}
              value={password}
              onChangeText={setPassword}
              secureTextEntry={true} 
              autoCapitalize="none"
              underlineColorAndroid="transparent" 
            />
          </View>
          
          {/* MENSAGEM DE SUCESSO (NOVO) */}
          {successMessage ? (
              <Text style={styles.successText}>{successMessage}</Text>
          ) : (
              /* Mensagem de Erro (Mantida) */
              error ? <Text style={styles.errorText}>{error}</Text> : null
          )}

          {/* Botão de Ação Principal (Desabilitado após sucesso) */}
          <TouchableOpacity 
            style={[styles.button, (isLoading || successMessage) && styles.buttonDisabled]} 
            onPress={handleRegister}
            disabled={isLoading || !!successMessage}
          >
            {(isLoading && !successMessage) ? (
              <ActivityIndicator color={colors.background} />
            ) : (
              <Text style={styles.buttonText}>
                Cadastrar
              </Text>
            )}
          </TouchableOpacity>
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
    paddingTop: 20, 
  },
  
  logoContainer: {
    flexDirection: 'row',
    alignSelf: 'center', 
    marginBottom: 50,
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
    marginBottom: 30, 
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
  successText: { // NOVO ESTILO
    color: colors.success, 
    marginBottom: 15,
    textAlign: 'center',
    fontWeight: '600',
    width: '100%',
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
    marginTop: 20, 
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: colors.background, 
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default RegistrationScreen;