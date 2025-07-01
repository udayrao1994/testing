// features/LeaderboardScreen/LeaderboardScreen.js

import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Animatable from 'react-native-animatable';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from './LeaderboardScreen.styles';

export default function LeaderboardScreen() {
  const [levelScores, setLevelScores] = useState([]);

  useEffect(() => {
    const fetchScores = async () => {
      try {
        const stored = await AsyncStorage.getItem('quizHistory');
        const parsed = stored ? JSON.parse(stored) : [];
        const uniqueLevels = {};

        // Keep only the highest score per level
        parsed.forEach(entry => {
          if (
            !uniqueLevels[entry.level] ||
            entry.score > uniqueLevels[entry.level].score
          ) {
            uniqueLevels[entry.level] = entry;
          }
        });

        const sorted = Object.values(uniqueLevels).sort((a, b) => a.level - b.level);
        setLevelScores(sorted);
      } catch (err) {
        console.log('Failed to load scores:', err);
      }
    };

    fetchScores();
  }, []);

  return (
    <LinearGradient colors={['#3B82F6', '#2563EB']} style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <Animatable.View animation="fadeInDown" delay={100} style={styles.header}>
          <Text style={styles.headerText}>🏆 Leaderboard</Text>
        </Animatable.View>

        {levelScores.map((item, index) => (
          <Animatable.View
            key={index}
            animation="fadeInUp"
            delay={index * 150}
            style={styles.cardWrapper}
          >
            <LinearGradient
              colors={['#e0f2fe', '#bae6fd']}
              style={styles.levelCard}
            >
              <View style={styles.levelInfo}>
                <Text style={styles.levelText}>Level {item.level}</Text>
              </View>
              <View style={styles.scoreInfo}>
                <Text style={styles.scoreText}>
                  Score: {item.score} / {item.total}
                </Text>
              </View>
            </LinearGradient>
          </Animatable.View>
        ))}
      </ScrollView>
    </LinearGradient>
  );
}
