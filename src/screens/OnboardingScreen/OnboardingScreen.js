import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import styles from './OnboardingScreen.styles';

const { width } = Dimensions.get('window');
const welcomeLogo = require('../../../assets/tiny-people-sitting-standing-near-giant-faq.png')

const OnboardingScreen = ({ navigation }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const onboardingSlides = [
    {
      title: 'Welcome to the Math Quiz!',
      description: 'Sharpen your arithmetic skills and solve challenging math problems!',
    },
    {
      title: 'Choose Your Difficulty',
      description: 'From easy sums to complex equations, select a level that matches your expertise.',
    },
    {
      title: 'Track Your Progress',
      description: 'View your quiz history, see your level, and compete on the leaderboard!',
    },
  ];

  const handleNext = () => {
    if (currentSlide < onboardingSlides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      navigation.replace('Register');
    }
  };

  const handleBack = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const current = onboardingSlides[currentSlide];

  return (
    <LinearGradient colors={['#3B82F6', '#2563eb']} style={styles.container}>
      <View style={styles.header}>
        <Image source={welcomeLogo} style={styles.image} />
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>{current.title}</Text>
        <Text style={styles.description}>{current.description}</Text>

        <View style={styles.dots}>
          {onboardingSlides.map((_, index) => (
            <Text
              key={index}
              style={[
                styles.dot,
                { color: index === currentSlide ? '#f97316' : '#ccc' },
              ]}
            >
              ●
            </Text>
          ))}
        </View>

        <TouchableOpacity style={styles.primaryButton} onPress={handleNext}>
          <Text style={styles.primaryButtonText}>
            {currentSlide === onboardingSlides.length - 1 ? 'Get Started' : 'Next'}
          </Text>
        </TouchableOpacity>

        {currentSlide > 0 && (
          <TouchableOpacity style={styles.secondaryButton} onPress={handleBack}>
            <Text style={styles.secondaryButtonText}>Back</Text>
          </TouchableOpacity>
        )}
      </View>
    </LinearGradient>
  );
};

export default OnboardingScreen;
