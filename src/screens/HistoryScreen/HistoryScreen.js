import React, { useEffect, useState } from "react";
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

import { styles, gradients, getIconStyle } from "./HistoryScreen.styles";
import theme from "../../theme/theme";
import ScoreCard from "../../components/ScoreCard/ScoreCard";

export default function HistoryScreen({ route }) {
  const navigation = useNavigation();
  const { level, from } = route.params || {};

  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadQuizData = async () => {
      try {
        const data = await AsyncStorage.getItem("lastQuizData");
        if (data) {
          const parsed = JSON.parse(data);
          setQuestions(parsed.questions || []);
          setAnswers(parsed.answers || []);
        }
      } catch (err) {
        console.log("Error loading last quiz data:", err);
      } finally {
        setLoading(false);
      }
    };

    loadQuizData();
  }, []);

  useEffect(() => {
    if (questions.length && answers.length) {
      const saveScore = async () => {
        try {
          const existing = await AsyncStorage.getItem("quizHistory");
          const parsed = existing ? JSON.parse(existing) : [];
          const score = answers.filter((a) => {
            const q = questions[a.questionIndex];
            return q && a.userAnswer === q.answer;
          }).length;
          const updated = [...parsed, { level, score, total: questions.length }];
          await AsyncStorage.setItem("quizHistory", JSON.stringify(updated));
        } catch (err) {
          console.log("Error saving score:", err);
        }
      };
      saveScore();
    }
  }, [questions, answers]);

  const handleRetry = () => {
    if (from === "Home") {
      navigation.navigate("Home", { level });
    } else {
      navigation.reset({
        index: 0,
        routes: [{ name: "Levels" }],
      });
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.headerText}>Loading summary...</Text>
      </View>
    );
  }

  const score = answers.filter((a) => {
    const q = questions[a.questionIndex];
    return q && a.userAnswer === q.answer;
  }).length;

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.primaryBlue }]}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <Animatable.View
          animation="fadeInDown"
          delay={100}
          style={styles.header}
        >
          <Text style={styles.headerText}>📊 Quiz Summary</Text>
        </Animatable.View>

        <ScoreCard level={level} score={score} total={questions.length} />

        <View style={styles.resultList}>
          {questions.map((q, idx) => {
            const answered = answers.find((a) => a.questionIndex === idx);
            const userAnswer = answered?.userAnswer;
            const correct = userAnswer === q.answer;
            const iconProps = getIconStyle(correct);

            return (
              <Animatable.View
                key={idx}
                animation="fadeInUp"
                delay={idx * 100}
                style={{ borderRadius: 20, marginBottom: 12 }}
              >
                <LinearGradient
                  colors={gradients.resultCard}
                  style={[
                    styles.resultCard,
                    correct ? styles.correctBorder : styles.incorrectBorder,
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
                    name={iconProps.name}
                    size={iconProps.size}
                    color={iconProps.color}
                    style={styles.icon}
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
    </View>
  );
}
