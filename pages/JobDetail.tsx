
import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  ActivityIndicator,
  Linking,
  Dimensions
} from 'react-native';
import { Job } from '../types';
import { extractSkills } from '../services/geminiService';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

interface JobDetailProps {
  isDarkMode: boolean;
  job: Job | undefined;
  onBack: () => void;
}

const AESTHETIC_COLORS = ['#8DFF74', '#78D9FF', '#ff9494', '#f5c6f5', '#FFEB3B', '#E2FF31'];

const getJobColor = (id: string) => {
  const hash = id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return AESTHETIC_COLORS[hash % AESTHETIC_COLORS.length];
};

const JobDetail: React.FC<JobDetailProps> = ({ isDarkMode, job, onBack }) => {
  const [aiSkills, setAiSkills] = useState<string[]>([]);
  const [isExtracting, setIsExtracting] = useState(false);

  useEffect(() => {
    const getSkills = async () => {
      if (job && job.description) {
        setIsExtracting(true);
        const skills = await extractSkills(job.description);
        setAiSkills(skills);
        setIsExtracting(false);
      }
    };
    getSkills();
  }, [job]);

  if (!job) return null;

  const containerBg = isDarkMode ? '#111111' : '#ffffff';
  const textColor = isDarkMode ? '#ffffff' : '#111111';
  const borderColor = isDarkMode ? '#ffffff' : '#111111';
  const cardBg = isDarkMode ? '#1a1a1a' : '#fff';

  return (
    <View style={[styles.container, { backgroundColor: containerBg }]}>
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={[styles.topSection, { backgroundColor: getJobColor(job.id) }]}>
           <TouchableOpacity onPress={onBack} style={[styles.backBtn, { borderColor }]}>
              <Text style={styles.backIcon}>←</Text>
           </TouchableOpacity>
        </View>

        <View style={[styles.detailSheet, { backgroundColor: containerBg, borderTopColor: borderColor }]}>
          <View style={styles.sheetHandle} />
          <View style={styles.headerInfo}>
             <View style={[styles.logoWrap, { borderColor, backgroundColor: getJobColor(job.id) }]}>
             </View>
             <View style={styles.titleInfo}>
                <Text style={[styles.jobTitle, { color: textColor }]}>{job.title}</Text>
                <Text style={[styles.companyName, { color: isDarkMode ? '#A0A0A0' : '#666' }]}>{job.company}</Text>
             </View>
          </View>

          <View style={styles.statsRow}>
            <View style={[styles.statItem, { backgroundColor: cardBg, borderColor }]}>
              <Text style={styles.statIcon}>💼</Text>
              <Text style={[styles.statLabel, { color: textColor }]}>{job.type}</Text>
            </View>
            <View style={[styles.statItem, { backgroundColor: cardBg, borderColor }]}>
              <Text style={styles.statIcon}>📍</Text>
              <Text style={[styles.statLabel, { color: textColor }]}>{job.location}</Text>
            </View>
            <View style={[styles.statItem, { backgroundColor: cardBg, borderColor }]}>
              <Text style={styles.statIcon}>💰</Text>
              <Text style={[styles.statLabel, { color: textColor }]} numberOfLines={1}>{job.salary}</Text>
            </View>
          </View>

          <View style={[styles.divider, { backgroundColor: borderColor }]} />

          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: textColor }]}>About the role</Text>
            <Text style={[styles.descriptionText, { color: isDarkMode ? '#ccc' : '#444' }]}>{job.description}</Text>
          </View>

          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: textColor }]}>Essential Skills</Text>
            {isExtracting ? (
              <ActivityIndicator color={textColor} style={{ marginVertical: 10 }} />
            ) : (
              <View style={styles.skillsList}>
                {(job.essentialSkills && job.essentialSkills.length > 0 ? job.essentialSkills : aiSkills).map((skill, i) => (
                  <View key={i} style={[styles.skillChip, { backgroundColor: i % 2 === 0 ? '#8DFF74' : '#78D9FF', borderColor }]}>
                    <Text style={styles.skillText}>{skill}</Text>
                  </View>
                ))}
              </View>
            )}
          </View>
        </View>
        <View style={{ height: 120 }} />
      </ScrollView>

      <View style={styles.actionFooter}>
        <TouchableOpacity style={[styles.applyButton, { borderColor }]} onPress={() => Linking.openURL(job.applyLink)}>
          <Text style={styles.applyButtonText}>Apply now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  scroll: { flex: 1 },
  topSection: { height: SCREEN_HEIGHT * 0.3, alignItems: 'center', justifyContent: 'center', position: 'relative' },
  backBtn: { position: 'absolute', top: 50, left: 24, width: 44, height: 44, borderRadius: 22, backgroundColor: '#fff', borderWidth: 1.5, alignItems: 'center', justifyContent: 'center' },
  backIcon: { fontSize: 24, fontWeight: '700', color: '#111111' },
  detailSheet: { marginTop: -40, borderTopLeftRadius: 40, borderTopRightRadius: 40, borderTopWidth: 1.5, paddingHorizontal: 24, paddingTop: 12 },
  sheetHandle: { width: 40, height: 4, borderRadius: 2, backgroundColor: '#ddd', alignSelf: 'center', marginBottom: 20 },
  headerInfo: { flexDirection: 'row', alignItems: 'center', marginBottom: 24 },
  logoWrap: { width: 64, height: 64, borderRadius: 16, borderWidth: 1.5, overflow: 'hidden', alignItems: 'center', justifyContent: 'center' },
  titleInfo: { marginLeft: 16, flex: 1 },
  jobTitle: { fontSize: 22, fontWeight: '900' },
  companyName: { fontSize: 15, fontWeight: '600', marginTop: 2 },
  statsRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 24, gap: 8 },
  statItem: { flex: 1, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 8, paddingVertical: 8, borderRadius: 16, borderWidth: 1.5 },
  statIcon: { fontSize: 14, marginRight: 4 },
  statLabel: { fontSize: 10, fontWeight: '700' },
  divider: { height: 1.5, opacity: 0.1, marginBottom: 24 },
  section: { marginBottom: 24 },
  sectionTitle: { fontSize: 18, fontWeight: '800', marginBottom: 12 },
  descriptionText: { fontSize: 15, lineHeight: 24, fontWeight: '500' },
  skillsList: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  skillChip: { paddingHorizontal: 14, paddingVertical: 8, borderRadius: 100, borderWidth: 1.5 },
  skillText: { fontSize: 12, fontWeight: '800', color: '#111111' },
  actionFooter: { position: 'absolute', bottom: 40, left: 24, right: 24 },
  applyButton: { backgroundColor: '#8DFF74', height: 64, borderRadius: 32, borderWidth: 1.5, alignItems: 'center', justifyContent: 'center' },
  applyButtonText: { fontSize: 18, fontWeight: '800', color: '#111111' }
});

export default JobDetail;
