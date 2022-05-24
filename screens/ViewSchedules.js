import React, { useEffect, useContext, useState } from "react";
import { View, Text, RefreshControl } from "react-native";
import {
  FlatList,
  Swipeable,
  TouchableOpacity,
  Pressable,
} from "react-native-gesture-handler";
import { CurrentDataContext } from "./../components/CurrentDataProvider";
import { Feather } from "@expo/vector-icons";
import { deleteDoc, doc, getDoc, Timestamp } from "firebase/firestore";

import {
  RegisterScreenHeading,
  RegisterScreenDividerLine1,
  RegisterScreenDividerLine2,
  screenWidth,
  screenHeight,
} from "../styles/styles";
import { auth, db } from "../config/firebase";
import {
  cancelScheduledNotificationAsync,
  cancelAllScheduledNotificationsAsync,
} from "expo-notifications";

let index = 0;

const formatTime = (seconds) => {
  const start = new Date();
  start.setHours(0, 0, 0, 0);
  start.setSeconds(seconds);
  const timeString = start.toLocaleTimeString();
  return (
    timeString.substring(0, timeString.length - 6) +
    timeString.substring(timeString.length - 3)
  );
};

const Item = ({
  subject,
  start,
  end,
  duration,
  handleDelete,
  monday,
  tuesday,
  wednesday,
  thursday,
  friday,
  saturday,
  sunday,
  id,
}) => {
  const RightSwipe = () => {
    return (
      <TouchableOpacity
        onPress={handleDelete}
        style={{
          backgroundColor: "#FF5349",
          display: "flex",
          width: 200,
          height: 200,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            backgroundColor: "#FF5349",
            display: "flex",
            width: 200,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View>
            <Feather name="trash-2" size={50} color="white" />
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <Swipeable renderRightActions={RightSwipe}>
      <View>
        <View
          style={{
            width: screenWidth,
            height: 100,
            paddingLeft: 10,
            paddingRight: 10,
            backgroundColor: "#ffffff",
            display: "flex",
            flexDirection: "row",
          }}
        >
          <View
            style={{
              height: 100,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontFamily: "SpaceGrotesk_400Regular",
                textAlign: "center",
                fontSize: 15,
              }}
            >
              Subject:
            </Text>
            <Text
              style={{
                textAlign: "center",
                fontSize: 15,
                fontFamily: "SpaceGrotesk_400Regular",
              }}
            >
              {subject}
            </Text>
          </View>
          <View
            style={{
              margin: 10,
              height: 85,
              width: 5,
              backgroundColor: "#89cff0",
            }}
          />
          <View
            style={{
              height: 100,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontFamily: "SpaceGrotesk_400Regular",
                textAlign: "center",
                fontSize: 15,
              }}
            >
              Start Time:
            </Text>
            <Text
              style={{
                fontFamily: "SpaceGrotesk_400Regular",
                textAlign: "center",
                fontSize: 15,
              }}
            >
              {formatTime(start)}
            </Text>
          </View>
          <View
            style={{
              margin: 10,
              height: 80,
              width: 5,
              backgroundColor: "#89cff0",
            }}
          />
          <View
            style={{
              height: 100,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontFamily: "SpaceGrotesk_400Regular",
                textAlign: "center",
                fontSize: 15,
              }}
            >
              End Time:
            </Text>
            <Text
              style={{
                fontFamily: "SpaceGrotesk_400Regular",
                textAlign: "center",
                fontSize: 15,
              }}
            >
              {formatTime(end)}
            </Text>
          </View>
          <View
            style={{
              margin: 10,
              height: 85,
              width: 5,
              backgroundColor: "#89cff0",
            }}
          />
          <View
            style={{
              height: 100,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontFamily: "SpaceGrotesk_400Regular",
                textAlign: "center",
                fontSize: 15,
              }}
            >
              Duration:
            </Text>
            <Text
              style={{
                fontFamily: "SpaceGrotesk_400Regular",
                textAlign: "center",
                fontSize: 15,
              }}
            >
              {duration + " minutes"}
            </Text>
          </View>
        </View>

        <View
          style={{
            height: 100,
            width: screenWidth,
            display: "flex",
            justifyContent: "center",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <View
            style={{
              backgroundColor: monday ? "#89CFF0" : "#000000",
              height: 50,
              width: 50,
              borderRadius: 25,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              margin: 5,
            }}
          >
            <Text
              style={{
                fontFamily: "SpaceGrotesk_400Regular",
                color: "#ffffff",
              }}
            >
              M
            </Text>
          </View>
          <View
            style={{
              backgroundColor: tuesday ? "#89CFF0" : "#000000",
              height: 50,
              width: 50,
              borderRadius: 25,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              margin: 5,
            }}
          >
            <Text
              style={{
                fontFamily: "SpaceGrotesk_400Regular",
                color: "#ffffff",
              }}
            >
              T
            </Text>
          </View>
          <View
            style={{
              backgroundColor: wednesday ? "#89CFF0" : "#000000",
              height: 50,
              width: 50,
              borderRadius: 25,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              margin: 5,
            }}
          >
            <Text
              style={{
                fontFamily: "SpaceGrotesk_400Regular",
                color: "#ffffff",
              }}
            >
              W
            </Text>
          </View>
          <View
            style={{
              backgroundColor: thursday ? "#89CFF0" : "#000000",
              height: 50,
              width: 50,
              borderRadius: 25,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              margin: 5,
            }}
          >
            <Text
              style={{
                fontFamily: "SpaceGrotesk_400Regular",
                color: "#ffffff",
              }}
            >
              T
            </Text>
          </View>
          <View
            style={{
              backgroundColor: friday ? "#89CFF0" : "#000000",
              height: 50,
              width: 50,
              borderRadius: 25,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              margin: 5,
            }}
          >
            <Text
              style={{
                fontFamily: "SpaceGrotesk_400Regular",
                color: "#ffffff",
              }}
            >
              F
            </Text>
          </View>
          <View
            style={{
              backgroundColor: saturday ? "#89CFF0" : "#000000",
              height: 50,
              width: 50,
              borderRadius: 25,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              margin: 5,
            }}
          >
            <Text
              style={{
                fontFamily: "SpaceGrotesk_400Regular",
                color: "#ffffff",
              }}
            >
              S
            </Text>
          </View>
          <View
            style={{
              backgroundColor: sunday ? "#89CFF0" : "#000000",
              height: 50,
              width: 50,
              borderRadius: 25,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              margin: 5,
            }}
          >
            <Text
              style={{
                fontFamily: "SpaceGrotesk_400Regular",
                color: "#ffffff",
              }}
            >
              S
            </Text>
          </View>
        </View>
        <View
          style={{
            width: screenWidth,
            height: 5,
            backgroundColor: "#000000",
          }}
        />
      </View>
    </Swipeable>
  );
};

const ViewSchedules = () => {
  const { data, setData } = useContext(CurrentDataContext);
  const [DATA, SETDATA] = useState([]);
  const [update, setUpdate] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const formatData = () => {
    let arr = [];
    for (const schedule in data) {
      let obj = { ...data[schedule] };
      obj["id"] = schedule;
      arr.push(obj);
    }
    SETDATA(arr);
  };

  const deleteItem = async (id) => {
    const ref = doc(
      db,
      "Users",
      `${auth.currentUser.uid}`,
      `S-${auth.currentUser.uid}`,
      id
    );
    let d = await getDoc(ref);
    let dData = d.data();

    const arr2 = [
      dData["notificationId1"],
      dData["notificationId2"],
      dData["notificationId3"],
      dData["notificationId4"],
      dData["notificationId5"],
      dData["notificationId6"],
      dData["notificationId7"],
    ];
    arr2.forEach(async (item) => {
      if (item != "none") {
        await cancelScheduledNotificationAsync(item);
      }
    });
    SETDATA([]);
    await deleteDoc(ref);
    setUpdate(!update);
    setRefresh(refresh);
  };

  const renderItem = ({ item, index }) => {
    return (
      <Item
        subject={item.subject}
        duration={item.durationInMinutes}
        start={new Timestamp(item.start).seconds}
        end={new Timestamp(item.end).seconds}
        monday={item.monday}
        tuesday={item.tuesday}
        wednesday={item.wednesday}
        thursday={item.thursday}
        friday={item.friday}
        saturday={item.saturday}
        sunday={item.sunday}
        id={item.id}
        handleDelete={async () => await deleteItem(item.id)}
      />
    );
  };

  useEffect(async () => {
    formatData();
    setTimeout(() => {
      if (index < 1) {
        setUpdate(!update);
        index++;
      }
    }, 500);
    setRefresh(false);
  }, [update, data]);

  return (
    <View
      style={{
        backgroundColor: "#ffffff",
        display: "flex",
        height: screenHeight,
        width: screenWidth,
        flexDirection: "column",
      }}
    >
      <Text
        style={{
          fontFamily: "SpaceGrotesk_400Regular",
          fontSize: 30,
          marginTop: 20,
          textAlign: "center",
          color: "#000000",
        }}
      >
        Schedules
      </Text>
      <Text
        style={{
          fontFamily: "SpaceGrotesk_400Regular",
          fontSize: 15,
          textAlign: "center",
          color: "#000000",
          marginBottom: 20,
        }}
      >
        (If you don't see all of them, pull down to refresh a couple of times)
      </Text>
      <View
        style={{
          width: screenWidth,
          height: 5,
          backgroundColor: "#000000",
        }}
      />
      <FlatList
        contentContainerStyle={{
          minHeight: 2000,
        }}
        data={DATA}
        renderItem={renderItem}
        refreshing={refresh}
        refreshControl={<RefreshControl onRefresh={formatData} />}
        ListEmptyComponent={() => {
          return (
            <View
              style={{
                marginTop: 90,
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  fontFamily: "SpaceGrotesk_400Regular",
                  fontSize: 50,
                }}
              >
                No schedules created.
              </Text>
            </View>
          );
        }}
      />
    </View>
  );
};

export default ViewSchedules;
