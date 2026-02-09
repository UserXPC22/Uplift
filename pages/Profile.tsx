
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Job } from '../types';

interface ProfileProps {
  name: string;
  title: string;
  avatarColor: string;
  initials: string;
  isDarkMode: boolean;
  userPostedJobs: Job[];
  recentlyViewedCount: number;
  onEdit: () => void;
  onNavigateToPost: () => void;
  onDeleteJob: (id: string) => void;
  onEditJob: (job: Job) => void;
  onJobPress: (id: string) => void;
  onSeeAllPostings: () => void;
}

const AESTHETIC_COLORS = ['#8DFF74', '#78D9FF', '#ff9494', '#f5c6f5', '#FFEB3B', '#E2FF31'];
const getJobColor = (id: string) => {
  const hash = id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return AESTHETIC_COLORS[hash % AESTHETIC_COLORS.length];
};

const Profile: React.FC<ProfileProps> = ({ 
  name, 
  title, 
  avatarColor,
  initials,
  isDarkMode, 
  userPostedJobs, 
  recentlyViewedCount,
  onEdit, 
  onNavigateToPost, 
  onDeleteJob, 
  onEditJob,
  onJobPress,
  onSeeAllPostings
}) => {
  const containerBg = isDarkMode ? '#111111' : '#ffffff';
  const textColor = isDarkMode ? '#ffffff' : '#111111';
  const borderColor = isDarkMode ? '#ffffff' : '#111111';
  const cardBg = isDarkMode ? '#1a1a1a' : '#ffffff';

  // Limit to 4 postings on profile
  const displayedJobs = userPostedJobs.slice(0, 4);

  return (
    <ScrollView style={[styles.container, { backgroundColor: containerBg }]} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      <View style={[styles.profileHeader, { backgroundColor: cardBg, borderBottomColor: isDarkMode ? '#333' : '#f4f4f4', borderBottomWidth: 1.5 }]}>
        <View style={[styles.avatarBorder, { borderColor }]}>
          <View style={[styles.avatar, { backgroundColor: avatarColor }]}>
            <Text style={styles.avatarInitials}>{initials}</Text>
          </View>
        </View>
        <Text style={[styles.userName, { color: textColor }]}>{name}</Text>
        <Text style={[styles.userTitle, { color: isDarkMode ? '#A0A0A0' : '#49454f' }]}>{title || 'Add a professional headline'}</Text>
        <TouchableOpacity style={[styles.editBtn, { borderColor }]} onPress={onEdit}>
          <Text style={styles.editBtnText}>Edit Profile</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionLabel, { color: isDarkMode ? '#8DFF74' : '#111111' }]}>Resume</Text>
        <View style={[styles.resumeBox, { backgroundColor: isDarkMode ? '#1a1a1a' : '#fdfbff', borderColor }]}>
          <Text style={styles.resumeIcon}>📄</Text>
          <View style={{ flex: 1 }}>
            <Text style={[styles.resumeName, { color: textColor }]}>{name.replace(' ', '_')}_Resume.pdf</Text>
            <Text style={[styles.resumeSize, { color: isDarkMode ? '#A0A0A0' : '#49454f' }]}>PDF • 1.2MB • Updated Today</Text>
          </View>
          <TouchableOpacity><Text style={styles.linkText}>Replace</Text></TouchableOpacity>
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionLabel, { color: isDarkMode ? '#8DFF74' : '#111111', marginBottom: 0 }]}>YOUR JOB POSTINGS</Text>
          {userPostedJobs.length > 4 && (
            <TouchableOpacity onPress={onSeeAllPostings}>
              <Text style={[styles.seeAllLink, { color: isDarkMode ? '#8DFF74' : '#111111' }]}>See All ({userPostedJobs.length})</Text>
            </TouchableOpacity>
          )}
        </View>
        {userPostedJobs.length > 0 ? (
          <View style={styles.jobList}>
            {displayedJobs.map(job => (
              <View key={job.id} style={[styles.jobCard, { backgroundColor: cardBg, borderColor }]}>
                <TouchableOpacity onPress={() => onJobPress(job.id)} style={styles.jobCardTop}>
                  <View style={[styles.logoDot, { backgroundColor: getJobColor(job.id), borderColor }]} />
                  <View style={styles.jobCardInfo}>
                    <Text style={[styles.jobTitle, { color: textColor }]} numberOfLines={1}>{job.title}</Text>
                    <Text style={[styles.jobMeta, { color: isDarkMode ? '#A0A0A0' : '#666' }]} numberOfLines={1}>{job.company} • {job.type}</Text>
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
          <View style={[styles.emptyCard, { backgroundColor: isDarkMode ? '#1a1a1a' : '#f8fafc', borderColor, borderWidth: 1.5 }]}>
            <Text style={[styles.emptyText, { color: isDarkMode ? '#A0A0A0' : '#94a3b8' }]}>You haven't posted any jobs yet.</Text>
            <TouchableOpacity style={[styles.postNowBtn, { borderColor }]} onPress={onNavigateToPost}>
              <Text style={styles.postNowText}>Post your first discovery</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionLabel, { color: isDarkMode ? '#8DFF74' : '#111111' }]}>Activity Summary</Text>
        <View style={styles.statRow}>
          <View style={[styles.statBox, { backgroundColor: cardBg, borderColor }]}>
            <Text style={[styles.statVal, { color: textColor }]}>{recentlyViewedCount}</Text>
            <Text style={styles.statLab}>Jobs Viewed</Text>
          </View>
          <View style={[styles.statBox, { backgroundColor: cardBg, borderColor }]}>
            <Text style={[styles.statVal, { color: textColor }]}>{userPostedJobs.length}</Text>
            <Text style={styles.statLab}>Posts Live</Text>
          </View>
        </View>
      </View>
      <View style={{ height: 100 }} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { paddingBottom: 40 },
  profileHeader: { alignItems: 'center', padding: 32 },
  avatarBorder: { padding: 3, borderRadius: 50, borderWidth: 1.5, marginBottom: 16 },
  avatar: { width: 88, height: 88, borderRadius: 44, alignItems: 'center', justifyContent: 'center' },
  avatarInitials: { fontSize: 32, fontWeight: '900', color: '#111111' },
  userName: { fontSize: 24, fontWeight: '900' },
  userTitle: { fontSize: 14, marginTop: 4, marginBottom: 16, textAlign: 'center', fontWeight: '500' },
  editBtn: { paddingHorizontal: 24, paddingVertical: 10, borderRadius: 100, borderWidth: 1.5, backgroundColor: '#8DFF74' },
  editBtnText: { fontSize: 14, fontWeight: '800', color: '#111111' },
  section: { paddingHorizontal: 24, paddingVertical: 16 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  sectionLabel: { fontSize: 11, fontWeight: '900', textTransform: 'uppercase', letterSpacing: 1.5 },
  seeAllLink: { fontSize: 11, fontWeight: '800', textDecorationLine: 'underline' },
  resumeBox: { flexDirection: 'row', alignItems: 'center', padding: 16, borderRadius: 20, borderWidth: 1.5 },
  resumeIcon: { fontSize: 24, marginRight: 16 },
  resumeName: { fontSize: 14, fontWeight: '700' },
  resumeSize: { fontSize: 11, marginTop: 2 },
  linkText: { fontSize: 12, color: '#111111', fontWeight: '800', backgroundColor: '#8DFF74', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 },
  jobList: { gap: 10 },
  jobCard: { 
    padding: 12, 
    borderRadius: 20, 
    borderWidth: 1.5, 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between' 
  },
  jobCardTop: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  logoDot: { width: 32, height: 32, borderRadius: 8, borderWidth: 1.5 },
  jobCardInfo: { marginLeft: 12, flex: 1 },
  jobTitle: { fontSize: 14, fontWeight: '800' },
  jobMeta: { fontSize: 11, marginTop: 2 },
  jobActions: { flexDirection: 'row', gap: 6, marginLeft: 8 },
  iconBtn: { 
    width: 36, 
    height: 36, 
    borderRadius: 10, 
    borderWidth: 1.5, 
    backgroundColor: '#78D9FF', 
    alignItems: 'center', 
    justifyContent: 'center' 
  },
  iconBtnText: { fontSize: 16 },
  deleteAction: { backgroundColor: '#ff9494' },
  emptyCard: { padding: 32, borderRadius: 28, alignItems: 'center' },
  emptyText: { fontSize: 13, marginBottom: 16, fontWeight: '500' },
  postNowBtn: { backgroundColor: '#8DFF74', paddingHorizontal: 20, paddingVertical: 12, borderRadius: 100, borderWidth: 1.5 },
  postNowText: { color: '#111111', fontSize: 14, fontWeight: '800' },
  statRow: { flexDirection: 'row', gap: 12 },
  statBox: { flex: 1, padding: 20, borderRadius: 24, borderWidth: 1.5, alignItems: 'center' },
  statVal: { fontSize: 22, fontWeight: '900' },
  statLab: { fontSize: 11, color: '#94a3b8', marginTop: 2, fontWeight: '700' }
});

export default Profile;
