import { AppState, toggleStat } from './store/slice';
import {
	Accordion,
	AccordionButton,
	AccordionItem,
	AccordionPanel,
	Box,
	Checkbox,
	AccordionIcon,
	Grid
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';

import { TABS } from './models/local.models';

const Stats = ({ fixed }: { fixed?: boolean }): React.ReactElement => {
	const dispatch = useDispatch();

	const { stats, selections, tabIndex } = useSelector(AppState);

	const handleChange = (label: string): void => {
		dispatch(toggleStat(label));
	};

	const isDisabled = !selections || selections.length === 0;

	return (
		<Accordion allowToggle>
			<AccordionItem>
				<AccordionButton>
					<Box flex='1' textAlign='left'>
						Compare only these stats
					</Box>
					<AccordionIcon />
				</AccordionButton>
				<AccordionPanel>
					<Grid templateColumns={fixed ? '1fr' : 'repeat(6, 1fr)'}>
						{stats
							.filter((stat) =>
								TABS[tabIndex] === 'RADAR' ? stat.IsRadar : true
							)
							.map(({ IsChecked, Label, DisplayLabel }) => {
								return (
									<div key={DisplayLabel}>
										<Checkbox
											isDisabled={isDisabled}
											isChecked={IsChecked}
											mr={5}
											size='lg'
											onChange={() => handleChange(Label)}
										>
											{DisplayLabel ?? Label}
										</Checkbox>
									</div>
								);
							})}
					</Grid>
				</AccordionPanel>
			</AccordionItem>
		</Accordion>
		// <Box mb={3}>
		// 	<Text>Compare only these stats</Text>
		// 	<Grid templateColumns={fixed ? '1fr' : 'repeat(6, 1fr)'}>
		// 		{stats
		// 			.filter((stat) =>
		// 				TABS[tabIndex] === 'RADAR' ? stat.IsRadar : true
		// 			)
		// 			.map(({ IsChecked, Label, DisplayLabel }) => {
		// 				return (
		// 					<div key={DisplayLabel}>
		// 						<Checkbox
		// 							isDisabled={isDisabled}
		// 							isChecked={IsChecked}
		// 							mr={5}
		// 							size='lg'
		// 							onChange={() => handleChange(Label)}
		// 						>
		// 							{DisplayLabel ?? Label}
		// 						</Checkbox>
		// 					</div>
		// 				);
		// 			})}
		// 	</Grid>
		// </Box>
	);
};

export default Stats;
