import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  RegisterGuest,
  RegisterCompetitor,
  RegisterVendor,
  RegisterPromoter,
} from "../screens";

const Tab = createBottomTabNavigator();

function Registration() {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: "red",
        inactiveTintColor: "black",
        tabStyle: {
          borderColor: "black",
          borderWidth: 1,
          paddingBottom: 18,
          margin: 1,
        },
      }}
    >
      <Tab.Screen name="Guest" component={RegisterGuest} />
      <Tab.Screen name="Competitor" component={RegisterCompetitor} />
      <Tab.Screen name="Promoter" component={RegisterPromoter} />
      <Tab.Screen name="Vendor" component={RegisterVendor} />
    </Tab.Navigator>
  );
}

export default Registration;
