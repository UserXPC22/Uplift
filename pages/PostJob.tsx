
import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TextInput, 
  TouchableOpacity, 
  KeyboardAvoidingView, 
  Platform
} from 'react-native';
import { Job, JobType } from '../types';

interface PostJobProps {
  isDarkMode: boolean;
  onPostJob: (job: Job) => void;
  onCancel: () => void;
  editJob?: Job | null;
}

const EXPERIENCE_OPTIONS = ['Full-time', 'Remote', 'Contract', 'Part-time', 'Intern'];

const CURRENCY_MAP: Record<string, string> = {
  'PHP': '₱',
  'USD': '$',
  'EUR': '€',
  'GBP': '£',
  'SGD': 'S$',
  'MYR': 'RM',
  'JPY': '¥',
  'AUD': 'A$',
  'CAD': 'C$',
};

const CURRENCY_OPTIONS = Object.entries(CURRENCY_MAP).map(([code, symbol]) => ({
  label: `${code} (${symbol})`,
  value: code,
  symbol: symbol
}));

const PostJob: React.FC<PostJobProps> = ({ isDarkMode, onPostJob, onCancel, editJob }) => {
  const [title, setTitle] = useState('');
  const [company, setCompany] = useState('');
  const [location, setLocation] = useState('');
  const [jobType, setJobType] = useState<JobType>('Full-time');
  const [minSalary, setMinSalary] = useState('');
  const [maxSalary, setMaxSalary] = useState('');
  const [currencyCode, setCurrencyCode] = useState('PHP');
  const [applyLink, setApplyLink] = useState('');
  const [description, setDescription] = useState('');
  
  const [skillInput, setSkillInput] = useState('');
  const [essentialSkills, setEssentialSkills] = useState<string[]>([]);
  const [additionalLevels, setAdditionalLevels] = useState<string[]>([]);

  const formatNumber = (num: string) => {
    const numericValue = num.replace(/[^0-9]/g, '');
    if (!numericValue) return '';
    return numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  useEffect(() => {
    if (editJob) {
      setTitle(editJob.title);
      setCompany(editJob.company);
      setLocation(editJob.location);
      setJobType(editJob.type);
      setApplyLink(editJob.applyLink);
      setDescription(editJob.description);
      setEssentialSkills(editJob.essentialSkills || []);
      setAdditionalLevels(editJob.additionalLevels || []);
      
      const parts = editJob.salary.split(' ');
      if (parts.length >= 4) {
        const symbol = parts[0];
        const foundCode = Object.keys(CURRENCY_MAP).find(key => CURRENCY_MAP[key] === symbol);
        if (foundCode) setCurrencyCode(foundCode);
        setMinSalary(parts[1]);
        setMaxSalary(parts[3]);
      }
    }
  }, [editJob]);

  const handleMinSalaryChange = (text: string) => setMinSalary(formatNumber(text));
  const handleMaxSalaryChange = (text: string) => setMaxSalary(formatNumber(text));

  const handleAddSkill = () => {
    if (skillInput.trim() && !essentialSkills.includes(skillInput.trim())) {
      setEssentialSkills([...essentialSkills, skillInput.trim()]);
      setSkillInput('');
    }
  };

  const removeSkill = (skill: string) => setEssentialSkills(essentialSkills.filter(s => s !== skill));

  const handleSelectAdditionalLevel = (level: string) => {
    if (level && !additionalLevels.includes(level)) {
      setAdditionalLevels([...additionalLevels, level]);
    }
  };

  const removeAdditionalLevel = (level: string) => setAdditionalLevels(additionalLevels.filter(l => l !== level));

  const handlePost = () => {
    if (!title || !company || !description || !applyLink || !minSalary || !maxSalary) {
      alert('Fill in all required fields!');
      return;
    }
    
    const symbol = CURRENCY_MAP[currencyCode] || currencyCode;
    const formattedSalary = `${symbol} ${minSalary} - ${maxSalary}`;
    
    const newJob: Job = {
      id: editJob ? editJob.id : Math.random().toString(36).substr(2, 9),
      title,
      company,
      location: location || 'Remote',
      type: jobType,
      additionalLevels,
      essentialSkills,
      salary: formattedSalary,
      description,
      requirements: ['See description'],
      postedDate: editJob ? editJob.postedDate : 'Just now',
      createdAt: editJob ? editJob.createdAt : Date.now(),
      logo: `https://picsum.photos/seed/${company}/100/100`,
      applyLink,
    };
    onPostJob(newJob);
  };

  const containerBg = isDarkMode ? '#111111' : '#ffffff';
  const textColor = isDarkMode ? '#ffffff' : '#111111';
  const borderColor = isDarkMode ? '#ffffff' : '#111111';
  const inputBg = isDarkMode ? '#1a1a1a' : '#ffffff';

  const selectedCurrencyLabel = CURRENCY_OPTIONS.find(c => c.value === currencyCode)?.label || currencyCode;

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={[styles.container, { backgroundColor: containerBg }]}>
      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollInner} showsVerticalScrollIndicator={false}>
        <View style={styles.formHeader}>
          <Text style={[styles.formTitle, { color: textColor }]}>{editJob ? 'Edit Discovery' : 'Post Opportunity'}</Text>
          <Text style={[styles.formSub, { color: isDarkMode ? '#A0A0A0' : '#49454f' }]}>Fill in the details below to share a discovery.</Text>
        </View>

        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: textColor }]}>Job Title *</Text>
            <TextInput style={[styles.input, { backgroundColor: inputBg, borderColor, color: textColor }]} placeholder="e.g. Senior Android Developer" value={title} onChangeText={setTitle} placeholderTextColor="#777" />
          </View>

          <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: textColor }]}>Company Name *</Text>
            <TextInput style={[styles.input, { backgroundColor: inputBg, borderColor, color: textColor }]} placeholder="e.g. Google" value={company} onChangeText={setCompany} placeholderTextColor="#777" />
          </View>

          <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: textColor }]}>Location *</Text>
            <TextInput style={[styles.input, { backgroundColor: inputBg, borderColor, color: textColor }]} placeholder="e.g. Remote or City, Country" value={location} onChangeText={setLocation} placeholderTextColor="#777" />
          </View>

          <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: textColor }]}>Primary Experience Level *</Text>
            <View style={[styles.customDropdown, { backgroundColor: inputBg, borderColor }]}>
              <select 
                style={styles.htmlSelect}
                value={jobType}
                onChange={(e) => setJobType(e.target.value as JobType)}
              >
                {EXPERIENCE_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
              </select>
              <Text style={[styles.dropdownText, { color: textColor }]}>{jobType}</Text>
              <Text style={[styles.chevron, { color: textColor }]}>▾</Text>
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: textColor }]}>Additional Experience Levels</Text>
            <View style={[styles.customDropdown, { backgroundColor: inputBg, borderColor }]}>
              <select 
                style={styles.htmlSelect}
                value=""
                onChange={(e) => handleSelectAdditionalLevel(e.target.value)}
              >
                <option value="" disabled>Select a level to add...</option>
                {EXPERIENCE_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
              </select>
              <Text style={[styles.dropdownText, { color: '#777' }]}>Tap to add more levels...</Text>
              <Text style={[styles.chevron, { color: textColor }]}>▾</Text>
            </View>
            <View style={styles.skillsTagArea}>
              {additionalLevels.map((level, idx) => (
                <TouchableOpacity key={idx} style={[styles.skillTag, { borderColor, backgroundColor: '#E2FF31' }]} onPress={() => removeAdditionalLevel(level)}>
                  <Text style={styles.skillTagText}>{level} ✕</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: textColor }]}>Essential Skills</Text>
            <View style={styles.skillInputRow}>
              <TextInput 
                style={[styles.input, { flex: 1, backgroundColor: inputBg, borderColor, color: textColor }]} 
                placeholder="Add a skill..." 
                value={skillInput} 
                onChangeText={setSkillInput} 
                onSubmitEditing={handleAddSkill}
                placeholderTextColor="#777"
              />
              <TouchableOpacity style={[styles.addSkillBtn, { borderColor }]} onPress={handleAddSkill}>
                <Text style={styles.addSkillBtnText}>+</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.skillsTagArea}>
              {essentialSkills.map((skill, idx) => (
                <TouchableOpacity key={idx} style={[styles.skillTag, { borderColor }]} onPress={() => removeSkill(skill)}>
                  <Text style={styles.skillTagText}>{skill} ✕</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: textColor }]}>Salary Range *</Text>
            <View style={styles.salarySection}>
              <View style={[styles.customDropdown, styles.currencyDropdown, { backgroundColor: inputBg, borderColor }]}>
                <select 
                  style={styles.htmlSelect}
                  value={currencyCode}
                  onChange={(e) => setCurrencyCode(e.target.value)}
                >
                  {CURRENCY_OPTIONS.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                </select>
                <Text style={[styles.dropdownText, { color: textColor }]}>{selectedCurrencyLabel}</Text>
                <Text style={[styles.chevron, { color: textColor }]}>▾</Text>
              </View>
              
              <View style={styles.rangeInputRow}>
                <TextInput 
                  style={[styles.input, styles.salaryInput, { backgroundColor: inputBg, borderColor, color: textColor }]} 
                  placeholder="Min" 
                  value={minSalary} 
                  onChangeText={handleMinSalaryChange} 
                  keyboardType="numeric" 
                  placeholderTextColor="#777" 
                />
                <Text style={[styles.toText, { color: textColor }]}>to</Text>
                <TextInput 
                  style={[styles.input, styles.salaryInput, { backgroundColor: inputBg, borderColor, color: textColor }]} 
                  placeholder="Max" 
                  value={maxSalary} 
                  onChangeText={handleMaxSalaryChange} 
                  keyboardType="numeric" 
                  placeholderTextColor="#777" 
                />
              </View>
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: textColor }]}>Description *</Text>
            <TextInput style={[styles.input, styles.textArea, { backgroundColor: inputBg, borderColor, color: textColor }]} placeholder="Responsibilities and requirements..." value={description} onChangeText={setDescription} multiline numberOfLines={6} placeholderTextColor="#777" />
          </View>

          <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: textColor }]}>Application Link *</Text>
            <TextInput style={[styles.input, { backgroundColor: inputBg, borderColor, color: textColor }]} placeholder="URL here" value={applyLink} onChangeText={setApplyLink} autoCapitalize="none" keyboardType="url" placeholderTextColor="#777" />
          </View>
        </View>

        <View style={styles.footer}>
          <TouchableOpacity style={[styles.postBtn, { borderColor }]} onPress={handlePost} activeOpacity={0.8}>
            <Text style={styles.postText}>{editJob ? 'Update Discovery' : 'Publish Discovery'}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cancelBtn} onPress={onCancel}>
            <Text style={[styles.cancelText, { color: isDarkMode ? '#aaa' : '#49454f' }]}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  scroll: { flex: 1 },
  scrollInner: { padding: 24 },
  formHeader: { marginBottom: 28 },
  formTitle: { fontSize: 26, fontWeight: '900' },
  formSub: { fontSize: 14, marginTop: 4, fontWeight: '500' },
  form: { gap: 20 },
  inputGroup: { gap: 10 },
  label: { fontSize: 14, fontWeight: '800' },
  input: {
    borderWidth: 1.5,
    borderRadius: 18,
    padding: 14,
    fontSize: 15,
    fontWeight: '600',
    outlineStyle: 'none',
  } as any,
  textArea: { height: 120, textAlignVertical: 'top' },
  customDropdown: {
    height: 54,
    borderWidth: 1.5,
    borderRadius: 18,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'relative'
  },
  currencyDropdown: { minWidth: 140 },
  htmlSelect: {
    position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, opacity: 0, cursor: 'pointer', width: '100%', height: '100%'
  } as any,
  dropdownText: { fontSize: 15, fontWeight: '700' },
  chevron: { fontSize: 14, fontWeight: 'bold' },
  skillInputRow: { flexDirection: 'row', gap: 10 },
  addSkillBtn: { width: 50, height: 50, borderRadius: 18, borderWidth: 1.5, backgroundColor: '#8DFF74', alignItems: 'center', justifyContent: 'center' },
  addSkillBtnText: { fontSize: 24, fontWeight: 'bold', color: '#111111' },
  skillsTagArea: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 4 },
  skillTag: { backgroundColor: '#78D9FF', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 100, borderWidth: 1.5 },
  skillTagText: { color: '#111111', fontSize: 12, fontWeight: '800' },
  salarySection: { gap: 12 },
  rangeInputRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  salaryInput: { flex: 1 },
  toText: { fontSize: 13, fontWeight: '800', marginHorizontal: 2 },
  footer: { marginTop: 40, paddingBottom: 40, gap: 12 },
  postBtn: { height: 60, backgroundColor: '#8DFF74', borderRadius: 100, alignItems: 'center', justifyContent: 'center', borderWidth: 1.5 },
  postText: { color: '#111111', fontSize: 16, fontWeight: '800' },
  cancelBtn: { height: 50, alignItems: 'center', justifyContent: 'center' },
  cancelText: { fontSize: 14, fontWeight: '700' }
});

export default PostJob;
