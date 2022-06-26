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
import { Box, Checkbox, Flex, useBreakpointValue } from '@chakra-ui/react';
import { RiZoomInLine, RiZoomOutLine } from 'react-icons/ri';
import { buildYearlyChartData, getTooltipYear } from './utils/chart.yearly';
import { useEffect, useState } from 'react';

import { COLORS } from './utils/colors';
import { ISelectionPlayer } from './models/api.models';
import { useSelector } from 'react-redux';
import { AppState } from './store/slice';

const CustomTooltip = ({
	payload: tooltipPayload
}: any): React.ReactElement => {
	if (tooltipPayload && tooltipPayload.length > 0) {
		return (
			<Flex
				flexDirection='column'
				color='white'
				textShadow='1px 1px black'
			>
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

const ZoomButton = ({
	isSmallViewport,
	isZoomed,
	onChange
}: {
	isSmallViewport: boolean;
	isZoomed: boolean;
	onChange: (zoomed: boolean) => void;
}): React.ReactElement => {
	if (isSmallViewport) {
		return <></>;
	}

	if (isZoomed) {
		return (
			<RiZoomOutLine
				onClick={() => onChange(false)}
				style={{ cursor: 'pointer' }}
			/>
		);
	}

	return (
		<RiZoomInLine
			onClick={() => onChange(true)}
			style={{ cursor: 'pointer' }}
		/>
	);
};

const getChartWidth = (isZoomed: boolean, isSmall: boolean): number => {
	if (isSmall) {
		return 300;
	} else if (isZoomed) {
		return 720;
	}

	return 450;
};

const getChartHeight = (isZoomed: boolean, isSmall: boolean): number => {
	if (isSmall) {
		return 200;
	} else if (isZoomed) {
		return 500;
	}

	return 300;
};

const YearlyChart = ({
	stat,
	playerData
}: {
	stat: string;
	playerData: ISelectionPlayer[];
}): React.ReactElement => {
	const breakpoint = useBreakpointValue({ base: 'small', sm: 'normal' });
	const { ages } = useSelector(AppState);

	const [chartData, setChartData] = useState<any[]>([]);
	const [chartKeys, setChartKeys] = useState<any[]>([]);
	const [isZoomed, setIsZoomed] = useState<boolean>(false);

	const isSmallViewport = breakpoint === 'small';

	useEffect(() => {
		if (playerData && playerData.length > 0) {
			const { chartData: _chartData, uniqueKeys } = buildYearlyChartData(
				stat,
				playerData,
				ages
			);

			setChartData(_chartData);
			setChartKeys(uniqueKeys);
		}
	}, [playerData, stat, ages]);

	return (
		<Box>
			<>
				{chartData?.length > 0 && (
					<Flex>
						<BarChart
							width={getChartWidth(isZoomed, isSmallViewport)}
							height={getChartHeight(isZoomed, isSmallViewport)}
							data={chartData}
						>
							<CartesianGrid strokeDasharray='5 5' />
							<XAxis dataKey='Age' />
							<YAxis
								type='number'
								// TODO: handle percentage stats like BA
								domain={[
									(dataMin: number) =>
										Math.floor(dataMin * 0.9),
									(dataMax: number) =>
										Math.ceil(dataMax * 1.1)
								]}
							/>
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
						<ZoomButton
							isSmallViewport={isSmallViewport}
							isZoomed={isZoomed}
							onChange={setIsZoomed}
						/>
					</Flex>
				)}
			</>
		</Box>
	);
};

export default YearlyChart;
