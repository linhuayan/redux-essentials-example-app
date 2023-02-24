import React, { useState } from 'react'
import { Tabs, Sticky } from 'tdesign-mobile-react'

const TabsWrap = () => {
  const [key, setKey] = useState('tab1')
  const list4 = [
    {
      label: '标签页一',
      value: 'tab1',
    },
    {
      label: '标签页二',
      value: 'tab2',
    },
    {
      label: '标签页三',
      value: 'tab3',
    },
    {
      label: '标签页四',
      value: 'tab4',
    },
    {
      label: '标签页五',
      value: 'tab5',
    },
    {
      label: '标签页六',
      value: 'tab6',
    },
  ]

  const content = {
    tab1: `标签一内容`,
    tab2: '标签二内容',
    tab3: '标签三内容',
    tab4: '标签四内容',
    tab5: '标签五内容',
    tab6: '标签六内容',
  }

  const onChange = (value) => {
    setKey(value)
  }

  return (
    <ul className="hori-wrap">
      <li>
        <Sticky>
          <Tabs defaultValue={key} list={list4} change={onChange}></Tabs>
        </Sticky>
        <div className="tab-content">
            {

            }
            <li>1222</li>
            <li>1222</li>
            <li>1222</li>
            <li>1222</li>
            <li>1222</li>
            <li>1222</li>
            <li>1222</li>
            <li>1222</li>
            <li>1222</li>
            <li>1222</li>
            <li>1222</li>
            <li>1222</li>
            <li>1222</li>
            <li>1222</li>
            <li>1222</li>
            <li>1222</li>
            <li>1222</li>
            <li>1222</li>
            <li>1222</li>
            <li>1222</li>
            <li>1222</li>
            <li>1222</li>
            <li>1222</li>
            <li>1222</li>
            <li>1222</li>
            <li>1222</li>
            <li>1222</li>
            <li>1222</li>
            <li>1222</li>
            <li>1222</li>
            <li>1222</li>
            <li>1222</li>
            <li>1222</li>
            <li>1222</li>
            <li>1222</li>
            <li>1222</li>
            <li>1222</li>
            <li>1222</li>
            <li>1222</li>
        </div>
      </li>
    </ul>
  )
}

export default TabsWrap
