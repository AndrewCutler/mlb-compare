import { Box } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import { AppState } from './store/slice';

const Chart = (): React.ReactElement => {
	const { selections: players } = useSelector(AppState);
	const [chartData, setChartData] = useState<any[]>([]);

	useEffect(() => {
		// {Year, HomeRun, Hits}
		// XAxis dataKey = Year
		// Bar dataKey for each stat
		const chartData = players[0].Data.map((datum) => ({
			Year: datum.Year,
			HR: datum.Stats.find(({ Name }) => Name === 'HomeRun')?.Value,
			H: datum.Stats.find(({ Name }) => Name === 'Hits')?.Value
		}));
		console.log(chartData);
		setChartData(chartData);
	}, [players]);

	return (
		<Box>
			{chartData?.length > 0 && (
				<BarChart width={600} height={300} data={chartData}>
					<CartesianGrid strokeDasharray='3 3' />
					<XAxis dataKey='Year' />
					<YAxis />
					<Bar dataKey='HR' fill='#8884d8' />
					<Bar dataKey='H' fill='#82ca9d' />
				</BarChart>
			)}
		</Box>
	);
};

export default Chart;
