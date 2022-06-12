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

const CustomTooltip = ({ payload }: any): React.ReactElement => {
	if (payload && payload.length > 0) {
		return (
			<Flex
				flexDirection='column'
				color='white'
				textShadow='1px 1px black'>
				{payload.map(({ name, value }: any) => (
					<div key={name}>
						{name}: {value}
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

const getValueForStatByYear = (
	player: ISelectionPlayer,
	year: string,
	stat: string
): number | undefined =>
	player.Data.find(({ Year }) => Year === year)?.Stats.find(
		({ Name }) => Name === stat
	)?.Value;

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

			const years = Array.from(
				new Set(
					playerData
						.map((player) => player.Data.map(({ Year }) => Year))
						.flat()
				)
			);
			const names = playerData.map(({ Name }) => Name);

			const uniqueKeys: IBarKey[] = [];

			const _chartData = years
				.map((year) => {
					// interface { Year: string; [key in keyof Stats]: any }  (?)
					const result: any = { Year: year };

					const nameKeys = names.map((name) => ({
						Stat: stat,
						Name: name
					}));

					for (const { Stat, Name } of nameKeys) {
						const key = createKey(Stat, Name);
						if (!uniqueKeys.map(({ Key }) => Key).includes(key)) {
							uniqueKeys.push({ Key: key, Name });
						}

						result[key] = getValueForStatByYear(
							nameToData[Name],
							year,
							stat
						);
					}

					return result;
				})
				.sort(({ Year: YearA }, { Year: YearB }) =>
					YearA > YearB ? 1 : -1
				);

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
							<XAxis dataKey='Year' />
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
