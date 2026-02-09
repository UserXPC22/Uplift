
import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  KeyboardAvoidingView, 
  Platform,
  ScrollView,
  Image
} from 'react-native';

interface LoginProps {
  onLogin: () => void;
  onGoToRegister: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin, onGoToRegister }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.logoCircle}>
            <Text style={styles.logoIcon}>✨</Text>
          </View>
          <Text style={styles.title}>Uplift</Text>
          <Text style={styles.subtitle}>Beyond the application and past the paperwork—we’re here to elevate your career path and help you land exactly where you belong.</Text>
        </View>

        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email Address</Text>
            <TextInput 
              style={styles.input}
              placeholder="name@example.com"
              value={email}
              onChangeText={setEmail}
              placeholderTextColor="#94a3b8"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Password</Text>
            <TextInput 
              style={styles.input}
              placeholder="••••••••"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              placeholderTextColor="#94a3b8"
            />
          </View>

          <TouchableOpacity style={styles.loginButton} onPress={onLogin} activeOpacity={0.8}>
            <Text style={styles.loginButtonText}>Get Started</Text>
          </TouchableOpacity>

          <View style={styles.footer}>
            <Text style={styles.footerText}>New here? </Text>
            <TouchableOpacity onPress={onGoToRegister}>
              <Text style={styles.registerText}>Join the waitlist</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  scrollContent: { flexGrow: 1, padding: 32, justifyContent: 'center' },
  header: { alignItems: 'center', marginBottom: 48 },
  logoCircle: { width: 80, height: 80, borderRadius: 40, backgroundColor: '#8DFF74', alignItems: 'center', justifyContent: 'center', marginBottom: 24, borderWidth: 1.5, borderColor: '#111111' },
  logoIcon: { fontSize: 36 },
  title: { fontSize: 32, fontWeight: '900', color: '#111111' },
  subtitle: { fontSize: 16, color: '#777', marginTop: 12, textAlign: 'center', fontWeight: '500', lineHeight: 24 },
  form: { gap: 24 },
  inputGroup: { gap: 10 },
  label: { fontSize: 14, fontWeight: '800', color: '#111111', marginLeft: 4 },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1.5,
    borderColor: '#111111',
    borderRadius: 24,
    padding: 18,
    fontSize: 16,
    color: '#111111',
    fontWeight: '600',
    outlineStyle: 'none'
  } as any,
  loginButton: {
    height: 64,
    backgroundColor: '#8DFF74',
    borderRadius: 32,
    borderWidth: 1.5,
    borderColor: '#111111',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12
  },
  loginButtonText: { color: '#111111', fontSize: 18, fontWeight: '800' },
  footer: { flexDirection: 'row', justifyContent: 'center', marginTop: 16 },
  footerText: { color: '#777', fontSize: 14, fontWeight: '500' },
  registerText: { color: '#111111', fontSize: 14, fontWeight: '800', textDecorationLine: 'underline' }
});

export default Login;