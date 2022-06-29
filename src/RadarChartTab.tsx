import {
	Legend,
	PolarAngleAxis,
	PolarGrid,
	PolarRadiusAxis,
	Radar,
	RadarChart
} from 'recharts';
import { Wrap, useColorModeValue } from '@chakra-ui/react';
import { buildDomain, buildRadarChartData } from './utils/chart.radar';
import { useEffect, useState } from 'react';

import { AppState } from './store/slice';
import { COLORS } from './utils/colors';
import { STATS } from './models/local.models';
import { useSelector } from 'react-redux';

const defaultStats = STATS.filter(({ DisplayLabel }) =>
	['BA', 'SLG', 'OBP'].includes(DisplayLabel)
);

const RadarChartTab = (): React.ReactElement => {
	const { selections } = useSelector(AppState);
	const strokeColor = useColorModeValue('#020202', '#f6f6f6');

	const [chartData, setChartData] = useState<any[]>([]);
	const [domain, setDomain] = useState<number[]>([]);

	useEffect(() => {
		setChartData(buildRadarChartData(selections, defaultStats, [], []));
	}, [selections]);

	useEffect(() => {
		const _domain = buildDomain(chartData);
		setDomain(_domain);
	}, [chartData]);

	return (
		<Wrap>
			{selections && selections.length > 0 && chartData && (
				<RadarChart
					outerRadius='80%'
					width={730}
					height={500}
					// TODO: allow selection of seasons/ages to build stats for
					data={chartData}
				>
					<PolarGrid />
					<PolarAngleAxis dataKey='stat' />
					<PolarRadiusAxis angle={30} domain={domain} />
					{selections.map(({ Name }, index) => {
						return (
							<Radar
								key={Name}
								name={Name}
								dataKey={Name}
								stroke={strokeColor}
								strokeWidth='2px'
								fill={COLORS[index]}
								fillOpacity={0.3}
							/>
						);
					})}
					<Legend />
				</RadarChart>
			)}
		</Wrap>
	);
};

export default RadarChartTab;
