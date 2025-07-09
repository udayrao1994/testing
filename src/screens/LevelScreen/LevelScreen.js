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

  const handleLevelPress = useCallback((level) => {
    if (unlockedLevels.includes(level)) {
      navigation.navigate('Home', { level });
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
        style={[styles.cardWrapper, { width: cardSize }]}
        testID={`levelCard-${item.level}`}
      >
        <TouchableOpacity
          onPress={() => handleLevelPress(item.level)}
          disabled={isLocked}
          activeOpacity={0.8}
          style={styles.buttonWrapper}
          testID={`levelButton-${item.level}`}
        >
          <LinearGradient
            colors={questionbox}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={[styles.gradientBackground, { height: cardSize }]}
          >
            <View style={styles.iconWrapper}>
              {isLocked ? (
                <Ionicons
                name="lock-closed"
                testID={`lockIcon-${item.level}`}
                style={styles.iconProps}
              />
              
              ) : (
                <Text style={styles.iconText} testID={`levelNumber-${item.level}`}>
                  {item.level}
                </Text>
              )}
            </View>
            <Text style={styles.levelText} testID={`levelLabel-${item.level}`}>
              Level {item.level}
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </Animatable.View>
    );
  }, [unlockedLevels, handleLevelPress, cardSize]);

  return (
    <View style={styles.container} testID="levelScreenContainer">
      <Animatable.Text animation="fadeInDown" style={styles.title} testID="levelScreenTitle">
        🎯 Select Your Level
      </Animatable.Text>

      <FlatList
        key={`columns-${numColumns}`}
        data={quizLevels}
        keyExtractor={(item) => item.level.toString()}
        renderItem={renderLevelCard}
        numColumns={numColumns}
        columnWrapperStyle={styles.columnWrapper}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        testID="levelList"
      />
    </View>
  );
};

export default LevelScreen;
