import React from "react";
import { View, Text, Button } from "react-native";

const ProfileScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Profile Screen</Text>
      <Button title="Open Drawer" onPress={() => navigation.openDrawer()} />
    </View>
  );
};

export default ProfileScreen;
