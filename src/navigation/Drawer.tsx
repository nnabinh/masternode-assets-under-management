import {createDrawerNavigator} from '@react-navigation/drawer';
import MasternodesScreen from '../features/masternodes/masternodes-screen/MasternodesScreen';

const DrawerNavigator = createDrawerNavigator();

const EmptyScreen = () => null;

const Drawer = () => {
  return (
    <DrawerNavigator.Navigator>
      <DrawerNavigator.Screen
        name="Masternodes"
        component={MasternodesScreen}
      />
      <DrawerNavigator.Screen name="Staking" component={EmptyScreen} />
      <DrawerNavigator.Screen name="Borrow" component={EmptyScreen} />
      <DrawerNavigator.Screen name="Lending" component={EmptyScreen} />
      <DrawerNavigator.Screen name="Earn" component={EmptyScreen} />
    </DrawerNavigator.Navigator>
  );
};

export default Drawer;
