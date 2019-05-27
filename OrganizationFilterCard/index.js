
import React, { PropTypes, Component } from 'react';
import { TreeView } from 'BizComponent';
import { Filter } from '@wnpm/beeswax-rn';
import { observer } from 'mobx-react';
import Item from './Item';

import Store from './Store.js';
import style from './style';

const { FilterTabs } = Filter;


@observer
export default class OrganizationFilterCard extends Component {

  static propTypes = {
    data: PropTypes.array,
    onCheck: PropTypes.func,
    onSubmit: PropTypes.func,
    onCancel: PropTypes.func,
  }
  static defaultProps = {
    data: [],
    onSubmit: () => { },
    onCheck: () => { },
    onCancel: () => { },
  }

  constructor(props) {
    super(props);
    this.state = {
      checkedKeys: [],
      expandedKeys: [],
    };
    this.mapData = {};
  }
  onExpand = (expandedKeys) => {
    this.setState({
      expandedKeys,
    });
  }

  onCheck = (checkedKeys) => {
    const { onCheck } = this.props;
    if (onCheck) {
      onCheck(checkedKeys);
    }
  }


  submit = () => {
    this.props.onSubmit(this.store.output());
  }
  onCancel = () => {
    this.props.onCancel();
  }


  render() {
    const { data } = this.props;
    return (
      <Filter>
        <FilterTabs
          type="customSelection"
          value="筛选"
          onChange={this.onChange}
          submit={this.submit}
          valueKey="cascadeSelection"
        >
          <TreeView
            treeStyle={style.tree}
            data={data}
            // expandedKeys={expandedKeys}
            // checkedKeys={selectedKeys}
            onExpand={this.onExpand}
            onCheck={this.onCheck}
          />

        </FilterTabs>
      </Filter>
    );
  }

}
