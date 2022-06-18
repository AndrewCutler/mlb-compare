import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';

import RadarChartTab from './RadarChartTab';
import YearlyChartTab from './YearlyChartTab';
import { setTabIndex } from './store/slice';
import { useDispatch } from 'react-redux';

const ChartTabset = (): React.ReactElement => {
	const dispatch = useDispatch();
	
	return (
		<Tabs isLazy isFitted onChange={(index) => dispatch(setTabIndex(index))}>
			<TabList>
				<Tab>Yearly</Tab>
				<Tab>Radar charts</Tab>
			</TabList>
			<TabPanels>
				<TabPanel>
					<YearlyChartTab />
				</TabPanel>
				<TabPanel>
					<RadarChartTab />
				</TabPanel>
			</TabPanels>
		</Tabs>
	);
};

export default ChartTabset;
