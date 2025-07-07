import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import * as Animatable from 'react-native-animatable';

import { styles } from './LeaderboardScreen.styles';
import { QuizRepository } from '../../data/repositories/QuizRepository';
import theme from '../../theme/theme';
import ScoreCard from '../../components/ScoreCard/ScoreCard';

const repo = new QuizRepository();

export default function LeaderboardScreen() {
  const [levelScores, setLevelScores] = useState([]);

  useEffect(() => {
    const fetchScores = async () => {
      try {
        const parsed = await repo.getHistory();
        const uniqueLevels = {};

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
    <View style={[styles.container, { backgroundColor: theme.colors.primaryBlue }]}>
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
            <ScoreCard level={item.level} score={item.score} total={item.total} />
          </Animatable.View>
        ))}
      </ScrollView>
    </View>
  );
}
