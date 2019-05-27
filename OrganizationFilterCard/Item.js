import React, { Component, PropTypes } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Icon } from 'BizComponent';
import { observer } from 'mobx-react';
import style from './style';


@observer
export default class Item extends Component {
  static propTypes = {
    data: PropTypes.object,
    onToggle: PropTypes.func,
    onSelect: PropTypes.func,
  }


  render() {
    const { label, children = [], checked, collapse, index } = this.props.data;
    const iconName = collapse ? 'upArrowTwo' : 'downArrowTwo';
    const checkedIcon = checked ? 'check' : 'downArrowTwo';
    console.log(this.props.data, 'item data');
    return (
      <View>
        <TouchableOpacity
          activeOpacity={1}
          style={style.flexOne}
          onPress={() => this.props.onToggle(index)}
        >
          <View style={style.tab}>
            {
              children.length > 0 &&
              <Icon name={iconName} style={style.navbarTitleIcon} />
            }
            <Text style={style.text}>{label}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={1}
          style={style.flexOne}
          onPress={() => this.props.onSelect(index)}
        >
          <View style={style.tab}>
            {
              collapse ?
                <Icon name={checkedIcon} style={style.navbarTitleIcon} />
                :
                <View style={style.unchecked} />
            }
          </View>
        </TouchableOpacity>
        {
          children.length > 0 && !collapse ?
            <View>
              {
                children.map(item => (<Item key={item.value} data={item} {...this.props} />))
              }
            </View> : null
        }
      </View>
    );
  }
}
