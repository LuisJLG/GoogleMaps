import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import Icon from "react-native-vector-icons/Ionicons";
import { MainChat } from "../Chat/MainChat";
import { ChatView } from "../Chat/ChatView";
import { AccountType } from "../Login/AccountType";
import { AddUbicationStarter } from "../Login/AddUbication";
import { EditUbication } from "../Login/EditUbication";
import { Adress } from "../Login/ListUbication";
import { CreateAccount } from "../Login/CreateAccount";
import { GetStarted } from "../Login/GetStarted";
import { Login } from "../Login/Login";
import { LoginScreen } from "../Login/LoginScreen";
import { PhoneAuthScreen } from "../Login/LoginSMS";
import { ReferenceStoreStarted } from "../Login/ReferenceStoreStarted";
import { RegisterEmail } from "../Login/RegisterEmail";
import { RegisterNumber } from "../Login/RegisterNumber";
import { RegisterUbication } from "../Login/RegisterUbication";
import { SMSConfirm } from "../Login/SMSConfirm";
import { PhoneNumberScreen } from "../Login/LoginSMS";

const Tab = createBottomTabNavigator();
const NoAccountStack = createStackNavigator();
const ChatStack = createStackNavigator();
const UbicationStack = createStackNavigator();

function NoAccount() {
    return (
        <NoAccountStack.Navigator screenOptions={{ headerShown: false }}>
            {/*<NoAccountStack.Screen name="Login" component={Login} />*/}
            {/*<NoAccountStack.Screen name="LoginScreen" component={LoginScreen} />*/}
            <NoAccountStack.Screen name="PhoneAuthScreen" component={PhoneNumberScreen} />
            <NoAccountStack.Screen name="RegisterEmail" component={RegisterEmail} />
            <NoAccountStack.Screen name="RegisterNumber" component={RegisterNumber} />
            <NoAccountStack.Screen name="CreateAccount" component={CreateAccount} />
            <NoAccountStack.Screen name="ReferenceStore" component={ReferenceStoreStarted} />
        </NoAccountStack.Navigator>
    );
}

function UbicationStackScreen() {
    return (
        <UbicationStack.Navigator screenOptions={{ headerShown: false }}>
            <UbicationStack.Screen name="ListUbication" component={Adress} />
            <UbicationStack.Screen name="AddUbication" component={AddUbicationStarter} />
            <UbicationStack.Screen name="EditUbication" component={EditUbication} />
        </UbicationStack.Navigator>
    );
}

function ChatStackScreen() {
    return (
        <ChatStack.Navigator screenOptions={{ headerShown: false }}>
            <ChatStack.Screen name="MainChat" component={MainChat} />
            <ChatStack.Screen
                name="ChatView"
                component={ChatView}
                options={({ route }) => ({
                    title: `Chat with ${route.params.username}`,
                })}
            />
        </ChatStack.Navigator>
    );
}

export function TabNavigation() {
    return (
        <Tab.Navigator>
            <Tab.Screen
                name="Chat"
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="chatbubble" size={size} color={color} />
                    ),
                }}
            >
                {() => <ChatStackScreen />}
            </Tab.Screen>
            <Tab.Screen
                name="Ubicación"
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="location" size={size} color={color} />
                    ),
                }}
            >
                {() => <UbicationStackScreen />}
            </Tab.Screen>
            <Tab.Screen
                name="Login"
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="location" size={size} color={color} />
                    ),
                }}
            >
                {() => <NoAccount />}
            </Tab.Screen>
        </Tab.Navigator>
    );
}
