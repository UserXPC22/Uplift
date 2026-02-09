
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Job } from '../types';

interface HistoryProps {
  isDarkMode: boolean;
  historyJobs: Job[];
  onJobPress: (id: string) => void;
  onBack: () => void;
}

const AESTHETIC_COLORS = ['#8DFF74', '#78D9FF', '#ff9494', '#f5c6f5', '#FFEB3B', '#E2FF31'];

const getJobColor = (id: string) => {
  const hash = id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return AESTHETIC_COLORS[hash % AESTHETIC_COLORS.length];
};

const History: React.FC<HistoryProps> = ({ isDarkMode, historyJobs, onJobPress, onBack }) => {
  const containerBg = isDarkMode ? '#111111' : '#ffffff';
  const textColor = isDarkMode ? '#ffffff' : '#111111';
  const borderColor = isDarkMode ? '#ffffff' : '#111111';
  const cardBg = isDarkMode ? '#1a1a1a' : '#ffffff';
  const subTextColor = isDarkMode ? '#A0A0A0' : '#666';

  return (
    <View style={[styles.container, { backgroundColor: containerBg }]}>
      {/* Header */}
      <View style={[styles.header, { borderBottomColor: isDarkMode ? '#333' : '#eee' }]}>
        <TouchableOpacity onPress={onBack} style={[styles.backBtn, { borderColor }]}>
          <Text style={[styles.backIcon, { color: textColor }]}>←</Text>
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: textColor }]}>Activity History</Text>
        <View style={{ width: 44 }} />
      </View>

      <ScrollView 
        contentContainerStyle={styles.content} 
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionLabel, { color: isDarkMode ? '#8DFF74' : '#111111' }]}>
            RECENTLY VIEWED DISCOVERIES
          </Text>
        </View>

        {historyJobs.length > 0 ? (
          <View style={styles.jobList}>
            {historyJobs.map((job, index) => (
              <TouchableOpacity 
                key={`${job.id}-${index}`} 
                style={[styles.historyCard, { backgroundColor: cardBg, borderColor }]}
                onPress={() => onJobPress(job.id)}
                activeOpacity={0.8}
              >
                <View style={[styles.logoDot, { backgroundColor: getJobColor(job.id), borderColor }]} />
                <View style={styles.jobInfo}>
                  <Text style={[styles.jobTitle, { color: textColor }]}>{job.title}</Text>
                  <Text style={[styles.jobMeta, { color: subTextColor }]}>
                    {job.company} • {job.location}
                  </Text>
                  <Text style={styles.viewedOn}>Viewed {job.postedDate}</Text>
                </View>
                <Text style={[styles.arrow, { color: borderColor }]}>›</Text>
              </TouchableOpacity>
            ))}
          </View>
        ) : (
          <View style={styles.emptyContainer}>
            <View style={[styles.emptyIconCircle, { borderColor, backgroundColor: isDarkMode ? '#1a1a1a' : '#f8fafc' }]}>
              <Text style={styles.emptyEmoji}>📁</Text>
            </View>
            <Text style={[styles.emptyText, { color: textColor }]}>Your folder is empty</Text>
            <Text style={[styles.emptySub, { color: subTextColor }]}>
              Jobs you've explored will appear here for quick access later.
            </Text>
            <TouchableOpacity 
              style={[styles.exploreBtn, { borderColor }]} 
              onPress={onBack}
            >
              <Text style={styles.exploreBtnText}>Start Discovering</Text>
            </TouchableOpacity>
          </View>
        )}
        <View style={{ height: 100 }} />
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
  backBtn: { 
    width: 44, 
    height: 44, 
    borderRadius: 22, 
    borderWidth: 1.5, 
    alignItems: 'center', 
    justifyContent: 'center',
    backgroundColor: 'transparent'
  },
  backIcon: { fontSize: 20, fontWeight: 'bold' },
  headerTitle: { fontSize: 18, fontWeight: '900' },
  content: { paddingHorizontal: 24, paddingTop: 24 },
  sectionHeader: { marginBottom: 16 },
  sectionLabel: { fontSize: 11, fontWeight: '900', textTransform: 'uppercase', letterSpacing: 1.5 },
  jobList: { gap: 12 },
  historyCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 24,
    borderWidth: 1.5,
  },
  logoDot: { 
    width: 48, 
    height: 48, 
    borderRadius: 14, 
    borderWidth: 1.5, 
    backgroundColor: '#f8fafc' 
  },
  jobInfo: { flex: 1, marginLeft: 16 },
  jobTitle: { fontSize: 16, fontWeight: '800', marginBottom: 2 },
  jobMeta: { fontSize: 13, fontWeight: '600', marginBottom: 4 },
  viewedOn: { fontSize: 11, color: '#94a3b8', fontWeight: '500' },
  arrow: { fontSize: 28, fontWeight: '300', marginLeft: 8 },
  emptyContainer: { 
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center', 
    marginTop: 80, 
    paddingHorizontal: 20 
  },
  emptyIconCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24
  },
  emptyEmoji: { fontSize: 48 },
  emptyText: { fontSize: 22, fontWeight: '900', marginBottom: 12 },
  emptySub: { fontSize: 14, textAlign: 'center', lineHeight: 22, marginBottom: 32, fontWeight: '500' },
  exploreBtn: { 
    backgroundColor: '#8DFF74', 
    paddingHorizontal: 32, 
    paddingVertical: 16, 
    borderRadius: 100, 
    borderWidth: 1.5 
  },
  exploreBtnText: { color: '#111111', fontWeight: '800', fontSize: 16 }
});

export default History;
