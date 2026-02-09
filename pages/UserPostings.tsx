
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Job } from '../types';

interface UserPostingsProps {
  isDarkMode: boolean;
  userPostedJobs: Job[];
  onDeleteJob: (id: string) => void;
  onEditJob: (job: Job) => void;
  onJobPress: (id: string) => void;
  onBack: () => void;
}

const AESTHETIC_COLORS = ['#8DFF74', '#78D9FF', '#ff9494', '#f5c6f5', '#FFEB3B', '#E2FF31'];
const getJobColor = (id: string) => {
  const hash = id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return AESTHETIC_COLORS[hash % AESTHETIC_COLORS.length];
};

const UserPostings: React.FC<UserPostingsProps> = ({ 
  isDarkMode, 
  userPostedJobs, 
  onDeleteJob, 
  onEditJob, 
  onJobPress, 
  onBack 
}) => {
  const containerBg = isDarkMode ? '#111111' : '#ffffff';
  const textColor = isDarkMode ? '#ffffff' : '#111111';
  const borderColor = isDarkMode ? '#ffffff' : '#111111';
  const cardBg = isDarkMode ? '#1a1a1a' : '#ffffff';

  return (
    <View style={[styles.container, { backgroundColor: containerBg }]}>
      <View style={[styles.header, { borderBottomColor: isDarkMode ? '#333' : '#eee' }]}>
        <TouchableOpacity onPress={onBack} style={[styles.backBtn, { borderColor }]}>
          <Text style={[styles.backIcon, { color: textColor }]}>←</Text>
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: textColor }]}>My Job Postings</Text>
        <View style={{ width: 44 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {userPostedJobs.length > 0 ? (
          <View style={styles.jobList}>
            {userPostedJobs.map(job => (
              <View key={job.id} style={[styles.jobCard, { backgroundColor: cardBg, borderColor }]}>
                <TouchableOpacity onPress={() => onJobPress(job.id)} style={styles.jobCardTop}>
                  <View style={[styles.logoDot, { backgroundColor: getJobColor(job.id), borderColor }]} />
                  <View style={styles.jobCardInfo}>
                    <Text style={[styles.jobTitle, { color: textColor }]}>{job.title}</Text>
                    <Text style={[styles.jobMeta, { color: isDarkMode ? '#A0A0A0' : '#666' }]}>{job.company} • {job.type}</Text>
                  </View>
                </TouchableOpacity>
                <View style={styles.jobActions}>
                  <TouchableOpacity style={[styles.iconBtn, { borderColor }]} onPress={() => onEditJob(job)}>
                    <Text style={styles.iconBtnText}>✏️</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={[styles.iconBtn, styles.deleteAction, { borderColor }]} onPress={() => onDeleteJob(job.id)}>
                    <Text style={styles.iconBtnText}>🗑️</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        ) : (
          <View style={styles.empty}>
            <Text style={[styles.emptyText, { color: textColor }]}>No postings found.</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { 
    height: 80, 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    paddingHorizontal: 24, 
    borderBottomWidth: 1.5 
  },
  backBtn: { width: 44, height: 44, borderRadius: 22, borderWidth: 1.5, alignItems: 'center', justifyContent: 'center' },
  backIcon: { fontSize: 20, fontWeight: 'bold' },
  headerTitle: { fontSize: 18, fontWeight: '800' },
  content: { padding: 24 },
  jobList: { gap: 16 },
  jobCard: { 
    padding: 16, 
    borderRadius: 24, 
    borderWidth: 1.5, 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between' 
  },
  jobCardTop: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  logoDot: { width: 40, height: 40, borderRadius: 10, borderWidth: 1.5 },
  jobCardInfo: { marginLeft: 16, flex: 1 },
  jobTitle: { fontSize: 16, fontWeight: '800' },
  jobMeta: { fontSize: 12, marginTop: 2 },
  jobActions: { flexDirection: 'row', gap: 10, marginLeft: 8 },
  iconBtn: { 
    width: 44, 
    height: 44, 
    borderRadius: 12, 
    borderWidth: 1.5, 
    backgroundColor: '#78D9FF', 
    alignItems: 'center', 
    justifyContent: 'center' 
  },
  iconBtnText: { fontSize: 18 },
  deleteAction: { backgroundColor: '#ff9494' },
  empty: { flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: 100 },
  emptyText: { fontSize: 16, fontWeight: '600' }
});

export default UserPostings;
