
import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';

interface EditProfileProps {
  initialName: string;
  initialTitle: string;
  avatarColor: string;
  onSave: (name: string, title: string, avatarColor?: string) => void;
  onCancel: () => void;
}

const AESTHETIC_COLORS = ['#8DFF74', '#78D9FF', '#ff9494', '#f5c6f5', '#FFEB3B', '#E2FF31', '#FF9F40', '#FFCD56', '#4BC0C0', '#9966FF'];

const EditProfile: React.FC<EditProfileProps> = ({ initialName, initialTitle, avatarColor, onSave, onCancel }) => {
  const [name, setName] = useState(initialName);
  const [title, setTitle] = useState(initialTitle);
  const [currentColor, setCurrentColor] = useState(avatarColor);

  const getInitials = (n: string) => {
    return n.split(' ').map(part => part[0]).join('').toUpperCase().slice(0, 2);
  };

  const regenerateColor = () => {
    const newColor = AESTHETIC_COLORS[Math.floor(Math.random() * AESTHETIC_COLORS.length)];
    setCurrentColor(newColor);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onCancel} style={styles.headerBtn}>
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Edit Profile</Text>
        <TouchableOpacity onPress={() => onSave(name, title, currentColor)} style={styles.headerBtn}>
          <Text style={styles.saveText}>Save</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} contentContainerStyle={styles.contentInner}>
        <View style={styles.avatarWrap}>
          <View style={[styles.avatarBorder, { borderColor: '#111' }]}>
            <View style={[styles.avatar, { backgroundColor: currentColor }]}>
              <Text style={styles.avatarInitials}>{getInitials(name)}</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.changeBtn} onPress={regenerateColor}>
            <Text style={styles.changeText}>Regenerate Avatar Color</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Full Name</Text>
            <TextInput 
              style={styles.input} 
              value={name} 
              onChangeText={setName} 
              placeholder="Your Name"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Headline</Text>
            <TextInput 
              style={styles.input} 
              value={title} 
              onChangeText={setTitle} 
              placeholder="e.g. Senior Android Developer" 
            />
          </View>

          <View style={styles.infoBox}>
            <Text style={styles.infoText}>
              Your profile information helps others know who shared a job discovery.
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#ffffff' },
  header: { 
    height: 64, 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    paddingHorizontal: 16, 
    borderBottomWidth: 1.5, 
    borderBottomColor: '#111' 
  },
  headerBtn: { padding: 8 },
  cancelText: { color: '#64748b', fontSize: 15, fontWeight: '500' },
  saveText: { color: '#111', fontSize: 15, fontWeight: '900' },
  headerTitle: { fontSize: 18, fontWeight: '900', color: '#111' },
  content: { flex: 1 },
  contentInner: { padding: 24 },
  avatarWrap: { alignItems: 'center', marginBottom: 40 },
  avatarBorder: { padding: 4, borderRadius: 100, borderWidth: 1.5, borderColor: '#111' },
  avatar: { width: 100, height: 100, borderRadius: 50, alignItems: 'center', justifyContent: 'center' },
  avatarInitials: { fontSize: 36, fontWeight: '900', color: '#111' },
  changeBtn: { marginTop: 16 },
  changeText: { color: '#111', fontSize: 14, fontWeight: '800', textDecorationLine: 'underline' },
  form: { gap: 24 },
  inputGroup: { gap: 8 },
  label: { fontSize: 12, fontWeight: '900', color: '#111', textTransform: 'uppercase', letterSpacing: 1 },
  input: { 
    borderBottomWidth: 1.5, 
    borderBottomColor: '#111', 
    paddingVertical: 10, 
    fontSize: 17, 
    color: '#1c1b1f',
    outlineStyle: 'none' 
  } as any,
  infoBox: { backgroundColor: '#f8fafc', padding: 16, borderRadius: 12, marginTop: 12, borderWidth: 1.5, borderColor: '#111' },
  infoText: { fontSize: 13, color: '#111', lineHeight: 20, textAlign: 'center', fontWeight: '500' }
});

export default EditProfile;
