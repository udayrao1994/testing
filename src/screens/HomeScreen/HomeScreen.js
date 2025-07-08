import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Animated,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as Animatable from "react-native-animatable";
import { LinearGradient } from "expo-linear-gradient";
import styles, { gradientOrange } from "./HomeScreen.styles";
import { quizRepository } from "../../data/repositories/repositoryProvider";
import theme from "../../theme/theme";

export default function HomeScreen({ route }) {
  const navigation = useNavigation();
  const { questions, level } = route.params || {};
  const [currentIndex, setCurrentIndex] = useState(0);
  const [input, setInput] = useState("");
  const [answers, setAnswers] = useState([]);
  const progress = useRef(new Animated.Value(0)).current;
  const [timeLeft, setTimeLeft] = useState(10);

  const currentQ = questions?.[currentIndex];

  useEffect(() => {
    if (timeLeft === 0) {
      handleSkip();
      return;
    }
    const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft]);

  useEffect(() => setTimeLeft(10), [currentIndex]);

  const restart = useCallback(() => {
    setCurrentIndex(0);
    setAnswers([]);
  }, []);

  const goNext = () => {
    const next = currentIndex + 1;
    if (next < questions.length) {
      setCurrentIndex(next);
      Animated.timing(progress, {
        toValue: next,
        duration: 500,
        useNativeDriver: false,
      }).start();
    }
  };

  const handleSubmit = async () => {
    if (!input.trim()) return;
    const updatedAnswers = [
      ...answers,
      { questionIndex: currentIndex, userAnswer: input.trim() },
    ];
    setAnswers(updatedAnswers);
    setInput("");

    if (currentIndex === questions.length - 1) {
      const correctCount = updatedAnswers.reduce((acc, ans) => {
        const q = questions[ans.questionIndex];
        return acc + (q.answer === ans.userAnswer ? 1 : 0);
      }, 0);

      const resultData = {
        level,
        answers: updatedAnswers,
        questions,
        score: correctCount,
        playedAt: new Date().toISOString(),
      };

      await quizRepository.saveQuizHistory(resultData);

      await quizRepository.unlockLevelIfNeeded(level);
        console.log(resultData)
      navigation.navigate("History", {
        answers: updatedAnswers,
        questions,
        level,
        restart,
      });
    } else {
      goNext();
    }
  };

  const handleSkip = async () => {
    const updatedAnswers = [
      ...answers,
      { questionIndex: currentIndex, userAnswer: null },
    ];
    setAnswers(updatedAnswers);
    setInput("");

    if (currentIndex === questions.length - 1) {
      const correctCount = updatedAnswers.reduce((acc, ans) => {
        const q = questions[ans.questionIndex];
        return acc + (q.answer === ans.userAnswer ? 1 : 0);
      }, 0);

      const resultData = {
        level,
        answers: updatedAnswers,
        questions,
        score: correctCount,
        playedAt: new Date().toISOString(),
      };

      await quizRepository.saveQuizHistory(resultData);
      await quizRepository.unlockLevelIfNeeded(level);

      navigation.navigate("History", {
        answers: updatedAnswers,
        questions,
        level,
        restart,
      });
    } else {
      goNext();
    }
  };

  const handleKeyPress = (val) => setInput((prev) => prev + val);
  const handleBackspace = () => setInput((prev) => prev.slice(0, -1));

  const progressInterpolate = progress.interpolate({
    inputRange: [0, questions.length],
    outputRange: ["0%", "100%"],
  });

  if (!questions || questions.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No questions available.</Text>
      </View>
    );
  }

  return (
    <View style={[styles.header, { backgroundColor: theme.colors.primaryBlue }]}>
      <LinearGradient colors={theme.colors.gradientBlue} style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={styles.headerText}>Level: {level}</Text>
          <Text style={styles.headerText}>
            {currentIndex + 1}/{questions.length}
          </Text>
          <Text style={styles.headerText}>
            ⏳ {String(timeLeft).padStart(2, "0")}
          </Text>
        </View>
      </LinearGradient>

      <View style={styles.progressContainer}>
        <Animated.View
          style={[styles.progressBar, { width: progressInterpolate }]}
        />
      </View>

      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Animatable.View animation="fadeInUp" key={currentIndex}>
          <View style={styles.questionBox}>
            <Text style={styles.questionText}>{currentQ.question}</Text>
          </View>

          <Text style={styles.answerLabel}>✍️ Your Answer</Text>

          <View style={styles.inputBox}>
            <Text style={styles.inputText}>{input || " "}</Text>
          </View>

          <View style={styles.keypadContainer}>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((n) => (
              <TouchableOpacity
                key={n}
                onPress={() => handleKeyPress(n.toString())}
                style={styles.keypadButton}
              >
                <Text style={styles.keypadText}>{n}</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity
              onPress={handleBackspace}
              style={styles.backspaceButton}
            >
              <Text style={styles.backspaceText}>⌫ Backspace</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.actionRow}>
            <LinearGradient colors={gradientOrange} style={styles.actionButton}>
              <TouchableOpacity onPress={handleSkip} style={styles.fullWidthCenter}>
                <Text style={styles.actionText}>Skip</Text>
              </TouchableOpacity>
            </LinearGradient>

            <TouchableOpacity onPress={handleSubmit} style={styles.flexOne}>
              <LinearGradient colors={gradientOrange} style={styles.actionButton}>
                <Text style={styles.actionText}>
                  {currentIndex < questions.length - 1 ? "Save" : "Submit"}
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </Animatable.View>
      </ScrollView>

      <View style={styles.backContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <LinearGradient colors={gradientOrange} style={styles.backButton}>
            <Text style={styles.backText}>⬅ Back to Levels</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
}
