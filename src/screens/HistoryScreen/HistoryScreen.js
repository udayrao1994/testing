// features/HistoryScreen/HistoryScreen.js

import React, { useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import * as Animatable from "react-native-animatable";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { styles } from "./HistoryScreen.styles";

export default function HistoryScreen({ route }) {
  const navigation = useNavigation();
  const { questions, answers, level } = route.params;

  const score = answers.filter((a) => {
    const q = questions[a.questionIndex];
    return q && a.userAnswer === q.answer;
  }).length;

  useEffect(() => {
    const saveScore = async () => {
      try {
        const existing = await AsyncStorage.getItem("quizHistory");
        const parsed = existing ? JSON.parse(existing) : [];
        const updated = [...parsed, { level, score, total: questions.length }];
        await AsyncStorage.setItem("quizHistory", JSON.stringify(updated));
      } catch (err) {
        console.log("Error saving score:", err);
      }
    };
    saveScore();
  }, []);

  const handleRetry = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: "Levels" }],
    });
  };

  return (
    <LinearGradient colors={["#3B82F6", "#2563EB"]} style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <Animatable.View animation="fadeInDown" delay={100} style={styles.header}>
          <Text style={styles.headerText}>📊 Quiz Summary</Text>
        </Animatable.View>

        <Animatable.View animation="zoomIn" delay={200} style={styles.levelCard}>
          <LinearGradient colors={["#fef3c7", "#fcd34d"]} style={styles.levelCardInner}>
            <Text style={styles.levelLabel}>LEVEL : {level}</Text>
          </LinearGradient>
        </Animatable.View>

        <Animatable.View animation="zoomIn" delay={300} style={styles.scoreContainer}>
          <LinearGradient colors={["#1d4ed8", "#2563eb"]} style={styles.scoreBox}>
            <Text style={styles.scoreLabel}>Your Score</Text>
            <Text style={styles.scoreValue}>
              {score}/{questions.length}
            </Text>
          </LinearGradient>
        </Animatable.View>

        <View style={styles.resultList}>
          {questions.map((q, idx) => {
            const answered = answers.find((a) => a.questionIndex === idx);
            const userAnswer = answered?.userAnswer;
            const correct = userAnswer === q.answer;

            return (
              <Animatable.View
                key={idx}
                animation="fadeInUp"
                delay={idx * 100}
                style={{ borderRadius: 20, marginBottom: 12 }}
              >
                <LinearGradient
                  colors={["#e0ecff", "#c3dafc"]}
                  style={[
                    styles.resultCard,
                    {
                      borderColor: correct ? "#22c55e" : "#ef4444",
                      borderWidth: 2,
                    },
                  ]}
                >
                  <View style={{ flex: 1 }}>
                    <Text style={styles.questionText}>
                      Q{idx + 1}. {q.question}
                    </Text>
                    <Text style={styles.answerText}>
                      Correct: {q.answer} | Your:{" "}
                      {userAnswer !== undefined && userAnswer !== null
                        ? userAnswer
                        : "Skipped"}
                    </Text>
                  </View>
                  <AntDesign
                    name={correct ? "checkcircle" : "closecircle"}
                    size={24}
                    color={correct ? "#22c55e" : "#ef4444"}
                    style={{ marginLeft: 10 }}
                  />
                </LinearGradient>
              </Animatable.View>
            );
          })}
        </View>

        <TouchableOpacity
          onPress={() => navigation.navigate("leadboard")}
          style={styles.leaderboardButton}
        >
          <Text style={styles.leaderboardButtonText}>🏆 View Leaderboard</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleRetry} style={styles.retryButton}>
          <Text style={styles.retryButtonText}>🔁 Retry Quiz</Text>
        </TouchableOpacity>
      </ScrollView>
    </LinearGradient>
  );
}
