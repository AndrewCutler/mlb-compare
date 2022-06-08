import { Box } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
	Bar,
	BarChart,
	CartesianGrid,
	Legend,
	Tooltip,
	XAxis,
	YAxis
} from 'recharts';
import { IPlayerData, ISelectionPlayer, IStat } from './models/api.models';
import { AppState, selectCheckedStats } from './store/slice';

const COLORS = ['#6088aa', '#c09999', '#55a870'];

// const CustomTooltip = (x: any): React.ReactElement => {
// 	console.log(x);
// 	if (x.payload && x.payload.length) {
// 		return x.payload[0].name;
// 	}
// 	return <></>;
// };

// Need one chart for each stat, or Y-Axis will be skewed
const Chart = ({
	stat,
	playerData
}: {
	stat: string;
	playerData: ISelectionPlayer[];
}): React.ReactElement => {
	const [chartData, setChartData] = useState<any[]>([]);
	const [chartKeys, setChartKeys] = useState<any[]>([]);

	useEffect(() => {
		if (playerData && playerData.length > 0) {
			// const testData = [
			// 	...playerData,
			// 	{
			// 		Data: [
			// 			{
			// 				Year: '2019',
			// 				Stats: [{ Name: 'HomeRun', Value: 11 }]
			// 			},
			// 			{
			// 				Year: '2020',
			// 				Stats: [{ Name: 'HomeRun', Value: 11 }]
			// 			},
			// 			{
			// 				Year: '2021',
			// 				Stats: [{ Name: 'HomeRun', Value: 11 }]
			// 			},
			// 			{
			// 				Year: '2022',
			// 				Stats: [{ Name: 'HomeRun', Value: 11 }]
			// 			}
			// 		],
			// 		Name: 'Fake Pete Alonso'
			// 	}
			// ];

			const nameToData = playerData.reduce(
				(prev, curr) => ({ ...prev, [curr.Name]: curr }),
				{} as { [key: string]: ISelectionPlayer }
			);

			const years = Array.from(
				new Set(
					// testData
					playerData
						.map((player) => player.Data.map(({ Year }) => Year))
						.flat()
				)
			);
			const names = playerData.map(({ Name }) => Name);
			// const names = testData.map(({ Name }) => Name);

			// This is the worst thing ever.
			const keys: any[] = [];
			const _chartData = years
				.map((year) => {
					const result: any = { Year: year };

					const nameKeys = names.map((name) => [stat, name]);
					for (const key of nameKeys) {
						const _key = `${key[0]}_${key[1].replaceAll(
							/\s/g,
							'_'
						)}`;
						if (!keys.map(({ Key }) => Key).includes(_key)) {
							keys.push({ Key: _key, Name: key[1] });
						}
						result[_key] = nameToData[key[1]].Data.find(
							({ Year }) => Year === year
						)?.Stats.find(({ Name }) => Name === key[0])?.Value;
					}

					return result;
				})
				.sort(({ Year: YearA }, { Year: YearB }) =>
					YearA > YearB ? 1 : -1
				);

			console.log(_chartData);
			setChartData(_chartData);
			setChartKeys(Array.from(new Set(keys)));
		}
	}, [playerData, stat]);

	useEffect(() => {
		console.log(chartKeys);
	}, [chartKeys]);

	return (
		<Box>
			{chartData?.length > 0 && (
				<BarChart width={600} height={300} data={chartData}>
					<CartesianGrid strokeDasharray='5 5' />
					<XAxis dataKey='Year' />
					<YAxis />
					{/* <Tooltip content={<CustomTooltip />} /> */}
					{/* <Legend /> */}
					{chartKeys.map(({ Key, Name }, index) => (
						<Bar
							dataKey={Key}
							barSize={30}
							key={Key}
							name={Name}
							fill={COLORS[index]}
						/>
					))}
				</BarChart>
			)}
		</Box>
	);
};

export default Chart;
