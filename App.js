import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Home from './src/screen/Home/Home';
import SignIn from './src/screen/Urgence/SignIn';
import SignUp from './src/screen/Urgence/SignUp';
import Urgence from './src/screen/Urgence/Urgence';
import Interventions from './src/screen/Urgence/Interventions';
import Compte from './src/screen/Urgence/Compte';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function UrgenceTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Urgence" component={Urgence} />
      <Tab.Screen name="Interventions" component={Interventions} />
      <Tab.Screen name="Compte" component={Compte} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen 
          name="UrgenceTabs" 
          component={UrgenceTabs} 
          options={{ headerShown: false }} // Hide the header for the tab navigator
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
