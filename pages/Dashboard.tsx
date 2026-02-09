
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { Job } from '../types';

const { width } = Dimensions.get('window');

interface DashboardProps {
  isDarkMode: boolean;
  recentlyViewed: Job[];
  onJobPress: (id: string) => void;
  onSeeAll: () => void;
  userName: string;
  onNavigateToProfile: () => void;
}

const AESTHETIC_COLORS = ['#8DFF74', '#78D9FF', '#ff9494', '#f5c6f5', '#FFEB3B', '#E2FF31'];

const getJobColor = (id: string) => {
  const hash = id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return AESTHETIC_COLORS[hash % AESTHETIC_COLORS.length];
};

const Dashboard: React.FC<DashboardProps> = ({ isDarkMode, recentlyViewed, onJobPress, onSeeAll, userName, onNavigateToProfile }) => {
  const containerBg = isDarkMode ? '#111111' : '#ffffff';
  const textColor = isDarkMode ? '#ffffff' : '#111111';
  const borderColor = isDarkMode ? '#ffffff' : '#111111';

  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: containerBg }]} 
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: textColor }]}>Recent Activity</Text>
          <TouchableOpacity onPress={onSeeAll}><Text style={[styles.seeAll, { color: textColor }]}>History ></Text></TouchableOpacity>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.featuredRow}>
          {recentlyViewed.length > 0 ? (
            recentlyViewed.map((job, idx) => (
              <TouchableOpacity 
                key={job.id} 
                style={[styles.featuredCard, { backgroundColor: idx % 2 === 0 ? '#78D9FF' : '#ff9494', borderColor }]} 
                onPress={() => onJobPress(job.id)}
              >
                <View style={[styles.cardImageArea, { borderColor, backgroundColor: getJobColor(job.id) }]}>
                </View>
                <View style={styles.cardContent}>
                  <Text style={styles.featuredTitle}>{job.title}</Text>
                  <View style={[styles.priceTag, { borderColor }]}>
                    <Text style={styles.priceText}>{job.salary}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))
          ) : (
             <View style={[styles.featuredCard, { backgroundColor: '#8DFF74', justifyContent: 'center', alignItems: 'center', borderColor }]}>
               <Text style={styles.featuredTitle}>No recent activity</Text>
               <Text style={{ fontSize: 12, marginTop: 8, textAlign: 'center', paddingHorizontal: 20 }}>Explore jobs to see your history here.</Text>
             </View>
          )}
        </ScrollView>
      </View>

      <View style={styles.section}>
        <TouchableOpacity 
          style={[styles.manageProfileBtn, { borderColor }]}
          onPress={onNavigateToProfile}
        >
          <View style={styles.manageProfileInner}>
            <Text style={styles.manageProfileText}>Manage Your Profile</Text>
            <Text style={styles.manageProfileSub}>Update resume, title, and job postings</Text>
          </View>
          <Text style={styles.manageProfileIcon}>👤</Text>
        </TouchableOpacity>
      </View>

      <View style={{ height: 100 }} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { paddingVertical: 24 },
  section: { paddingHorizontal: 24, marginBottom: 32 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  sectionTitle: { fontSize: 22, fontWeight: '800' },
  seeAll: { fontSize: 13, fontWeight: '600' },
  featuredRow: { gap: 16 },
  featuredCard: { width: width * 0.7, borderRadius: 32, padding: 16, borderWidth: 1.5, height: 260 },
  cardImageArea: { flex: 1, borderRadius: 20, overflow: 'hidden', borderWidth: 1.5, alignItems: 'center', justifyContent: 'center' },
  cardContent: { marginTop: 16 },
  featuredTitle: { fontSize: 16, fontWeight: '800', color: '#111111' },
  priceTag: { backgroundColor: '#fff', paddingHorizontal: 12, paddingVertical: 4, borderRadius: 100, alignSelf: 'flex-start', marginTop: 8, borderWidth: 1 },
  priceText: { fontSize: 11, fontWeight: '700', color: '#111111' },
  manageProfileBtn: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    backgroundColor: '#8DFF74', 
    padding: 24, 
    borderRadius: 32, 
    borderWidth: 1.5 
  },
  manageProfileInner: { flex: 1 },
  manageProfileText: { fontSize: 18, fontWeight: '800', color: '#111111' },
  manageProfileSub: { fontSize: 12, color: '#111111', opacity: 0.7, fontWeight: '500', marginTop: 4 },
  manageProfileIcon: { fontSize: 24 }
});

export default Dashboard;
