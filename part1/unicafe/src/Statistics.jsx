import StatisticLine from "./StatisticLine";

const Statistics = ({ good, neutral, bad }) => {
	const total = good + neutral + bad;
	const average = (good - bad) / total;
	const positive = (good / total) * 100;

	return (
		<>
			<h2>Statistics</h2>
			{!good && !neutral && !bad ? (
				<p>No feedback given</p>
			) : (
				<table>
					<tbody>
						<tr>
							<StatisticLine text={"good"} value={good} />
						</tr>
						<tr>
							<StatisticLine text={"neutral"} value={neutral} />
						</tr>
						<tr>
							<StatisticLine text={"bad"} value={bad} />
						</tr>
						<tr>
							<StatisticLine text={"total"} value={good} />
						</tr>
						<tr>
							<StatisticLine text={"average"} value={average} />
						</tr>
						<tr>
							<StatisticLine text={"positive"} value={positive} />
						</tr>
					</tbody>
				</table>
			)}
		</>
	);
};

export default Statistics;
