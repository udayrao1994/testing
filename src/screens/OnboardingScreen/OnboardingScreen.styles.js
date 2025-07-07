import { StyleSheet, Dimensions } from 'react-native';
import theme from '../../theme/theme';

const { width } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: theme.spacing.xl * 2,
    paddingBottom: theme.spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomLeftRadius: 60,
    borderBottomRightRadius: 60,
    backgroundColor: theme.colors.primary,
  },
  image: {
    width: width * 0.7,
    height: width * 0.7,
    maxWidth: 300,
    maxHeight: 300,
    resizeMode: 'contain',
  },
  content: {
    flex: 1,
    paddingHorizontal: theme.spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 15,
  },
  title: {
    fontSize: theme.fontSizes.xlarge,
    color: theme.colors.white,
    fontWeight: theme.fontWeights.bold,
    textAlign: 'center',
    marginTop: theme.spacing.lg,
  },
  description: {
    fontSize: theme.fontSizes.medium,
    color: theme.colors.lightText,
    textAlign: 'center',
    paddingHorizontal: theme.spacing.sm,
  },
  dots: {
    flexDirection: 'row',
    marginTop: theme.spacing.sm,
    gap: 8,
  },
  dot: {
    fontSize: 22,
  },
  dotActive: {
    color: theme.colors.secondary,
  },
  dotInactive: {
    color: theme.colors.gray,
  },
  primaryButton: {
    backgroundColor: theme.colors.secondary,
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 30,
    marginTop: theme.spacing.lg,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  primaryButtonText: {
    color: theme.colors.white,
    fontWeight: theme.fontWeights.bold,
    fontSize: theme.fontSizes.medium,
  },
  secondaryButton: {
    marginTop: 15,
    borderColor: theme.colors.white,
    borderWidth: 1.5,
    borderRadius: 30,
    paddingVertical: 12,
    paddingHorizontal: 40,
  },
  secondaryButtonText: {
    color: theme.colors.white,
    fontSize: theme.fontSizes.medium,
    fontWeight: theme.fontWeights.bold,
  },
});
