import { createStackNavigator } from "@react-navigation/stack";
import { CreateListing, Home, LoginForm, Signup } from "../components";
import Listing from "../components/main/Listing";

const Stack=createStackNavigator();

const StackNavigation=()=>{
    return(
       
        <Stack.Navigator
        initialRouteName="Sign"
        screenOptions={{headerShown:false}}
        >
        <Stack.Screen name="Sign" component={Signup} />
        <Stack.Screen name="CreateListing" component={CreateListing} />
        <Stack.Screen name="Listing" component={Listing} />
        <Stack.Screen name="Login" component={LoginForm} />
        <Stack.Screen name="Home" component={Home} />

        </Stack.Navigator>
       
    )
}
export default StackNavigation;  

