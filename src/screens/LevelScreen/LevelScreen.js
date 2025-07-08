import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  Alert,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { quizRepository } from '../../data/repositories/repositoryProvider';
import styles, { questionbox } from './LevelScreen.styles';

const LevelScreen = ({ navigation }) => {
  const [unlockedLevels, setUnlockedLevels] = useState([1]);
  const [cardSize, setCardSize] = useState(150);
  const [numColumns, setNumColumns] = useState(2);
  const [quizLevels, setQuizLevels] = useState([]);

  useEffect(() => {
    const updateLayout = () => {
      const { width } = Dimensions.get('window');
      const padding = 40;
      const spacing = 20;
      const columns = width >= 768 ? 3 : 2;
      const totalSpacing = spacing * (columns + 1);
      const cardWidth = (width - totalSpacing - padding) / columns;

      setNumColumns(columns);
      setCardSize(Math.max(150, cardWidth));
    };

    updateLayout();
    const subscription = Dimensions.addEventListener('change', updateLayout);
    return () => subscription?.remove();
  }, []);

  useEffect(() => {
    const loadData = async () => {
      try {
        const unlocked = await quizRepository.getUnlockedLevels();
        setUnlockedLevels(unlocked);

        const data = await quizRepository.getAllLevelsWithQuestions();
        setQuizLevels(data);
      } catch (error) {
        console.error('Error loading level data:', error);
      }
    };

    const unsubscribe = navigation.addListener('focus', loadData);
    loadData();

    return unsubscribe;
  }, [navigation]);

  const handleLevelPress = useCallback((questions, level) => {
    if (unlockedLevels.includes(level)) {
      navigation.navigate('Home', { questions, level });
    } else {
      Alert.alert(
        'Level Locked',
        `Level ${level} is locked. Complete Level ${level - 1} to unlock it.`
      );
    }
  }, [unlockedLevels]);

  const renderLevelCard = useCallback(({ item }) => {
    const isLocked = !unlockedLevels.includes(item.level);

    return (
      <Animatable.View
        animation="zoomIn"
        delay={item.level * 100}
        style={{ width: cardSize, marginBottom: 20 }}
      >
        <TouchableOpacity
          onPress={() => handleLevelPress(item.questions, item.level)}
          disabled={isLocked}
          activeOpacity={0.8}
          style={{ borderRadius: 20, overflow: 'hidden' }}
        >
          <LinearGradient
            colors={questionbox}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{
              borderRadius: 20,
              height: cardSize,
              padding: 22,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              shadowColor: '#000',
              shadowOpacity: 0.2,
              shadowOffset: { width: 0, height: 3 },
              shadowRadius: 6,
              elevation: 5,
            }}
          >
            <View style={styles.iconWrapper}>
              {isLocked ? (
                <Ionicons name="lock-closed" size={28} color="#2563eb" />
              ) : (
                <Text style={styles.iconText}>{item.level}</Text>
              )}
            </View>
            <Text style={styles.levelText}>Level {item.level}</Text>
          </LinearGradient>
        </TouchableOpacity>
      </Animatable.View>
    );
  }, [unlockedLevels, handleLevelPress, cardSize]);

  return (
    <View style={styles.container}>
      <Animatable.Text animation="fadeInDown" style={styles.title}>
        🎯 Select Your Level
      </Animatable.Text>

      <FlatList
        data={quizLevels}
        keyExtractor={(item) => item.level.toString()}
        renderItem={renderLevelCard}
        numColumns={numColumns}
        columnWrapperStyle={{ justifyContent: 'space-between', paddingHorizontal: 20 }}
        contentContainerStyle={{ paddingBottom: 50 }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default LevelScreen;
