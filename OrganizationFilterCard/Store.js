import { observable, computed, toJS, action } from 'mobx';
// import { Request } from 'BizUtil';

import utils from './utils';

const { filterData, flattenMap, toggle, judgeCheckedAll, getLeastData, deepClone } = utils;


class Store {
  @observable data = [];
  constructor(data) {
    this.data = filterData(data, { defaultValue: false });
    this.stashData = deepClone(this.data);
  }

  selectItem = (index, type) => {
    console.log(index, 'index');
    console.log(toJS(this.data));
    toggle(this.data, index, type);
    if (type === 'select') {
      judgeCheckedAll(this.data, this.indexMap, index);
    }
  }

  @action.bound
  output() {
    return getLeastData(toJS(this.data));
  }
  @action.bound
  reset() {
    this.data = deepClone(this.stashData);
  }


  @computed
  get getData() {
    return toJS(this.data);
  }

  @computed
  get indexMap() {
    return flattenMap(this.data);
  }

}

export default Store;
