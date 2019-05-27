import { StyleSheet } from 'react-native';
import { px, DP_FROM_1PX, ISIPHONEX } from 'BizStyle';

export default StyleSheet.create({
  container: {
    position: 'absolute',
    top: ISIPHONEX ? px(620) : px(570),
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  textContainer: {
    height: px(80),
    paddingLeft: px(40),
    paddingRight: px(40),
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: '#fff',
    borderBottomWidth: DP_FROM_1PX,
    borderBottomColor: '#ddd',
  },
  text: {
    color: '#8C919D',
    fontSize: px(28),
  },
  activeText: {
    color: '#7599FA',
    fontSize: px(28),
  },


  unchecked: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: '#999999',
  },
});
