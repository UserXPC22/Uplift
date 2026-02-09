
import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  TextInput,
  Alert
} from 'react-native';

interface SettingsProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  onLogout: () => void;
}

const Settings: React.FC<SettingsProps> = ({ isDarkMode, toggleDarkMode, onLogout }) => {
  const [isEditingPassword, setIsEditingPassword] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  
  const containerBg = isDarkMode ? '#111111' : '#ffffff';
  const textColor = isDarkMode ? '#ffffff' : '#111111';
  const borderColor = isDarkMode ? '#ffffff' : '#111111';
  const sectionBg = isDarkMode ? '#1a1a1a' : '#ffffff';
  const inputBg = isDarkMode ? '#222' : '#f9f9f9';

  const handlePasswordAction = () => {
    if (!isEditingPassword) {
      setIsEditingPassword(true);
    } else {
      if (newPassword.length < 6) {
        alert("Password must be at least 6 characters.");
        return;
      }
      // Simulate save
      setIsEditingPassword(false);
      setNewPassword('');
      alert("Password updated successfully! ✨");
    }
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: containerBg }]} showsVerticalScrollIndicator={false}>
      <View style={[styles.section, { backgroundColor: sectionBg, borderColor }]}>
        <Text style={[styles.sectionTitle, { color: isDarkMode ? '#8DFF74' : '#7f7f80' }]}>Account Settings</Text>
        
        <TouchableOpacity style={[styles.settingItem, { borderBottomColor: isDarkMode ? '#333' : '#eee' }]}>
          <Text style={[styles.settingText, { color: textColor }]}>Email Address</Text>
          <Text style={styles.settingValue}>clara.n@example.com</Text>
        </TouchableOpacity>

        <View style={[styles.settingItem, styles.passwordItem, { borderBottomColor: isDarkMode ? '#333' : '#eee' }]}>
          <View style={styles.passwordRow}>
            <Text style={[styles.settingText, { color: textColor }]}>Password</Text>
            {!isEditingPassword && <Text style={styles.settingValue}>••••••••</Text>}
          </View>
          
          {isEditingPassword && (
            <TextInput
              style={[styles.passwordInput, { borderColor, color: textColor, backgroundColor: inputBg }]}
              placeholder="Enter new password"
              placeholderTextColor="#777"
              secureTextEntry
              value={newPassword}
              onChangeText={setNewPassword}
              autoFocus
            />
          )}

          <TouchableOpacity 
            style={[
              isEditingPassword ? styles.changePwdBtn : styles.updateBadge, 
              { borderColor }
            ]} 
            onPress={handlePasswordAction}
          >
            <Text style={[styles.updateText, isEditingPassword && styles.changePwdText]}>
              {isEditingPassword ? 'CHANGE PASSWORD' : 'Update'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={[styles.section, { backgroundColor: sectionBg, borderColor }]}>
        <Text style={[styles.sectionTitle, { color: isDarkMode ? '#8DFF74' : '#7f7f80' }]}>General</Text>
        <TouchableOpacity style={[styles.settingItem, { borderBottomColor: isDarkMode ? '#333' : '#eee' }]} onPress={toggleDarkMode}>
          <Text style={[styles.settingText, { color: textColor }]}>Dark Mode</Text>
          <View style={[styles.toggle, isDarkMode && styles.toggleActive, { borderColor }]}>
             <View style={[styles.toggleCircle, isDarkMode && styles.toggleCircleActive, { backgroundColor: borderColor }]} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.settingItem, { borderBottomColor: 'transparent' }]}>
          <Text style={[styles.settingText, { color: textColor }]}>About Uplift</Text>
          <Text style={styles.chevron}>›</Text>
        </TouchableOpacity>
      </View>

      <View style={[styles.section, { backgroundColor: sectionBg, borderColor }]}>
        <Text style={[styles.sectionTitle, { color: isDarkMode ? '#8DFF74' : '#7f7f80' }]}>Advanced</Text>
        <View style={styles.infoBox}>
          <Text style={[styles.infoLabel, { color: textColor }]}>Account Created</Text>
          <Text style={styles.infoValue}>Oct 20, 2024</Text>
        </View>
        <TouchableOpacity style={styles.deleteBtn}>
          <Text style={styles.deleteText}>Delete Account Forever</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.logoutWrapper}>
        <TouchableOpacity style={[styles.logoutBtn, { backgroundColor: isDarkMode ? '#8DFF74' : '#111111', borderColor }]} onPress={onLogout} activeOpacity={0.8}>
          <Text style={[styles.logoutText, { color: isDarkMode ? '#111111' : '#ffffff' }]}>Log Out</Text>
        </TouchableOpacity>
      </View>
      <View style={{ height: 100 }} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  section: { 
    padding: 24, borderRadius: 32, 
    marginHorizontal: 20, marginTop: 20,
    borderWidth: 1.5,
  },
  sectionTitle: { fontSize: 11, fontWeight: '900', marginBottom: 16, textTransform: 'uppercase', letterSpacing: 1.5 },
  settingItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 14, borderBottomWidth: 0.5 },
  settingText: { fontSize: 16, fontWeight: '700' },
  settingValue: { fontSize: 14, color: '#7f7f80', fontWeight: '800' },
  updateBadge: { backgroundColor: '#8DFF74', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 100, borderWidth: 1.5 },
  updateText: { fontSize: 11, fontWeight: '900', color: '#111111' },
  passwordItem: { flexDirection: 'column', alignItems: 'stretch', gap: 12 },
  passwordRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  passwordInput: { 
    borderWidth: 1.5, 
    borderRadius: 16, 
    padding: 12, 
    fontSize: 14, 
    fontWeight: '600',
    outlineStyle: 'none'
  } as any,
  changePwdBtn: { 
    backgroundColor: '#E2FF31', 
    paddingVertical: 14, 
    borderRadius: 16, 
    borderWidth: 1.5, 
    alignItems: 'center', 
    justifyContent: 'center',
    marginTop: 4
  },
  changePwdText: { fontSize: 13, letterSpacing: 0.5 },
  toggle: { width: 44, height: 24, borderRadius: 12, backgroundColor: '#f1f0e6', padding: 2, borderWidth: 1.5 },
  toggleActive: { backgroundColor: '#8DFF74' },
  toggleCircle: { width: 16, height: 16, borderRadius: 8 },
  toggleCircleActive: { alignSelf: 'flex-end' },
  chevron: { fontSize: 24, color: '#7f7f80', fontWeight: '300' },
  infoBox: { paddingVertical: 14 },
  infoLabel: { fontSize: 16, fontWeight: '700' },
  infoValue: { fontSize: 13, color: '#7f7f80', marginTop: 4, fontWeight: '800' },
  deleteBtn: { marginTop: 12 },
  deleteText: { color: '#dc2626', fontSize: 14, fontWeight: '800', textDecorationLine: 'underline' },
  logoutWrapper: { padding: 24 },
  logoutBtn: { 
    height: 64, borderRadius: 32,
    alignItems: 'center', justifyContent: 'center',
    borderWidth: 1.5,
  },
  logoutText: { fontWeight: '900', fontSize: 16 },
});

export default Settings;