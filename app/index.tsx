import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useCallback, useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  CalendarDaysIcon,
  MagnifyingGlassIcon,
} from "react-native-heroicons/outline";
import { MapPinIcon } from "react-native-heroicons/solid";
import { debounce } from "lodash";
import { fetchLocations } from "../api/weather";

const RootLayout = () => {
  const [locations, setLocations] = useState([]);

  const handleLocation = (location: string) => {
    console.log(location);
  };

  const handeSearch = (value: any) => {
    console.log(value);
    if (value.length < 2) {
      fetchLocations({ cityName: value }).then((data) => {
        setLocations(data);
        console.log(data);
      })
    };
  };

  const handleTextDebounce = useCallback(debounce(handeSearch, 1200), []);

  return (
    <View className="flex-1">
      <StatusBar style="auto" />
      <Image
        source={require("../assets/images/bg.jpeg")}
        className="w-full h-full absolute z-0"
        blurRadius={70}
      ></Image>
      <SafeAreaView className="flex relative z-30 flex-1 justify-between">
        <View>
          <Text className="text-2xl mx-auto font-pblack">Weather</Text>
          <View className="mx-4 relative mt-3">
            <View className="flex-row h-15 justify-end items-center rounded-full bg-gray-100">
              <TextInput
                onChangeText={handleTextDebounce}
                placeholder="Search"
                placeholderTextColor={"gray"}
                className="pl-6 h-10 flex-1 text-base text-black"
              />
              <TouchableOpacity className="rounded-full p-3 m-1 bg-black-100">
                <MagnifyingGlassIcon size={20} color="white" />
              </TouchableOpacity>
            </View>
            {locations && (
              <View className="absolute w-full bg-gray-100 top-14 rounded-3xl opacity-60">
                {locations.map((location, index) => {
                  let showBorder = index + 1 !== locations.length;
                  let borderClass = showBorder
                    ? "border-b-2 border-b-gray-400"
                    : "";
                  return (
                    <TouchableOpacity
                      onPress={() => handleLocation(location)}
                      key={index}
                      className={`flex-row items-center border-0 p-3 px-4 mb-1 ${borderClass}`}
                    >
                      <MapPinIcon size={20} color="black" />
                      <Text className="text-black text-base ml-2">
                        {location}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            )}
          </View>
        </View>
        <View className="mx-4 flex justify-around mb-2">
          <Text className="text-white text-center text-2xl font-bold">
            London,{" "}
            <Text className="text-gray-300 text-lg font-semibold">UK</Text>
          </Text>
          <View className="flex-row justify-center mt-6">
            <Image
              source={require("../assets/icons/sun.png")}
              className="w-44 h-44"
            />
          </View>
          <View className="space-y-2 mt-4">
            <Text className="text-center font-bold text-white text-6xl ml-5">
              23&#176;
            </Text>
            <Text className="text-center text-white text-xl tracking-widest">
              Sunny
            </Text>
          </View>
          <View className="flex-row justify-between mx-4 mt-6">
            <View className="flex-row space-x-2 items-center">
              <Image
                source={require("../assets/icons/wind.png")}
                className="w-6 h-6"
              />
              <Text className="text-white font-semibold text-base">22km</Text>
            </View>
            <View className="flex-row space-x-2 items-center">
              <Image
                source={require("../assets/icons/wet.png")}
                className="w-6 h-6"
              />
              <Text className="text-white font-semibold text-base">23%</Text>
            </View>
            <View className="flex-row space-x-2 items-center">
              <Image
                source={require("../assets/icons/time.png")}
                className="w-6 h-6"
              />
              <Text className="text-white font-semibold text-base">
                6:05 AM
              </Text>
            </View>
          </View>
        </View>

        <View className="mb-2 space-y-3">
          <View className="flex-row items-center mx-5 space-x-2">
            <CalendarDaysIcon size={20} color="white" />
            <Text className="text-white text-base">Daily forecast</Text>
          </View>
          <ScrollView
            horizontal
            contentContainerStyle={{ paddingHorizontal: 15 }}
            showsHorizontalScrollIndicator={false}
          >
            <View className="flex justify-center items-center w-24 rounded-3xl py-3 space-y-1 mr-4">
              <Image
                source={require("../assets/icons/sun.png")}
                className="w-12 h-12"
              />
              <Text className="text-white text-center">Mon</Text>
              <Text className="text-white text-xl text-center">23&#176;</Text>
            </View>
            <View className="flex justify-center items-center w-24 rounded-3xl py-3 space-y-1 mr-4">
              <Image
                source={require("../assets/icons/sun.png")}
                className="w-12 h-12"
              />
              <Text className="text-white text-center">Mon</Text>
              <Text className="text-white text-xl text-center">23&#176;</Text>
            </View>
            <View className="flex justify-center items-center w-24 rounded-3xl py-3 space-y-1 mr-4">
              <Image
                source={require("../assets/icons/sun.png")}
                className="w-12 h-12"
              />
              <Text className="text-white text-center">Mon</Text>
              <Text className="text-white text-xl text-center">23&#176;</Text>
            </View>
            <View className="flex justify-center items-center w-24 rounded-3xl py-3 space-y-1 mr-4">
              <Image
                source={require("../assets/icons/sun.png")}
                className="w-12 h-12"
              />
              <Text className="text-white text-center">Mon</Text>
              <Text className="text-white text-xl text-center">23&#176;</Text>
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default RootLayout;
