// features/LevelScreen/LevelScreen.styles.js
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2563eb',
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
});

export default styles;
