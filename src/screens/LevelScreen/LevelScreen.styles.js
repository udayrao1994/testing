// LevelScreen.styles.ts

import { StyleSheet } from 'react-native';
import theme from '../../theme/theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.primaryBlue,
    paddingTop: 50,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
    textTransform: 'uppercase',
  },
  columnWrapper: {
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  listContent: {
    paddingBottom: 50,
  },
  cardWrapper: {
    marginBottom: 20,
  },
  buttonWrapper: {
    borderRadius: 20,
    overflow: 'hidden',
  },
  gradientBackground: {
    borderRadius: 20,
    padding: 22,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 5,
  },
  iconWrapper: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#f1f5ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 2,
    borderColor: '#c7d2fe',
  },
  iconText: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#2563eb',
  },
  levelText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#2563eb',
    textTransform: 'uppercase',
  },

  // 🔽 NEW: Styles for the Ionicon
  iconProps: {
    fontSize: 28,
    color: '#2563eb',
  },
});

export default styles;

export const questionbox = ['#ECECFF', '#D6D6FF'];
