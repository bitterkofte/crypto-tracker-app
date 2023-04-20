import { StyleSheet, Text, View, Image, Dimensions } from 'react-native'
import React from 'react'
// import {ChartDot, ChartPath, ChartPathProvider} from '@rainbow-me/animated-charts';

// export const {width: SIZE} = Dimensions.get('window');

const Chart = ( {currentPrice, logoUrl, name, symbol, priceChangePercentage7d, sparkline}) => {
  const priceChangeColor = priceChangePercentage7d > 0 ? '#17e300' : '#ff0000';
  const symbol1 = symbol.toUpperCase();
  return (
    // <ChartPathProvider data={{ points: sparkline, smoothingStrategy: 'bezier' }}>
    <View style={styles.chartWrapper}>
      <View style={styles.titlesWrapper}>

        <View style={styles.upperTitles}>
          <View style={styles.badge}>
            <Image source={{uri: logoUrl}} style={styles.img} />
            <Text style={styles.badgeText}>{name} -{symbol1}-</Text>
          </View>
          <Text style={styles.badgeText}>7d</Text>
        </View>

        <View style={styles.lowerTitles}>
          <Text style={styles.lowerTextBold}><Text style={styles.none}>$</Text>{currentPrice.toLocaleString('en-US', {style:"currency", currency: 'USD'})}</Text>
          <Text style={[styles.lowerText, {color: priceChangeColor}]}>{priceChangePercentage7d.toFixed(4)}<Text style={styles.none}>%</Text></Text>
        </View>
      </View>

      <View style={styles.chartLineWrapper}>
        {/* <ChartPath height={SIZE / 2} stroke="yellow" width={SIZE} />
        <ChartDot style={{ backgroundColor: 'blue' }} /> */}
      </View>
    </View>
    // </ChartPathProvider>
  )
}

export default Chart

const styles = StyleSheet.create({
  chartWrapper: {
    margin: 16,
  },

  titlesWrapper: {

  },
  upperTitles: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 9,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  img: {
    width: 24,
    height: 24,
    marginRight: 5,
  },

  badgeText: {
    fontSize: 14,
    color: '#7f7f7f',
    fontFamily: 'CodeLight',
  },

  lowerTitles: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  lowerTextBold:{
    fontFamily: 'CodeRegular',
    fontSize: 24,
  },

  lowerText: {
    fontFamily: 'CodeLight',
    fontSize: 18,

  },

  chartLineWrapper: {

  },

  none:{
    fontFamily: 'Roboto',
  }
})