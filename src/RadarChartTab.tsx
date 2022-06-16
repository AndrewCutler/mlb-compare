import {
	Legend,
	PolarAngleAxis,
	PolarGrid,
	PolarRadiusAxis,
	Radar,
	RadarChart
} from 'recharts';

import { AppState } from './store/slice';
import { Wrap } from '@chakra-ui/react';
import { mapToChartData } from './utils/chart.radar';
import { useSelector } from 'react-redux';

const defaultStats = [
	{ Name: 'BattingAverage', Label: 'batting_avg', IsDisabled: false, IsChecked: false },
	{ Name: 'OnBasePercentage', Label: 'onbase_perc', IsDisabled: false, IsChecked: false },
	{ Name: 'Slugging', Label: 'slugging_prec', IsDisabled: false, IsChecked: false },
];

const RadarChartTab = (): React.ReactElement => {
	const { selections } = useSelector(AppState);

	return (
		<Wrap>
			{selections &&
				selections.length > 0 &&
				selections.map(({ StatsByAge, Name }) => {
					return (
						<RadarChart
							key={Name}
							outerRadius={120}
							width={730}
							height={300}
							// TODO: allow selection of seasons/ages to build stats for
							data={mapToChartData(StatsByAge, defaultStats, [], Name)}>
							<PolarGrid />
							<PolarAngleAxis dataKey='stat' />
							<PolarRadiusAxis
								angle={45}
								type='number'
								// domain={[0, 500]}
							/>
							<Radar
								name={Name}
								dataKey={Name}
								stroke='#8884d8'
								fill='#8884d8'
								fillOpacity={0.75}
							/>
							<Legend />
						</RadarChart>
					);
				})}
		</Wrap>
	);
};

export default RadarChartTab;
