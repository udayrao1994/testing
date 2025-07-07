import { StyleSheet } from 'react-native';
import theme from '../../theme/theme';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: theme.colors.primaryBlue,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
 },
  card: {
    width: '100%',
    maxWidth: 380,
    backgroundColor: '#fff',
    borderRadius: 24,
    overflow: 'hidden',
    elevation: 4,
  },
  header: {
    backgroundColor: '#1d4ed8',
    height: 96,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: '600',
  },
  content: {
    padding: 24,
  },
  title: {
    fontSize: 30,
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: 8,
  },
  subtitle: {
    color: '#4b5563',
    marginBottom: 24,
  },
  input: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#f97316',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 24,
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 18,
  },
  loginText: {
    textAlign: 'center',
    color: '#374151',
    fontSize: 14,
  },
  loginLink: {
    color: '#f97316',
    fontWeight: '600',
  },
});

export default styles;
