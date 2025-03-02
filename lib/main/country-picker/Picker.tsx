import {
  Text,
  FlatList,
  TouchableOpacity,
  View,
  TextInput,
  Image,
} from 'react-native';
import React, { useState } from 'react';
import constants from '../constants/constants';
import { customBorder, pickerStyles } from './styles/picker.style';
import assets from '../assets/assets';
import type { EachOptionProps, PickerProps } from './Picker.d';

const EachOption: React.FC<EachOptionProps> = ({
  onSelect,
  item,
  index,
  darkMode,
  closeModal,
}) => {
  const [select, setSelect] = useState(false);
  const styles = pickerStyles(darkMode);
  const onPress = () => {
    setSelect(!select);
    onSelect && onSelect(item);
    closeModal();
  };
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      style={[styles.eachContainer, customBorder(index, darkMode).border]}
    >
      <Text style={styles.eachTextContainer}>
        <Text style={styles.eachText}>{item?.icon}</Text>
        {'  '}
        {item?.countryName}
        {'  '}+{item?.callingCode}
      </Text>
    </TouchableOpacity>
  );
};

const Picker: React.FC<PickerProps> = ({ onSelect, darkMode, closeModal }) => {
  const styles = pickerStyles(darkMode);
  const [country, setCountry] = useState(Object.values(constants));
  const handleChangeText = (text: string) => {
    if (text === '') {
      setCountry(Object.values(constants));
      return;
    }
    const filers = Object.values(constants).filter((item) =>
      item.countryName?.toLowerCase().match(new RegExp(text.toLowerCase()))
    );
    setCountry(filers);
  };

  return (
    <View style={styles.bgWhite}>
      <View style={styles.flexRow}>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={closeModal}
          children={
            <Image
              source={{
                uri: darkMode ? assets.closeDarkIcon : assets.closeDefaultIcon,
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
          placeholderTextColor={darkMode ? '#FFFFFF' : '#000000'}
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
        renderItem={({ item, index }: { item: any; index: number }) => {
          return (
            <EachOption
              onSelect={onSelect}
              item={item}
              darkMode={darkMode}
              index={index}
              key={index}
              closeModal={closeModal}
            />
          );
        }}
      />
    </View>
  );
};

export default Picker;
