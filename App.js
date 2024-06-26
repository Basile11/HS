import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'react-native';

import Home from './src/screen/Home/Home';
import SignIn from './src/screen/SignIn/SignIn';
import SignUp from './src/screen/SignUp/SignUp';

import MesInformations from './src/screen/Compte/MesInformations/MesInformations';
import UrgenceTypeSerr from './src/screen/Urgence/UrgenceType/UrgenceTypeSerr';
import UrgenceTypeDerat from './src/screen/Urgence/UrgenceType/UrgenceTypeDerat';
import UrgenceTypePlomb from './src/screen/Urgence/UrgenceType/UrgenceTypePlomb';
import UrgenceTypeChauf from './src/screen/Urgence/UrgenceType/UrgenceTypeChauf';
import UrgenceTypeElec from './src/screen/Urgence/UrgenceType/UrgenceTypeElec';
import UrgenceDetail from './src/screen/Urgence/UrgenceType/UrgenceDetail/UrgenceDetail';
import ProDispo from './src/screen/Urgence/ProDispo/ProDispo';
import ProInfo from './src/screen/Urgence/ProInfo/ProInfo';
import UrgenceFinal from './src/screen/Urgence/UrgenceFinal/UrgenceFinal';
import DetailInterventionPro from './src/screen/Interventions/InterventionPro/DetailInterventionPro';
import TerminerInter from './src/screen/Interventions/InterventionPro/TerminerInter';
import InterventionEval from './src/screen/Interventions/InterventionEval';

import NavBar from './src/components/NavBar/NavBar';
import NavBarPro from './src/components/NavBar/NavBarPro';

import Interventions from './src/screen/Interventions/Interventions'; // Importer Interventions
import InterventionDetail from './src/screen/Interventions/InterventionDetail'; // Importer InterventionDetail
import InterventionEnCours from './src/screen/Interventions/InterventionEnCours';
import ComptePro from './src/screen/Compte/Comptepro'; // Importer ComptePro
import Planning from './src/screen/Compte/CompteInfoPro/Planning'; // Importer Planning

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" />
      <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false, animationEnabled: false }}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="NavBar" component={NavBar} />
        <Stack.Screen name="NavBarPro" component={NavBarPro} />
        <Stack.Screen name="MesInformations" component={MesInformations} />
        <Stack.Screen name="UrgenceTypeChauf" component={UrgenceTypeChauf} />
        <Stack.Screen name="UrgenceTypePlomb" component={UrgenceTypePlomb} />
        <Stack.Screen name="UrgenceTypeElec" component={UrgenceTypeElec} />
        <Stack.Screen name="UrgenceTypeDerat" component={UrgenceTypeDerat} />
        <Stack.Screen name="UrgenceTypeSerr" component={UrgenceTypeSerr} />
        <Stack.Screen name="UrgenceDetail" component={UrgenceDetail} />
        <Stack.Screen name="ProDispo" component={ProDispo} />
        <Stack.Screen name="ProInfo" component={ProInfo} />
        <Stack.Screen name="UrgenceFinal" component={UrgenceFinal} />
        <Stack.Screen name="DetailInterventionPro" component={DetailInterventionPro} />
        <Stack.Screen name="TerminerInter" component={TerminerInter} />
        <Stack.Screen name="InterventionEval" component={InterventionEval} />
        <Stack.Screen name="Interventions" component={Interventions} />
        <Stack.Screen name="InterventionDetail" component={InterventionDetail} options={{ title: 'Historique' }} />
        <Stack.Screen name="InterventionEnCours" component={InterventionEnCours} />
        <Stack.Screen name="ComptePro" component={ComptePro} />
        <Stack.Screen name="Planning" component={Planning} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
