import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar} from 'react-native';

import Home from './src/screen/Home/Home';
import SignIn from './src/screen/SignIn/SignIn';
import SignUp from './src/screen/SignUp/SignUp';
import Urgence from './src/screen/Urgence/Urgence';
import Interventions from './src/screen/Interventions/Interventions';
import Compte from './src/screen/Compte/Compte';
import MesInformations from './src/screen/Compte/MesInformations/MesInformations';

import NavBar from './src/components/NavBar/NavBar';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// function UrgenceTabs() {
//   return (
//     <Tab.Navigator  screenOptions={{ headerShown: false }}>
//       <Tab.Screen name="Urgence" component={Urgence} />
//       <Tab.Screen name="Interventions" component={Interventions} />
//       <Tab.Screen name="Compte" component={Compte} />
//     </Tab.Navigator>
//   );
// }

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" />
      <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="SignUp" component={SignUp} screenOptions={{ headerShown: false }}/>
        {/* <Stack.Screen name="UrgenceTabs" component={UrgenceTabs} options={{ headerShown: false }} /> */}
        <Stack.Screen name="NavBar" component={NavBar} />
        <Stack.Screen name="MesInformations" component={MesInformations} />

    

      </Stack.Navigator>
    </NavigationContainer>
  );
}
