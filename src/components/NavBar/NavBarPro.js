import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image } from 'react-native';

import Urgence from '../../screen/Urgence/Urgence';
import InterventionPro from '../../screen/Interventions/InterventionPro/InterventionPro';
import comptepro from '../../screen/Compte/comptepro';

import im_urgence from '../../../assets/navbar/alarm-warning-line.png';
import im_compte from '../../../assets/navbar/user-line.png';
import im_interventions from '../../../assets/navbar/hammer-line.png';



const Tab = createBottomTabNavigator();

// Définissez les fonctions pour chaque icône d'onglet
const UrgenceIcon = () => (
  <Image
    source={require('../../../assets/navbar/alarm-warning-line.png')}
    style={{ width: 24, height: 24 }}
  />
);

const InterventionsIcon = () => (
  <Image
    source={require('../../../assets/navbar/hammer-line.png')}
    style={{ width: 24, height: 24 }}
  />
);

const CompteIcon = () => (
  <Image
    source={require('../../../assets/navbar/user-line.png')}
    style={{ width: 24, height: 24 }}
  />
);

const BottomTabBar = () => {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}>
      {/* <Tab.Screen
        name="Urgence"
        component={Urgence}
        options={{
          tabBarIcon: UrgenceIcon,
        }}
      /> */}
      <Tab.Screen
        name="Intervention"
        component={InterventionPro}
        options={{
          tabBarIcon: InterventionsIcon,
        }}
      />
      <Tab.Screen
        name="compte"
        component={comptepro}
        options={{
          tabBarIcon: CompteIcon,
        }}
      />
    </Tab.Navigator>
  );
}

export default BottomTabBar;
