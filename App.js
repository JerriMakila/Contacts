import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, FlatList, Button } from 'react-native';
import * as Contacts from 'expo-contacts';

export default function App() {

  const [contacts, setContacts] = useState([]);

  const getContacts = async () => {
    const {status} = await Contacts.requestPermissionsAsync();

    if(status === 'granted'){
      const {data} = await Contacts.getContactsAsync({
        fields : [Contacts.Fields.PhoneNumbers]
      });

      let newData = [];

      data.map(contact => {
        if(contact.hasOwnProperty('phoneNumbers')){
          newData.push(contact);
        }
      });

      if(newData.length > 0){
        setContacts(newData);
      }
    }
  }

  return (
    <View style={styles.container}>
      {console.log(contacts)}
      {contacts.length > 0 ? (
         <FlatList
           data={contacts}
           keyExtractor={item => item.name}
           renderItem={({item}) =>
              <View>
               <Text style={{fontSize: 20}}>{item.name} {item.phoneNumbers[0].number}</Text>
             </View>
            }
             
            
            />
      ) : (
        <Text>Waiting</Text>
      )}
      
      <Button title='PRESS' onPress={getContacts} />
      <StatusBar hidden={true} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 30
  },

  listItem: {
    flexDirection: 'row',
    justifyContent: 'center'
  }
});
