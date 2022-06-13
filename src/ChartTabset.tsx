import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';

import RadarChartTab from './RadarChartTab';
import YearlyChartTab from './YearlyChartTab';

const ChartTabset = (): React.ReactElement => {
	return (
		<Tabs isLazy isFitted>
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
