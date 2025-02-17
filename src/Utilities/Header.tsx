import React, { useContext } from 'react';
import {Pressable, Text, StyleSheet} from 'react-native';
import {ChevronBack} from '../../assets/SVG/ChevronBack';
import { ThemeLight } from '../Theme/Theme';
import { AppContext } from '../Context/AppContext';
export const Header = ({screenName, navigation}: any) => {
  const context = useContext(AppContext);
  return (
    <Pressable style={[styles.header, {backgroundColor: '#ccc'/*context.store.Color*/}]} onPress={()=>{navigation.goBack()}}>
      <ChevronBack width={30} height={30} strokeColor='#fff'/>
      <Text style={styles.headerTitle}>{screenName}</Text>
    </Pressable>
  );
};
const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 5,
    backgroundColor: '#fff',
    width: '100%',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: 'Poppins-Bold',
    color: '#fff',
  },
});
