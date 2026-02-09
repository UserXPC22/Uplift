
import React, { useState, useMemo } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TextInput, 
  TouchableOpacity
} from 'react-native';
import { Job } from '../types';

interface JobFeedProps {
  isDarkMode: boolean;
  jobs: Job[];
  onJobPress: (id: string) => void;
}

const AESTHETIC_COLORS = ['#8DFF74', '#78D9FF', '#ff9494', '#f5c6f5', '#FFEB3B', '#E2FF31'];

const getJobColor = (id: string) => {
  const hash = id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return AESTHETIC_COLORS[hash % AESTHETIC_COLORS.length];
};

const JobFeed: React.FC<JobFeedProps> = ({ isDarkMode, jobs, onJobPress }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('All');
  const [dateFilter, setDateFilter] = useState('Anytime');

  const containerBg = isDarkMode ? '#111111' : '#ffffff';
  const textColor = isDarkMode ? '#ffffff' : '#111111';
  const borderColor = isDarkMode ? '#ffffff' : '#111111';
  const cardBg = isDarkMode ? '#1a1a1a' : '#fff';

  const filteredJobs = useMemo(() => {
    let result = [...jobs].filter(job => {
      const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          job.company.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = typeFilter === 'All' || job.type === typeFilter;
      
      let matchesDate = true;
      const now = Date.now();
      const monthMs = 30 * 24 * 60 * 60 * 1000;
      
      if (dateFilter === 'This Month') {
        matchesDate = (now - job.createdAt) < monthMs;
      } else if (dateFilter === 'Last Month') {
        matchesDate = (now - job.createdAt) >= monthMs && (now - job.createdAt) < (2 * monthMs);
      }
      
      return matchesSearch && matchesType && matchesDate;
    });

    // Handle sorting
    if (dateFilter === 'Latest') {
      result.sort((a, b) => b.createdAt - a.createdAt);
    } else if (dateFilter === 'Oldest') {
      result.sort((a, b) => a.createdAt - b.createdAt);
    }

    return result;
  }, [jobs, searchTerm, typeFilter, dateFilter]);

  return (
    <View style={[styles.container, { backgroundColor: containerBg }]}>
      <View style={styles.topSection}>
        <View style={[styles.searchBar, { borderColor, backgroundColor: cardBg }]}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput 
            style={[styles.searchInput, { color: textColor }]}
            placeholder="Search roles or companies"
            value={searchTerm}
            onChangeText={setSearchTerm}
            placeholderTextColor="#7f7f80"
          />
        </View>

        <View style={styles.controlsRow}>
          {/* Type Dropdown */}
          <View style={[styles.customDropdown, { backgroundColor: cardBg, borderColor }]}>
            <select 
              style={styles.htmlSelect}
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
            >
              {['All', 'Full-time', 'Remote', 'Contract', 'Part-time', 'Intern'].map(opt => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
            <Text style={[styles.dropdownLabel, { color: textColor }]}>Type: {typeFilter}</Text>
            <Text style={[styles.chevron, { color: textColor }]}>▾</Text>
          </View>

          {/* Date Dropdown */}
          <View style={[styles.customDropdown, { backgroundColor: cardBg, borderColor }]}>
            <select 
              style={styles.htmlSelect}
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
            >
              {['Anytime', 'This Month', 'Last Month', 'Latest', 'Oldest'].map(opt => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
            <Text style={[styles.dropdownLabel, { color: textColor }]}>Date: {dateFilter}</Text>
            <Text style={[styles.chevron, { color: textColor }]}>▾</Text>
          </View>
        </View>
      </View>

      <ScrollView style={styles.list} contentContainerStyle={styles.listContent}>
        {filteredJobs.map(job => (
          <TouchableOpacity 
            key={job.id} 
            style={[styles.card, { backgroundColor: cardBg, borderColor }]} 
            onPress={() => onJobPress(job.id)}
            activeOpacity={0.8}
          >
            <View style={styles.cardHeader}>
              <View style={[styles.logoPlaceholder, { backgroundColor: getJobColor(job.id), borderColor }]}>
              </View>
              <View style={styles.mainInfo}>
                <Text style={[styles.title, { color: textColor }]}>{job.title}</Text>
                <Text style={[styles.company, { color: isDarkMode ? '#A0A0A0' : '#666' }]}>{job.company}</Text>
              </View>
              <Text style={[styles.salary, { color: textColor }]}>{job.salary}</Text>
            </View>
            
            <View style={styles.cardFooter}>
               <View style={[styles.tag, { borderColor }]}><Text style={styles.tagText}>{job.location}</Text></View>
               <View style={[styles.tag, { backgroundColor: '#8DFF74', borderColor }]}><Text style={styles.tagText}>{job.type}</Text></View>
               <View style={styles.spacer} />
               <Text style={[styles.time, { color: '#777' }]}>{job.postedDate}</Text>
            </View>
          </TouchableOpacity>
        ))}
        {filteredJobs.length === 0 && (
          <View style={styles.empty}>
            <Text style={[styles.emptyText, { color: textColor }]}>No job discoveries match your filters.</Text>
          </View>
        )}
        <View style={{ height: 120 }} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  topSection: { paddingVertical: 16 },
  searchBar: {
    height: 56, borderRadius: 28, flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: 20, marginHorizontal: 24, marginBottom: 16,
    borderWidth: 1.5,
  },
  searchIcon: { fontSize: 16, marginRight: 12 },
  searchInput: { flex: 1, fontSize: 15, fontWeight: '600', outlineStyle: 'none' } as any,
  controlsRow: { 
    flexDirection: 'row', 
    paddingHorizontal: 24, 
    gap: 12 
  },
  customDropdown: {
    flex: 1,
    height: 48,
    borderRadius: 24,
    borderWidth: 1.5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    position: 'relative',
  },
  htmlSelect: {
    position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, opacity: 0, cursor: 'pointer', width: '100%', height: '100%'
  } as any,
  dropdownLabel: { fontSize: 13, fontWeight: '700' },
  chevron: { fontSize: 12, fontWeight: 'bold' },
  list: { flex: 1 },
  listContent: { padding: 24 },
  card: { borderRadius: 28, padding: 20, marginBottom: 16, borderWidth: 1.5 },
  cardHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  logoPlaceholder: { width: 44, height: 44, borderRadius: 12, borderWidth: 1.5, alignItems: 'center', justifyContent: 'center' },
  mainInfo: { flex: 1, marginLeft: 16 },
  title: { fontSize: 16, fontWeight: '800' },
  company: { fontSize: 13, marginTop: 2, fontWeight: '500' },
  salary: { fontSize: 13, fontWeight: '900' },
  cardFooter: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  tag: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 100, borderWidth: 1.5, backgroundColor: '#78D9FF' },
  tagText: { fontSize: 10, fontWeight: '800', color: '#111111' },
  spacer: { flex: 1 },
  time: { fontSize: 10, fontWeight: '600' },
  empty: { padding: 40, alignItems: 'center' },
  emptyText: { fontSize: 15, fontWeight: '700' }
});

export default JobFeed;
