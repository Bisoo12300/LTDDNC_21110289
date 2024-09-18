import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import Layout from "../../components/Layout/Layout";
import { userData } from "../../data/userData";
import AntDesign from "react-native-vector-icons/AntDesign";
import tw from 'tailwind-react-native-classnames';

const Account = ({ navigation }) => {
  return (
    <Layout>
      <View style={tw`my-5`}>
        <Image
          source={{ uri: userData.profilePic }}
          style={tw`h-24 w-full`}
          resizeMode="contain"
        />
        <View style={tw`justify-center items-center`}>
          <Text style={tw`mt-2 text-xl`}>
            Hi
            <Text style={tw`text-green-600`}> {userData.name}</Text>
            👋
          </Text>
          <Text>Email: {userData.email}</Text>
          <Text>Contact: {userData.contact}</Text>
        </View>
        <View
          style={[
            tw`p-3 bg-white m-3 my-5 rounded-lg pb-8`,
            {
              // Custom shadow for iOS
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 5, // Shadow for Android
            },
          ]}
        >
          <Text style={tw`text-xl font-bold pb-2 text-center border-b border-gray-300`}>
            Account Settings
          </Text>
          <TouchableOpacity
            style={tw`flex-row items-center my-2 p-1`}
            onPress={() => navigation.navigate("profile", { id: userData._id })}
          >
            <AntDesign name="edit" size={20} style={tw`mr-2`} />
            <Text style={tw`text-base`}>Edit Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={tw`flex-row items-center my-2 p-1`}
            onPress={() => navigation.navigate("myorders", { id: userData._id })}
          >
            <AntDesign name="bars" size={20} style={tw`mr-2`} />
            <Text style={tw`text-base`}>My Orders</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={tw`flex-row items-center my-2 p-1`}
            onPress={() => navigation.navigate("notifications")}
          >
            <AntDesign name="bells" size={20} style={tw`mr-2`} />
            <Text style={tw`text-base`}>Notifications</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={tw`flex-row items-center my-2 p-1`}
            onPress={() => navigation.navigate("adminPanel", { id: userData._id })}
          >
            <AntDesign name="windows" size={20} style={tw`mr-2`} />
            <Text style={tw`text-base`}>Admin Panel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Layout>
  );
};

export default Account;
