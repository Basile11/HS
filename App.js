import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar} from 'react-native';

import Home from './src/screen/Home/Home';
import SignIn from './src/screen/SignIn/SignIn';
import SignUp from './src/screen/SignUp/SignUp';

import MesInformations from './src/screen/Compte/MesInformations/MesInformations';
import UrgenceType from './src/screen/Urgence/UrgenceType/UrgenceType';
import UrgenceDetail from './src/screen/Urgence/UrgenceType/UrgenceDetail/UrgenceDetail';
import ProDispo from './src/screen/Urgence/ProDispo/ProDispo';
import ProInfo from './src/screen/Urgence/ProInfo/ProInfo';
import UrgenceFinal from './src/screen/Urgence/UrgenceFinal/UrgenceFinal';

import NavBar from './src/components/NavBar/NavBar';
import NavBarPro from './src/components/NavBar/NavBarPro';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();



export default function App() {
  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" />
      <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false, animationEnabled: false }}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="SignUp" component={SignUp} screenOptions={{ headerShown: false }}/>
        <Stack.Screen name="NavBar" component={NavBar} />
        <Stack.Screen name="NavBarPro" component={NavBarPro} />
        <Stack.Screen name="MesInformations" component={MesInformations} />

        <Stack.Screen name="UrgenceType" component={UrgenceType} />
        <Stack.Screen name="UrgenceDetail" component={UrgenceDetail} />
        <Stack.Screen name="ProDispo" component={ProDispo} />
        <Stack.Screen name="ProInfo" component={ProInfo} />
        <Stack.Screen name="UrgenceFinal" component={UrgenceFinal} />
    

      </Stack.Navigator>
    </NavigationContainer>
  );
}
