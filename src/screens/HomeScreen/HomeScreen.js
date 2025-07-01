import React, { useState, useRef, useEffect } from "react";
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
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "./HomeScreen.styles";

export default function HomeScreen({ route }) {
  const navigation = useNavigation();
  const { questions, level } = route.params || {};
  const [currentIndex, setCurrentIndex] = useState(0);
  const [input, setInput] = useState("");
  const [answers, setAnswers] = useState([]);
  const progress = useRef(new Animated.Value(0)).current;
  const [timeLeft, setTimeLeft] = useState(10);

  if (!questions || !Array.isArray(questions) || questions.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No questions available.</Text>
      </View>
    );
  }

  const currentQ = questions[currentIndex];

  useEffect(() => {
    if (timeLeft === 0) {
      handleSkip();
      return;
    }
    const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft]);

  useEffect(() => setTimeLeft(10), [currentIndex]);

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

  const unlockNextLevel = async () => {
    try {
      const storedLevel = await AsyncStorage.getItem("unlockedLevel");
      const unlocked = storedLevel ? parseInt(storedLevel, 10) : 1;
      if (level === unlocked) {
        await AsyncStorage.setItem("unlockedLevel", (unlocked + 1).toString());
      }
    } catch (err) {
      console.error("Failed to update unlocked level", err);
    }
  };

  const handleSubmit = async () => {
    const userAnswer = input.trim();
    if (!userAnswer) return;

    const updatedAnswers = [
      ...answers,
      { questionIndex: currentIndex, userAnswer },
    ];
    setAnswers(updatedAnswers);
    setInput("");

    if (currentIndex === questions.length - 1) {
      await unlockNextLevel();
      navigation.navigate("History", {
        answers: updatedAnswers,
        questions,
        level,
        restart: () => {
          setCurrentIndex(0);
          setAnswers([]);
        },
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
      await unlockNextLevel();
      navigation.navigate("History", {
        answers: updatedAnswers,
        questions,
        level,
        restart: () => {
          setCurrentIndex(0);
          setAnswers([]);
        },
      });
    } else {
      goNext();
    }
  };

  const progressInterpolate = progress.interpolate({
    inputRange: [0, questions.length],
    outputRange: ["0%", "100%"],
  });

  const handleKeyPress = (value) => {
    setInput((prev) => prev + value);
  };

  const handleBackspace = () => {
    setInput((prev) => prev.slice(0, -1));
  };

  return (
    <LinearGradient colors={['#3B82F6', '#2563EB']} style={{ flex: 1 }}>
      {/* Header */}
      <LinearGradient colors={['#3B82F6', '#2563EB']} style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={styles.headerText}>Level : {level}</Text>
          <Text style={styles.headerText}>{currentIndex + 1}/{questions.length}</Text>
          <Text style={styles.headerText}>⏳ {String(timeLeft).padStart(2, "0")}</Text>
        </View>
      </LinearGradient>

      {/* Progress Bar */}
      <View style={styles.progressContainer}>
        <Animated.View style={[styles.progressBar, { width: progressInterpolate }]} />
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

          {/* Keypad */}
          <View style={styles.keypadContainer}>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((num, idx) => (
              <TouchableOpacity key={idx} onPress={() => handleKeyPress(num.toString())} style={styles.keypadButton}>
                <Text style={styles.keypadText}>{num}</Text>
              </TouchableOpacity>
            ))}

            <TouchableOpacity onPress={handleBackspace} style={styles.backspaceButton}>
              <Text style={styles.backspaceText}>⌫ Backspace</Text>
            </TouchableOpacity>
          </View>

          {/* Action Buttons */}
          <View style={styles.actionRow}>
            <LinearGradient colors={['#fb923c', '#f97316']} style={styles.actionButton}>
              <TouchableOpacity onPress={handleSkip} style={styles.fullWidthCenter}>
                <Text style={styles.actionText}>Skip</Text>
              </TouchableOpacity>
            </LinearGradient>

            <TouchableOpacity onPress={handleSubmit} style={styles.flexOne}>
              <LinearGradient colors={['#fb923c', '#f97316']} style={styles.actionButton}>
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
          <LinearGradient colors={['#fb923c', '#f97316']} style={styles.backButton}>
            <Text style={styles.backText}>⬅ Back to Levels</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}
