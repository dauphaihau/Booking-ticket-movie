import React, {useState} from 'react';
import { Tabs, Radio, Space } from 'antd';

const { TabPane } = Tabs;

function HomeMenu(props) {

    const [state, setState] = useState({
        tabPosition: 'left',
    })

    const { tabPosition } = state;

    return (
        <>
            <Tabs tabPosition={tabPosition}>
                <TabPane tab={<img src='https://picsum.photos/200' className="rounded-full w-1/2" />} key="1">

                </TabPane>
                <TabPane tab="Tab 2" key="2">
                    Content of Tab 9
                </TabPane>
                <TabPane tab="Tab 3" key="3">
                    Content of Tab 3
                </TabPane>
            </Tabs>
        </>
    );
}

export default HomeMenu;