
import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  TouchableOpacity, 
  StatusBar,
} from 'react-native';
import Dashboard from './pages/Dashboard';
import JobFeed from './pages/JobFeed';
import JobDetail from './pages/JobDetail';
import PostJob from './pages/PostJob';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import EditProfile from './pages/EditProfile';
import Login from './pages/Login';
import Register from './pages/Register';
import History from './pages/History';
import UserPostings from './pages/UserPostings';
import { Job } from './types';
import { INITIAL_JOBS } from './constants';

type Screen = 'Login' | 'Register' | 'Home' | 'Search' | 'Profile' | 'Detail' | 'Post' | 'Settings' | 'EditProfile' | 'History' | 'UserPostings';

const AESTHETIC_COLORS = ['#8DFF74', '#78D9FF', '#ff9494', '#f5c6f5', '#FFEB3B', '#E2FF31', '#FF9F40', '#FFCD56', '#4BC0C0', '#9966FF'];
const getRandomColor = () => AESTHETIC_COLORS[Math.floor(Math.random() * AESTHETIC_COLORS.length)];

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [currentScreen, setCurrentScreen] = useState<Screen>('Login');
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [jobs, setJobs] = useState<Job[]>(INITIAL_JOBS);
  const [userJobsIds, setUserJobsIds] = useState<string[]>([]);
  const [recentlyViewedIds, setRecentlyViewedIds] = useState<string[]>([]);
  const [user, setUser] = useState({
    name: 'Clara Nguyen',
    title: 'Student',
    avatarColor: '#f5c6f5',
    avatarImage: null as string | null
  });

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    setCurrentScreen('Home');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentScreen('Login');
  };

  const navigateToDetail = (id: string) => {
    setSelectedJobId(id);
    setRecentlyViewedIds(prev => {
      const filtered = prev.filter(vId => vId !== id);
      return [id, ...filtered].slice(0, 20);
    });
    setCurrentScreen('Detail');
  };

  const navigateToScreen = (screen: Screen) => {
    setCurrentScreen(screen);
    setSelectedJobId(null);
    setEditingJob(null);
  };

  const handlePostJob = (newJob: Job) => {
    setJobs([newJob, ...jobs]);
    setUserJobsIds([newJob.id, ...userJobsIds]);
    navigateToScreen('Search');
  };

  const handleUpdateJob = (updatedJob: Job) => {
    setJobs(jobs.map(j => j.id === updatedJob.id ? updatedJob : j));
    navigateToScreen('Profile');
  };

  const handleDeleteJob = (id: string) => {
    setJobs(jobs.filter(j => j.id !== id));
    setUserJobsIds(userJobsIds.filter(uid => uid !== id));
    setRecentlyViewedIds(recentlyViewedIds.filter(rid => rid !== id));
  };

  const handleEditJob = (job: Job) => {
    setEditingJob(job);
    setCurrentScreen('Post');
  };

  const getRecentlyViewedJobs = () => {
    return recentlyViewedIds
      .map(id => jobs.find(j => j.id === id))
      .filter((j): j is Job => !!j);
  };

  const getUserPostedJobs = () => {
    return userJobsIds
      .map(id => jobs.find(j => j.id === id))
      .filter((j): j is Job => !!j);
  };

  const getUserInitials = () => {
    return user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const renderScreen = () => {
    if (!isAuthenticated) {
      if (currentScreen === 'Register') {
        return <Register onBackToLogin={() => setCurrentScreen('Login')} onRegister={(n, t) => { setUser({ ...user, name: n, title: t, avatarColor: getRandomColor() }); setIsAuthenticated(true); setCurrentScreen('Home'); }} />;
      }
      return <Login onLogin={handleLoginSuccess} onGoToRegister={() => setCurrentScreen('Register')} />;
    }

    switch (currentScreen) {
      case 'Home': 
        return <Dashboard 
          isDarkMode={isDarkMode} 
          recentlyViewed={getRecentlyViewedJobs()} 
          onJobPress={navigateToDetail} 
          onSeeAll={() => setCurrentScreen('History')}
          onNavigateToProfile={() => navigateToScreen('Profile')}
          userName={user.name}
        />;
      case 'History':
        return <History isDarkMode={isDarkMode} historyJobs={getRecentlyViewedJobs()} onJobPress={navigateToDetail} onBack={() => setCurrentScreen('Home')} />;
      case 'Search': 
        return <JobFeed isDarkMode={isDarkMode} jobs={jobs} onJobPress={navigateToDetail} />;
      case 'Profile': 
        return <Profile 
          name={user.name} 
          title={user.title} 
          avatarColor={user.avatarColor}
          initials={getUserInitials()}
          isDarkMode={isDarkMode}
          userPostedJobs={getUserPostedJobs()}
          recentlyViewedCount={recentlyViewedIds.length}
          onEdit={() => navigateToScreen('EditProfile')} 
          onNavigateToPost={() => navigateToScreen('Post')}
          onDeleteJob={handleDeleteJob}
          onEditJob={handleEditJob}
          onJobPress={navigateToDetail}
          onSeeAllPostings={() => navigateToScreen('UserPostings')}
        />;
      case 'UserPostings':
        return <UserPostings 
          isDarkMode={isDarkMode}
          userPostedJobs={getUserPostedJobs()}
          onDeleteJob={handleDeleteJob}
          onEditJob={handleEditJob}
          onJobPress={navigateToDetail}
          onBack={() => navigateToScreen('Profile')}
        />;
      case 'Settings':
        return <Settings isDarkMode={isDarkMode} onLogout={handleLogout} toggleDarkMode={toggleDarkMode} />;
      case 'EditProfile':
        return <EditProfile 
          initialName={user.name} 
          initialTitle={user.title} 
          avatarColor={user.avatarColor}
          onSave={(n, t, c) => { setUser({ ...user, name: n, title: t, avatarColor: c || user.avatarColor }); navigateToScreen('Profile'); }} 
          onCancel={() => navigateToScreen('Profile')} 
        />;
      case 'Detail':
        const job = jobs.find(j => j.id === selectedJobId);
        return <JobDetail isDarkMode={isDarkMode} job={job} onBack={() => navigateToScreen('Search')} />;
      case 'Post':
        return <PostJob 
          isDarkMode={isDarkMode} 
          onPostJob={editingJob ? handleUpdateJob : handlePostJob} 
          onCancel={() => navigateToScreen(editingJob ? 'Profile' : 'Search')} 
          editJob={editingJob} 
        />;
      default: return null;
    }
  };

  const isNavActive = (screen: Screen) => {
    if (screen === 'Search') return currentScreen === 'Search' || currentScreen === 'Detail';
    if (screen === 'Home') return currentScreen === 'Home' || currentScreen === 'History';
    if (screen === 'Profile') return currentScreen === 'Profile' || currentScreen === 'UserPostings';
    return currentScreen === screen;
  };

  const showHeaderAndNav = isAuthenticated && currentScreen !== 'EditProfile' && currentScreen !== 'History' && currentScreen !== 'Detail' && currentScreen !== 'UserPostings';
  const containerBg = isDarkMode ? '#111111' : '#ffffff';
  const surfaceBg = isDarkMode ? '#1a1a1a' : '#ffffff';
  const borderColor = isDarkMode ? '#ffffff' : '#111111';
  const textColor = isDarkMode ? '#ffffff' : '#111111';

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: containerBg }]}>
      <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} />
      
      {showHeaderAndNav && (
        <View style={[styles.header, { backgroundColor: surfaceBg, borderBottomColor: isDarkMode ? '#333' : '#eee' }]}>
          <View style={styles.headerUser}>
            <TouchableOpacity onPress={() => navigateToScreen('Profile')} style={[styles.avatarBorder, { borderColor }]}>
              <View style={[styles.avatarMini, { backgroundColor: user.avatarColor }]}>
                <Text style={styles.avatarInitialsMini}>{getUserInitials()}</Text>
              </View>
            </TouchableOpacity>
            <View style={styles.userInfo}>
              <Text style={[styles.userName, { color: textColor }]}>{user.name}</Text>
              <Text style={[styles.userTitle, { color: isDarkMode ? '#A0A0A0' : '#777' }]}>{user.title}</Text>
            </View>
          </View>
          <TouchableOpacity style={[styles.logoutBtn, { borderColor }]} onPress={handleLogout}>
             <Text style={[styles.logoutIcon, { color: textColor }]}>🚪</Text>
          </TouchableOpacity>
        </View>
      )}

      <View style={[styles.content, { backgroundColor: containerBg }]}>
        {renderScreen()}
      </View>

      {showHeaderAndNav && (
        <View style={[styles.bottomNav, { backgroundColor: surfaceBg, borderTopColor: isDarkMode ? '#333' : '#eee' }]}>
          <TouchableOpacity style={styles.navItem} onPress={() => navigateToScreen('Home')}>
            <View style={[styles.navIndicator, isNavActive('Home') && styles.navIndicatorActive]}>
              <Text style={[styles.navIcon, { color: textColor }]}>🏠</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem} onPress={() => navigateToScreen('Search')}>
            <View style={[styles.navIndicator, isNavActive('Search') && styles.navIndicatorActive]}>
              <Text style={[styles.navIcon, { color: textColor }]}>🔍</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem} onPress={() => navigateToScreen('Post')}>
            <View style={[styles.navIndicator, isNavActive('Post') && styles.navIndicatorActive]}>
              <Text style={[styles.navIcon, { color: textColor }]}>➕</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem} onPress={() => navigateToScreen('Profile')}>
            <View style={[styles.navIndicator, isNavActive('Profile') && styles.navIndicatorActive]}>
              <Text style={[styles.navIcon, { color: textColor }]}>👤</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem} onPress={() => navigateToScreen('Settings')}>
             <View style={[styles.navIndicator, isNavActive('Settings') && styles.navIndicatorActive]}>
              <Text style={[styles.navIcon, { color: textColor }]}>⚙️</Text>
            </View>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
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
    borderBottomWidth: 1.5,
  },
  headerUser: { flexDirection: 'row', alignItems: 'center' },
  avatarBorder: { padding: 2, borderRadius: 20, borderWidth: 1.5, overflow: 'hidden' },
  avatarMini: { width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center' },
  avatarInitialsMini: { fontSize: 12, fontWeight: '900', color: '#111111' },
  userInfo: { marginLeft: 12 },
  userName: { fontSize: 16, fontWeight: '700' },
  userTitle: { fontSize: 12, fontWeight: '500' },
  logoutBtn: { width: 44, height: 44, borderRadius: 22, borderWidth: 1.5, alignItems: 'center', justifyContent: 'center' },
  logoutIcon: { fontSize: 18 },
  content: { flex: 1 },
  bottomNav: { 
    height: 80, 
    flexDirection: 'row', 
    borderTopWidth: 1.5,
    paddingHorizontal: 16,
    alignItems: 'center'
  },
  navItem: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  navIndicator: { width: 60, height: 34, borderRadius: 17, alignItems: 'center', justifyContent: 'center' },
  navIndicatorActive: { backgroundColor: '#8DFF74' },
  navIcon: { fontSize: 22 },
});

export default App;
