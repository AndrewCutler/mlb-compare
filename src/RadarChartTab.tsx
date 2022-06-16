import {
	Legend,
	PolarAngleAxis,
	PolarGrid,
	PolarRadiusAxis,
	Radar,
	RadarChart
} from 'recharts';

import { AppState } from './store/slice';
import { COLORS } from './utils/colors';
import { Wrap } from '@chakra-ui/react';
import { mapToChartData } from './utils/chart.radar';
import { useSelector } from 'react-redux';

const defaultStats = [
	{ DisplayLabel: 'BA', Label: 'batting_avg', IsDisabled: false, IsChecked: false },
	{ DisplayLabel: 'OBP', Label: 'onbase_perc', IsDisabled: false, IsChecked: false },
	{ DisplayLabel: 'SLG', Label: 'slugging_perc', IsDisabled: false, IsChecked: false },
];

const RadarChartTab = (): React.ReactElement => {
	const { selections } = useSelector(AppState);

	return (
		<Wrap>
			{selections &&
			// TODO: map to Radar, not RadarChart
				selections.length > 0 &&
				selections.map(({ StatsByAge, Name }, index) => {
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
								stroke={COLORS[index]}
								fill={COLORS[index]}
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
