import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Animatable from 'react-native-animatable';
import { styles, gradients } from './LeaderboardScreen.styles';
import { quizRepository } from '../../data/repositories/repositoryProvider';

export default function LeaderboardScreen() {
  const [levelScores, setLevelScores] = useState([]);

  useEffect(() => {
    const fetchScores = async () => {
      try {
        const parsed = await quizRepository.getQuizHistory();
        if (!parsed || !Array.isArray(parsed)) return;

        const uniqueLevels = {};

        parsed.forEach(entry => {
          const levelNum = Number(entry.level); // ensure numeric
          if (
            !uniqueLevels[levelNum] ||
            entry.score > uniqueLevels[levelNum].score
          ) {
            uniqueLevels[levelNum] = { ...entry, level: levelNum };
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
    <LinearGradient colors={gradients.container} style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <Animatable.View animation="fadeInDown" delay={100} style={styles.header}>
          <Text style={styles.headerText}>🏆 Leaderboard</Text>
        </Animatable.View>

        {levelScores.length === 0 ? (
          <Text style={styles.noDataText}>No scores available yet.</Text>
        ) : (
          levelScores.map((item, index) => (
            <Animatable.View
              key={index}
              animation="fadeInUp"
              delay={index * 150}
              style={styles.cardWrapper}
            >
              <LinearGradient
                colors={gradients.card}
                style={styles.levelCard}
              >
                <View style={styles.levelInfo}>
                  <Text style={styles.levelText}>Level {item.length}</Text>
                </View>
                <View style={styles.scoreInfo}>
                  <Text style={styles.scoreText}>
                    Score: {item.score} / {item.questions.length}
                    {console.log(item)}
                  </Text>
                </View>
              </LinearGradient>
            </Animatable.View>
          ))
        )}
      </ScrollView>
    </LinearGradient>
  );
}
