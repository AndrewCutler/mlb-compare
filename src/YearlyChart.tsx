import {
	Bar,
	BarChart,
	CartesianGrid,
	Legend,
	ReferenceLine,
	Tooltip,
	XAxis,
	YAxis
} from 'recharts';
import { Box, Flex } from '@chakra-ui/react';
import { RiZoomInLine, RiZoomOutLine } from 'react-icons/ri';
import { useEffect, useState } from 'react';

import { ISelectionPlayer } from './models/api.models';

const COLORS = ['#6088aa', '#c09999', '#55a870'];

const CustomTooltip = ({
	payload: tooltipPayload
}: any): React.ReactElement => {
	if (tooltipPayload && tooltipPayload.length > 0) {
		console.log(tooltipPayload);
		return (
			<Flex
				flexDirection='column'
				color='white'
				textShadow='1px 1px black'>
				{tooltipPayload.map(({ payload, name, value }: any) => (
					<div key={name}>
						{name} ({payload.Year}
						): {value}
					</div>
				))}
			</Flex>
		);
	}
	return <></>;
};

const createKey = (stat: string, name: string): string =>
	`${stat}_${name.replaceAll(/\s/g, '_')}`;

interface IBarKey {
	Key: string;
	Name: string;
}

const getValueForStatByAge = (
	player: ISelectionPlayer,
	age: string,
	stat: string
): number | undefined => player.StatsByAge[age]?.Stats[stat];

// Need one chart for each stat, or Y-Axis will be skewed
const YearlyChart = ({
	stat,
	playerData
}: {
	stat: string;
	playerData: ISelectionPlayer[];
}): React.ReactElement => {
	const [chartData, setChartData] = useState<any[]>([]);
	const [chartKeys, setChartKeys] = useState<any[]>([]);
	const [isZoomed, setIsZoomed] = useState<boolean>(false);

	useEffect(() => {
		if (playerData && playerData.length > 0) {
			const nameToData = playerData.reduce(
				(prev, curr) => ({ ...prev, [curr.Name]: curr }),
				{} as { [key: string]: ISelectionPlayer }
			);

			// TODO: fix producing duplicates for ages both players share
			// because it's not setting year/age pairs correctly
			// step 1: new Set(all ages from both players)
			// step 2: for each age, set year and data
			const uniqueAges = Array.from(
				new Set(
					playerData
						.map(({ StatsByAge }) => Object.keys(StatsByAge))
						.flat()
				)
			);
			console.log(uniqueAges);

			const nameKeys = playerData.map(({ Name }) => ({
				Stat: stat,
				Name
			}));

			const uniqueKeys: IBarKey[] = [];

			const _chartData = uniqueAges
				.map((age) => {
					// interface { Age: string; Year: string; [key in keyof Stats]: any }  (?)
					const result: any = { Age: age };

					for (const { Stat, Name } of nameKeys) {
						const key = createKey(Stat, Name);
						if (!uniqueKeys.map(({ Key }) => Key).includes(key)) {
							uniqueKeys.push({ Key: key, Name });
						}

						result[key] = getValueForStatByAge(
							nameToData[Name],
							age,
							stat
						);
					}

					return result;
				})
				.sort(({ Age: AgeA }, { Age: AgeB }) => (AgeA > AgeB ? 1 : -1));

			setChartData(_chartData);
			setChartKeys(uniqueKeys);
		}
	}, [playerData, stat]);

	return (
		<Box>
			<>
				{chartData?.length > 0 && (
					<Flex>
						<BarChart
							width={isZoomed ? 720 : 450}
							height={isZoomed ? 500 : 300}
							data={chartData}>
							<CartesianGrid strokeDasharray='5 5' />
							<XAxis dataKey='Age' />
							<YAxis />
							<Tooltip content={<CustomTooltip />} />
							<Legend />
							<ReferenceLine y={0} stroke='#eee' />
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
						{isZoomed ? (
							<RiZoomOutLine
								onClick={() => setIsZoomed(false)}
								style={{ cursor: 'pointer' }}
							/>
						) : (
							<RiZoomInLine
								onClick={() => setIsZoomed(true)}
								style={{ cursor: 'pointer' }}
							/>
						)}
					</Flex>
				)}
			</>
		</Box>
	);
};

export default YearlyChart;
