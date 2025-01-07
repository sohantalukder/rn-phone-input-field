import {
  Text,
  FlatList,
  TouchableOpacity,
  View,
  TextInput,
  Image,
  useColorScheme,
} from 'react-native';
import React, {useState} from 'react';
import constants from '../constants/constants';
import { customBorder, pickerStyles } from './styles/picker.style';
import assets from '../assets/assets';
import type { EachOptionProps, PickerProps } from './Picker';

const EachOption: React.FC<EachOptionProps> = ({onSelect, item, index}) => {
  const [select, setSelect] = useState(false);
  const scheme = useColorScheme();
  const styles = pickerStyles(scheme);
  const onPress = () => {
    setSelect(!select);
    onSelect && onSelect(item);
    global.openCountryModal({});
  };
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      style={[styles.eachContainer, customBorder(index, scheme).border]}>
      <Text style={styles.eachTextContainer}>
        <Text style={styles.eachText}>{item?.icon}</Text>
        {'  '}
        {item?.countryName}
        {'  '}+{item?.callingCode}
      </Text>
    </TouchableOpacity>
  );
};

const Picker: React.FC<PickerProps> = ({onSelect}) => {
  const scheme = useColorScheme();
  const styles = pickerStyles(scheme);
  const [country, setCountry] = useState(Object.values(constants));
  const handleChangeText = (text: string) => {
    if (text === '') {
      setCountry(Object.values(constants));
      return;
    }
    const filers = Object.values(constants).filter(item =>
      item.countryName?.toLowerCase().match(new RegExp(text.toLowerCase())),
    );
    setCountry(filers);
  };

  return (
    <View style={styles.bgWhite}>
      <View style={styles.flexRow}>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => global.openCountryModal({})}
          children={
            <Image
              source={{
                uri:
                  scheme === 'dark'
                    ? assets.closeDarkIcon
                    : assets.closeDefaultIcon,
              }}
              resizeMode="contain"
              height={12}
              width={12}
            />
          }
        />
        <TextInput
          placeholder="Search Country"
          onChangeText={handleChangeText}
          style={styles.searchInput}
        />
      </View>
      <FlatList
        data={country}
        keyboardShouldPersistTaps="always"
        showsVerticalScrollIndicator={false}
        automaticallyAdjustKeyboardInsets={false}
        keyExtractor={(_, index) => index.toString()}
        contentContainerStyle={styles.flatListContainer}
        initialNumToRender={12}
        renderItem={({item, index}: {item: any; index: number}) => {
          return (
            <EachOption
              onSelect={onSelect}
              item={item}
              index={index}
              key={index}
            />
          );
        }}
      />
    </View>
  );
};

export default Picker;
