import React from "react";
import { Animated,View,TouchableOpacity,Text,Dimensions,ScrollView,Image,Linking } from "react-native";
import { colors } from "../../../infrastructure/theme/colors";
import { MealInfoCard } from "./meal-info-card.component";
import { groupBy } from 'lodash'; // Import the groupBy function from Lodash