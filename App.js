import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { useState, useEffect, useRef, useMemo } from 'react';

import "react-native-gesture-handler";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
// import { getMarketData } from './services/cryptoService';

import ListItem from './components/ListItem';
import Chart from './components/Chart';
import { SAMPLE_DATA } from './assets/data/sampleData.js';

export default function App() {
  const [selectedCoinData, setSelectedCoinData] = useState(null);

  const bottomSheetModalRef = useRef(null);
  const snapPoints = useMemo(() => ['25%','50%'], []);

  const openModal = (item) => {
    setSelectedCoinData(item);
    bottomSheetModalRef.current?.present();
  }

  //FONTS
  const [fontsLoaded] = useFonts({
    'JosefinThin': require('./assets/fonts/josefin-sans.thin.ttf'),
    'JosefinLight': require('./assets/fonts/josefin-sans.light.ttf'),
    'JosefinSemibold': require('./assets/fonts/josefin-sans.semibold.ttf'),
    'JosefinBold': require('./assets/fonts/josefin-sans.bold.ttf'),

    'CodeLight': require('./assets/fonts/CodeNext-Trial-Light.ttf'),
    'CodeRegular': require('./assets/fonts/CodeNext-Trial-Regular.ttf'),
    'CodeBold': require('./assets/fonts/CodeNext-Trial-Bold.ttf'),
    'CodeHeavy': require('./assets/fonts/CodeNext-Trial-Heavy.ttf'),
  });

  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }
    prepare();
  }, []);

  if (!fontsLoaded) {
    return undefined;
  } else {
    SplashScreen.hideAsync();
  }
  //FONTS

  return (
    <GestureHandlerRootView style={{flex: 1}} >
    <BottomSheetModalProvider>
      <View style={styles.container}>
        <StatusBar style="auto" />

        <View style={styles.titleWrapper}>
          <Text style={styles.largeTitle}>Markets</Text>
        </View>
        <View style={styles.divider} />

        {/* <ListItem
          name={SAMPLE_DATA[0].name}
          symbol={SAMPLE_DATA[0].symbol} 
          currentPrice={SAMPLE_DATA[0].current_price} 
          priceChangePercentage7d={SAMPLE_DATA[0].price_change_percentage_7d_in_currency} 
          logoUrl={SAMPLE_DATA[0].image} 
        /> */}

          <FlatList
            data={SAMPLE_DATA}
            keyExtractor={(item) => item.id}
            renderItem={({item}) => (
              <ListItem
              name={item.name}
              symbol={item.symbol} 
              currentPrice={item.current_price} 
              priceChangePercentage7d={item.price_change_percentage_7d_in_currency} 
              logoUrl={item.image} 
              onPress={() => openModal(item)}
              />
              )} />

      </View>

      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={0}
        snapPoints={snapPoints}
        backgroundStyle={styles.bottomSheet}
        style={styles.shadow}
        // backgroundStyle={{borderRadius: 5, backgroundColor: '#956d6d77', elevation: 10,}}
        // onChange={handleSheetChanges}
        >
        <View style={styles.contentContainer}>
          {selectedCoinData ? (
            <Chart 
            currentPrice={selectedCoinData.current_price} 
            logoUrl={selectedCoinData.image} 
            name={selectedCoinData.name}
            symbol={selectedCoinData.symbol} 
            priceChangePercentage7d={selectedCoinData.price_change_percentage_7d_in_currency} 
            sparkline={selectedCoinData.sparkline_in_7d.price}
            />
            )
          :null}
        </View>
      </BottomSheetModal>
    </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#909090',
  },

  titleWrapper:{
    marginTop: 40,
    paddingHorizontal: 16,
    // borderBottomWidth: 1,
    // borderRadius: 5,
    // width: '80%',
  },
  largeTitle: {
    fontSize: 24,
    // fontFamily: 'JosefinBold',
    fontFamily: 'CodeHeavy'
  },

  divider: {
    // height: StyleSheet.hairlineWidth,
    height: 1,
    marginHorizontal: 16,
    // backgroundColor: '#a9abb1'
    backgroundColor: '#000000'
  },

  bottomSheet: {
    borderRadius: 20,
    backgroundColor: '#e7e7e7',
  },
  shadow: {
    elevation: 7,
  }
});
