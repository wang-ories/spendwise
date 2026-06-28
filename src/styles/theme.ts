import { StyleSheet } from 'react-native';

export const themes  = {
  background: '#0F172A',      
  header: '#1E293B',          
  surface: '#334155',         
  primary: '#10B981',         
  text: '#F8FAFC',            
  textSecondary: '#94A3B8',    
  alert: '#EF4444',           
  success: '#34D399',         
  accent: '#F59E0B',         
};

export const themeStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themes.background,
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: themes.text,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: themes.textSecondary,
    marginTop: 30,
    marginBottom: 16,
  },
  empty: {
    color: themes.textSecondary,
    fontSize: 14,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
