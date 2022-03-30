import React, { useContext, useState } from "react";
import { View, StyleSheet, Text, ScrollView, Pressable } from "react-native";
import { useSharedValue } from "react-native-reanimated";
import { db, auth } from "../config/firebase";
import CircularSlider from "./CircularSlider";
import { PADDING, radToMinutes, absoluteDuration, normalize } from "./Constants";
import Container from "./components/Container";
import { RegisterScreenDividerLine1, RegisterScreenDividerLine2, RegisterScreenEmailTextInput, RegisterScreenSubmitButton, RegisterScreenSubmitButtonText } from "../styles/styles";
import { screenHeight, screenWidth } from '../styles/styles';
import { TextInput } from "react-native-gesture-handler";
import { addDoc, collection, doc, setDoc, Timestamp } from 'firebase/firestore';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
    paddingBottom: 140,
  },
  title: {
    fontFamily: "SpaceGrotesk_400Regular",
    fontSize: 30,
    textAlign: 'center',
    color: "#000000",
    marginBottom: 50,
  },
});

const Bedtime = () => {
  const [subject, setSubject] = useState('');
  const [duration, setDuration] = useState(0);

  const [monday, setMonday] = useState(false);
  const [tuesday, setTuesday] = useState(false);
  const [wednesday, setWednesday] = useState(false);
  const [thursday, setThursday] = useState(false);
  const [friday, setFriday] = useState(false);
  const [saturday, setSaturday] = useState(false);
  const [sunday, setSunday] = useState(false);

  const start = useSharedValue(0);
  const end = useSharedValue(1.5 * Math.PI);
  


  return (
    <View style={{
      backgroundColor: '#ffffff',
      height: screenHeight,
      width: screenWidth,
    }}>
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Create a Study Schedule</Text>
      <View style={{
        width: screenWidth,
        paddingLeft: 50,
      }}>
      <Text style={{
        fontFamily: 'SpaceGrotesk_400Regular',
        fontSize: 30,
      }}>
        Subject:
      </Text>
      </View>
      <TextInput style={{
        width: screenWidth - 100,
        height: 70,
        borderColor: '#000000',
        borderBottomWidth: 5,
        alignItems: 'center',
        textAlign: 'center',
        fontSize: 30,
        marginBottom: 60,
        fontFamily: 'BarlowSemiCondensed_400Regular'
      }}
      placeholder="History"
      value={subject}
      onChangeText={setSubject}
      />
      <Container start={start} end={end} >
        <CircularSlider start={start} end={end} />
      </Container>
      <View style={{
        display: 'flex',
        flexDirection: 'row',
        height: 50,
        width: screenWidth,
        padding: 10,
        marginBottom: 50,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <Pressable style={{
          backgroundColor: monday ? '#89CFF0' : '#000000',
          height: 50,
          width: 50,
          borderRadius: 25,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          margin: 5,
        }} onPress={() => setMonday(!monday)}>
          <Text style={{
            fontFamily: 'SpaceGrotesk_400Regular',
            color: '#ffffff',
          }}>
            M
          </Text>
        </Pressable>
        <Pressable style={{
          backgroundColor: tuesday ? '#89CFF0' : '#000000',
          height: 50,
          width: 50,
          borderRadius: 25,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          margin: 5,
        }} onPress={() => setTuesday(!tuesday)}>
          <Text style={{
            fontFamily: 'SpaceGrotesk_400Regular',
            color: '#ffffff',
          }}>
            T
          </Text>
        </Pressable>
        <Pressable style={{
          backgroundColor: wednesday ? '#89CFF0' : '#000000',
          height: 50,
          width: 50,
          borderRadius: 25,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          margin: 5,
        }} onPress={() => setWednesday(!wednesday)}>
          <Text style={{
            fontFamily: 'SpaceGrotesk_400Regular',
            color: '#ffffff',
          }}>
            W
          </Text>
        </Pressable>
        <Pressable style={{
          backgroundColor: thursday ? '#89CFF0' : '#000000',
          height: 50,
          width: 50,
          borderRadius: 25,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          margin: 5,
        }} onPress={() => setThursday(!thursday)}>
          <Text style={{
            fontFamily: 'SpaceGrotesk_400Regular',
            color: '#ffffff',
          }}>
            T
          </Text>
        </Pressable>
        <Pressable style={{
          backgroundColor: friday ? '#89CFF0' : '#000000',
          height: 50,
          width: 50,
          borderRadius: 25,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          margin: 5,
        }} onPress={() => setFriday(!friday)}>
          <Text style={{
            fontFamily: 'SpaceGrotesk_400Regular',
            color: '#ffffff',
          }}>
            F
          </Text>
        </Pressable>
        <Pressable style={{
          backgroundColor: saturday ? '#89CFF0' : '#000000',
          height: 50,
          width: 50,
          borderRadius: 25,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          margin: 5,
        }} onPress={() => setSaturday(!saturday)}>
          <Text style={{
            fontFamily: 'SpaceGrotesk_400Regular',
            color: '#ffffff',
          }}>
            S
          </Text>
        </Pressable>
        <Pressable style={{
          backgroundColor: sunday ? '#89CFF0' : '#000000',
          height: 50,
          width: 50,
          borderRadius: 25,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          margin: 5,
        }} onPress={() => setSunday(!sunday)}>
          <Text style={{
            fontFamily: 'SpaceGrotesk_400Regular',
            color: '#ffffff',
          }}>
            S
          </Text>
        </Pressable>
      </View>
      <RegisterScreenSubmitButton onPress={async () => {
        const exp = monday || tuesday || wednesday || thursday || friday || saturday || sunday;
        if(exp && subject != ''){
          await addDoc(collection(db, "Users", auth.currentUser.uid, `S-${auth.currentUser.uid}`), {
            subject: subject,
            monday: monday,
            tuesday: tuesday, 
            wednesday: wednesday,
            thursday: thursday,
            friday: friday,
            saturday: saturday,
            sunday: sunday,
            durationInMinutes: Math.round(radToMinutes(absoluteDuration(start.value, end.value))),
            start: new Timestamp(radToMinutes(normalize(start.value)) * 60, 0),
            end: new Timestamp(radToMinutes(normalize(end.value)) * 60, 0),
          })
        }
      }
      }>
        <RegisterScreenSubmitButtonText>
          Create
        </RegisterScreenSubmitButtonText>
      </RegisterScreenSubmitButton>
    </ScrollView>
    </View>
  );
};

export default Bedtime;
