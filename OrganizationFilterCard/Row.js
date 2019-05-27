import React, { PropTypes } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { PComponent } from 'rnplus';
import { Icon } from 'BizComponent';
import { observer } from 'mobx-react';
import style from './style';


@observer
export default class Item extends PComponent {
  static propTypes = {
    data: PropTypes.object,
    checked: PropTypes.boolean,
    onPress: PropTypes.func,
  }

  onPress = () => {

  }

  render() {
    const { label, value, children = [] } = data;
    const { checked } = this.props;
    const iconName = this.props.checked ? 'upArrowTwo' : 'downArrowTwo';
    return (
      <TouchableOpacity activeOpacity={1} style={style.flexOne} onPress={onToggle}>
        <View style={style.tab}>
          {
            children.length > 0 &&
            <Icon name={iconName} style={style.navbarTitleIcon} />
          }
          <Text style={style.text}>{label}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}
