import {
	Legend,
	PolarAngleAxis,
	PolarGrid,
	PolarRadiusAxis,
	Radar,
	RadarChart
} from 'recharts';
import { Wrap, useColorModeValue } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

import { AppState } from './store/slice';
import { COLORS } from './utils/colors';
import { STATS } from './models/local.models';
import { mapToChartData } from './utils/chart.radar';
import { useSelector } from 'react-redux';

const defaultStats = STATS.filter(({ DisplayLabel }) =>
	['BA', 'SLG', 'OBP'].includes(DisplayLabel)
);

const buildDomain = (chartData: any[]): number[] => {
	const numerics = chartData.reduce((prev, curr) => {
		for (const key in curr) {
			if (typeof curr[key] === 'number') {
				prev = [...prev, curr[key]];
			}
		}

		return prev;
	}, []);

	const min = +(Math.min(...numerics) * 0.75).toPrecision(3);
	const max = +(Math.max(...numerics) * 1.25).toPrecision(3);

	return [min, max];
};

const RadarChartTab = (): React.ReactElement => {
	const { selections } = useSelector(AppState);
	const strokeColor = useColorModeValue('#020202', '#f6f6f6');

	const [chartData, setChartData] = useState<any[]>([]);
	const [domain, setDomain] = useState<number[]>([]);

	useEffect(() => {
		setChartData(mapToChartData(selections, defaultStats, []));
	}, [selections]);

	useEffect(() => {
		setDomain(buildDomain(chartData));
	}, [chartData]);

	return (
		<Wrap>
			<RadarChart
				outerRadius='80%'
				width={730}
				height={500}
				// TODO: allow selection of seasons/ages to build stats for
				data={chartData}>
				<PolarGrid />
				<PolarAngleAxis dataKey='stat' />
				<PolarRadiusAxis angle={30} domain={domain} />
				{selections.map(({ Name }, index) => {
					return (
						<Radar
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
		</Wrap>
	);
};

export default RadarChartTab;
