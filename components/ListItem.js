import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import React from 'react'

const ListItem = ({ name, symbol, currentPrice, priceChangePercentage7d, logoUrl, onPress }) => {
  // const currentPrice = currentPrice.toLocaleString('tr-TR', {style:"currency", currency: 'TRY'});
  const price = currentPrice.toLocaleString('en-US', {style:"currency", currency: 'USD'});
  const symbol1 = symbol.toUpperCase();
  const priceChange = priceChangePercentage7d.toFixed(4);
  const priceChangeColor = priceChangePercentage7d > 0 ? '#17e300' : '#ff0000';

  return (
    <TouchableOpacity nextFocusUp={1} onPress={onPress}>
      <View style={styles.itemWrapper}>

        <View style={styles.leftWrapper}>
          <Image style={styles.img} source={{ uri: logoUrl}} />
          <View style={styles.headerWrapper}>
            <Text style={styles.header}>{name}</Text>
            <Text style={styles.subheader}>{symbol1}</Text>
          </View>
        </View>

        <View style={styles.rightWrapper}>
          <Text style={styles.header}><Text style={{fontFamily: 'Roboto'}}>$</Text>{price}</Text>
          <Text style={[styles.subheader, {color: priceChangeColor}]}>{priceChange}</Text>
        </View>

      </View>
    </TouchableOpacity>
  )
}

export default ListItem

const styles = StyleSheet.create({
  itemWrapper: {
    // paddingHorizontal: 16,
    paddingVertical: 10,
    marginHorizontal: 16,
    marginTop: 15,
    flexDirection: 'row',
    justifyContent:'space-between',
    alignItems: 'center',
    // backgroundColor: '#a9abb1',
    borderWidth: 1,
    borderRadius: 10,
    // borderColor: '#a9abb1',
    borderColor: '#000000',
  },

  leftWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  img: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
  headerWrapper: {
    marginLeft: 8,
  },
  header: {
    // fontFamily: 'JosefinBold',
    fontFamily: 'CodeRegular',
    fontSize: 18,
  },
  subheader: {
    // fontFamily: 'JosefinLight',
    fontFamily: 'CodeLight',
    fontSize: 14,
    marginTop: 4,
  },

  rightWrapper: {
    alignItems: 'flex-end',
  },

})