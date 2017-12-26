import { Component } from 'refast';
import Group from 'saltui/lib/Group';

import List from 'components/list';
import Info from 'components/info';
import logic from './logic';
import './PageDemo.less';

export default class Page extends Component {

  constructor(props) {
    super(props, logic);//super绑定logic
  }

  componentDidMount() {
    this.handleClick('1234');
  }
  handleClick(workNo) {
    this.dispatch('fetch', { workNo });//派发事件fetch数据
  }

  render() {
    const t = this;
    const { list = [], error } = t.state;
    const Tag = list && list.length ? List : Info;

    return (
      <div className="page-demo">
        <Group>
          <Group.List lineIndent={15} itemIndent={15}>
            <Tag
              list={list}
              error={error}
              onClick={t.handleClick.bind(this)}
            />
          </Group.List>
        </Group>
      </div>
    );
  }
}
