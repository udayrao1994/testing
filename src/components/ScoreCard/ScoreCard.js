import React from "react";
import { Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import * as Animatable from "react-native-animatable";
import { styles, gradients } from "./ScoreCard.styles";

export default function ScoreCard({ level, score, total }) {
  return (
    <>
      <Animatable.View animation="zoomIn" delay={200} style={styles.levelCard}>
        <LinearGradient colors={gradients.levelCard} style={styles.levelCardInner}>
          <Text style={styles.levelLabel}>LEVEL : {level}</Text>
        </LinearGradient>
      </Animatable.View>

      <Animatable.View animation="zoomIn" delay={300} style={styles.scoreContainer}>
        <LinearGradient colors={gradients.scoreBox} style={styles.scoreBox}>
          <Text style={styles.scoreLabel}>Your Score</Text>
          <Text style={styles.scoreValue}>
            {score}/{total}
          </Text>
        </LinearGradient>
      </Animatable.View>
    </>
  );
}
