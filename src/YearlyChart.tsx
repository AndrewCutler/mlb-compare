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
import { buildYearlyChartData, getTooltipYear } from './utils/chart.yearly';
import { useEffect, useState } from 'react';

import { COLORS } from './utils/colors';
import { ISelectionPlayer } from './models/api.models';

const CustomTooltip = ({
	payload: tooltipPayload
}: any): React.ReactElement => {
	if (tooltipPayload && tooltipPayload.length > 0) {
		return (
			<Flex
				flexDirection='column'
				color='white'
				textShadow='1px 1px black'>
				{tooltipPayload.map(
					({ payload, name, value, dataKey }: any) => (
						<div key={name}>
							{name} ({getTooltipYear(payload, dataKey)}
							): {value}
						</div>
					)
				)}
			</Flex>
		);
	}

	return <></>;
};

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
			const { chartData: _chartData, uniqueKeys } = buildYearlyChartData(
				stat,
				playerData
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
