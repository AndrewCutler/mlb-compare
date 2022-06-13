import {
	Legend,
	PolarAngleAxis,
	PolarGrid,
	PolarRadiusAxis,
	Radar,
	RadarChart
} from 'recharts';

import { AppState } from './store/slice';
import { IPlayerData } from './models/api.models';
import { Wrap } from '@chakra-ui/react';
import { useSelector } from 'react-redux';

const mapToChartData = (data: IPlayerData[]) => {
	const average =
		data.find(({ Year }) => Year === 'Career')?.Stats['BattingAverage'] ??
		0;

	return [
		{
			subject: 'Batting Average',
			Player: average * 1000,
			fullMark: 500
		},
		{
			subject: 'OBP',
			Player: (average + 0.09) * 1000,
			fullMark: 650
		},
		{
			subject: 'wRC',
			Player: 170,
			fullMark: 350
		}
	];
};

const RadarChartTab = (): React.ReactElement => {
	const { selections } = useSelector(AppState);

	return (
		<Wrap>
			{selections &&
				selections.length > 0 &&
				selections.map(({ Data, Name }) => {
					return (
						<RadarChart
							key={Name}
							outerRadius={90}
							width={730}
							height={300}
							data={mapToChartData(Data)}>
							<PolarGrid />
							<PolarAngleAxis dataKey='subject' />
							<PolarRadiusAxis angle={30} domain={[0, 750]} />
							<Radar
								name='Mike'
								dataKey='Player'
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
