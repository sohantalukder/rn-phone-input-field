import React, { useState, useCallback, useMemo, memo } from 'react';
import {
  FlatList,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ListRenderItem,
} from 'react-native';
import assets from '../assets/assets';
import constants from '../constants/constants';
import type { EachOptionProps, PickerProps } from './Picker.d';
import type { EachCountry } from '../constants/constants.d';
import { customBorder, pickerStyles } from './styles/picker.style';

// Memoized country option component to prevent unnecessary re-renders
const EachOption = memo<EachOptionProps>(({
  onSelect,
  item,
  index,
  darkMode,
  closeModal,
}) => {
  const styles = useMemo(() => pickerStyles(darkMode), [darkMode]);
  const borderStyle = useMemo(() => customBorder(index, darkMode).border, [index, darkMode]);
  
  const handlePress = useCallback(() => {
    onSelect?.(item);
    closeModal();
  }, [onSelect, item, closeModal]);

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={handlePress}
      style={[styles.eachContainer, borderStyle]}
    >
      <Text style={styles.eachTextContainer}>
        <Text style={styles.eachText}>{item?.icon}</Text>
        {'  '}
        {item?.countryName}
        {'  '}+{item?.callingCode}
      </Text>
    </TouchableOpacity>
  );
});

EachOption.displayName = 'EachOption';

const Picker: React.FC<PickerProps> = ({ 
  onSelect, 
  darkMode, 
  closeModal, 
  searchInputProps 
}) => {
  // Memoize initial country list to prevent recreation
  const allCountries = useMemo(() => Object.values(constants), []);
  
  const [filteredCountries, setFilteredCountries] = useState<EachCountry[]>(allCountries);
  const [searchText, setSearchText] = useState('');
  
  // Memoize styles to prevent recreation on every render
  const styles = useMemo(() => pickerStyles(darkMode), [darkMode]);
  
  // Memoized search functionality with debouncing logic
  const handleSearch = useCallback((text: string) => {
    setSearchText(text);
    
    if (!text.trim()) {
      setFilteredCountries(allCountries);
      return;
    }
    
    const searchTerm = text.toLowerCase().trim();
    const filtered = allCountries.filter((country) => {
      const countryName = country.countryName?.toLowerCase() || '';
      const callingCode = country.callingCode?.toString() || '';
      
      return (
        countryName.includes(searchTerm) ||
        callingCode.includes(searchTerm) ||
        country.countryCode?.toLowerCase().includes(searchTerm)
      );
    });
    
    setFilteredCountries(filtered);
  }, [allCountries]);
  
  // Memoized close icon to prevent recreation
  const closeIcon = useMemo(() => (
    <Image
      source={{
        uri: darkMode ? assets.closeDarkIcon : assets.closeDefaultIcon,
      }}
      resizeMode="contain"
      height={12}
      width={12}
    />
  ), [darkMode]);
  
  // Memoized render item function for FlatList
  const renderCountryItem: ListRenderItem<EachCountry> = useCallback(
    ({ item, index }) => (
      <EachOption
        onSelect={onSelect}
        item={item}
        darkMode={darkMode}
        index={index}
        closeModal={closeModal}
      />
    ),
    [onSelect, darkMode, closeModal]
  );
  
  // Memoized key extractor
  const keyExtractor = useCallback(
    (item: EachCountry, index: number) => `${item.countryCode}-${index}`,
    []
  );
  
  // Memoized empty component for better UX
  const EmptyComponent = useMemo(() => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>
        No countries found for "{searchText}"
      </Text>
    </View>
  ), [styles.emptyContainer, styles.emptyText, searchText]);

  return (
    <View style={styles.bgWhite}>
      <View style={styles.flexRow}>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={closeModal}
          accessibilityLabel="Close country picker"
          accessibilityRole="button"
        >
          {closeIcon}
        </TouchableOpacity>
        
        <TextInput
          placeholder="Search Country"
          value={searchText}
          onChangeText={handleSearch}
          placeholderTextColor={darkMode ? '#FFFFFF' : '#000000'}
          style={styles.searchInput}
          autoCorrect={false}
          autoCapitalize="none"
          returnKeyType="search"
          clearButtonMode="while-editing"
          accessibilityLabel="Search countries"
          {...searchInputProps}
        />
      </View>
      
      <FlatList
        data={filteredCountries}
        keyboardShouldPersistTaps="always"
        showsVerticalScrollIndicator={false}
        automaticallyAdjustKeyboardInsets={true}
        keyExtractor={keyExtractor}
        renderItem={renderCountryItem}
        contentContainerStyle={styles.flatListContainer}
        initialNumToRender={15}
        maxToRenderPerBatch={10}
        windowSize={10}
        removeClippedSubviews={true}
        getItemLayout={(data, index) => ({
          length: 60, // Approximate item height
          offset: 60 * index,
          index,
        })}
        ListEmptyComponent={searchText ? EmptyComponent : null}
      />
    </View>
  );
};

export default Picker;