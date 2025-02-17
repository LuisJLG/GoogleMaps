import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import { ChevronBack } from '../../assets/SVG/ChevronBack';
export const Back = ({navigation}) => {
   
    return(
        <Pressable style={styles.container} 
        onPress={()=> navigation.goBack()}
        >
           <ChevronBack />
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
       position: 'absolute',
       width: 50,
       height: 50,
       borderRadius: 50,
       backgroundColor: '#fefefe',
       top: 5,
       left: 5,
       alignItems: 'center',
       justifyContent: 'center',
    }
})

export default Back;