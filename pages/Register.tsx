
import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  KeyboardAvoidingView, 
  Platform,
  ScrollView
} from 'react-native';

interface RegisterProps {
  onBackToLogin: () => void;
  onRegister: (name: string, title: string) => void;
}

const Register: React.FC<RegisterProps> = ({ onBackToLogin, onRegister }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [title, setTitle] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = () => {
    if (!name || !email || !password) {
      alert("Please fill in all required fields.");
      return;
    }
    onRegister(name, title);
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <TouchableOpacity style={styles.backBtn} onPress={onBackToLogin}>
          <Text style={styles.backBtnIcon}>←</Text>
          <Text style={styles.backBtnText}>Back to Login</Text>
        </TouchableOpacity>

        <View style={styles.header}>
          <View style={styles.logoCircle}>
            <Text style={styles.logoIcon}>✨</Text>
          </View>
          <Text style={styles.title}>Join Uplift</Text>
          <Text style={styles.subtitle}>Start discovering your next big opportunity with the power of AI.</Text>
        </View>

        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Full Name *</Text>
            <TextInput 
              style={styles.input}
              placeholder="e.g. Alex Johnson"
              value={name}
              onChangeText={setName}
              placeholderTextColor="#94a3b8"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email Address *</Text>
            <TextInput 
              style={styles.input}
              placeholder="name@example.com"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              placeholderTextColor="#94a3b8"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Professional Headline</Text>
            <TextInput 
              style={styles.input}
              placeholder="e.g. Senior Product Designer"
              value={title}
              onChangeText={setTitle}
              placeholderTextColor="#94a3b8"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Password *</Text>
            <TextInput 
              style={styles.input}
              placeholder="Create a strong password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              placeholderTextColor="#94a3b8"
            />
          </View>

          <View style={styles.termsBox}>
            <Text style={styles.termsText}>
              By joining, you agree to our <Text style={styles.termsLink}>Terms</Text> and <Text style={styles.termsLink}>Privacy Policy</Text>.
            </Text>
          </View>

          <TouchableOpacity style={styles.registerButton} onPress={handleRegister} activeOpacity={0.8}>
            <Text style={styles.registerButtonText}>Create Account</Text>
          </TouchableOpacity>
        </View>
        <View style={{ height: 40 }} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#ffffff' },
  scrollContent: { padding: 32 },
  backBtn: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginBottom: 32, 
    marginTop: Platform.OS === 'ios' ? 0 : 20 
  },
  backBtnIcon: { fontSize: 20, fontWeight: '900', color: '#111111', marginRight: 8 },
  backBtnText: { color: '#111111', fontWeight: '800', fontSize: 14 },
  header: { alignItems: 'center', marginBottom: 40 },
  logoCircle: { 
    width: 70, 
    height: 70, 
    borderRadius: 35, 
    backgroundColor: '#78D9FF', 
    alignItems: 'center', 
    justifyContent: 'center', 
    marginBottom: 20, 
    borderWidth: 1.5, 
    borderColor: '#111111' 
  },
  logoIcon: { fontSize: 32 },
  title: { fontSize: 32, fontWeight: '900', color: '#111111', letterSpacing: -0.5 },
  subtitle: { fontSize: 16, color: '#777', marginTop: 12, textAlign: 'center', fontWeight: '500', lineHeight: 22 },
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
  termsBox: { paddingHorizontal: 10 },
  termsText: { fontSize: 12, color: '#777', textAlign: 'center', lineHeight: 18, fontWeight: '500' },
  termsLink: { color: '#111111', fontWeight: '800', textDecorationLine: 'underline' },
  registerButton: {
    height: 64,
    backgroundColor: '#8DFF74',
    borderRadius: 32,
    borderWidth: 1.5,
    borderColor: '#111111',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8
  },
  registerButtonText: { color: '#111111', fontSize: 18, fontWeight: '800' }
});

export default Register;