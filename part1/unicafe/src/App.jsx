import { useState } from 'react';

const Button = ({ handler, text }) => {
	return <button onClick={handler}>{text}</button>;
};

const StatisticLine = ({ text, value }) => {
	if (text === 'positive') {
		return (
			<td>
				{text} {value} %
			</td>
		);
	} else {
		return (
			<td>
				{text} {value}
			</td>
		);
	}
};

const Statistics = ({ good, neutral, bad, total, average, positivity }) => {
	if (!good && !neutral && !bad) {
		return <p>No feedback given</p>;
	} else {
		return (
			<>
				<h2>Statistics</h2>
				<table>
					<tbody>
						<tr>
							<StatisticLine text='good' value={good} />
						</tr>
						<tr>
							<StatisticLine text='neutral' value={neutral} />
						</tr>
						<tr>
							<StatisticLine text='bad' value={bad} />
						</tr>
						<tr>
							<StatisticLine text='all' value={total} />
						</tr>
						<tr>
							<StatisticLine text='average' value={average} />
						</tr>
						<tr>
							<StatisticLine text='positive' value={positivity} />
						</tr>
					</tbody>
				</table>
				{/* <p>good {good}</p>
				<p>neutral {neutral}</p>
				<p>bad {bad}</p>
				<p>all {total}</p>
				<p>average {average || 0}</p>
				<p>positive {positivity || 0} %</p> */}
			</>
		);
	}
};

const App = () => {
	// save clicks of each button to its own state
	const [good, setGood] = useState(0);
	const [neutral, setNeutral] = useState(0);
	const [bad, setBad] = useState(0);

	const handleGood = () => setGood(good + 1);
	const handleNeutral = () => setNeutral(neutral + 1);
	const handleBad = () => setBad(bad + 1);

	const total = good + bad + neutral;
	const average = (good - bad) / total;
	const positivity = (good / total) * 100;

	return (
		<>
			<h2>Give Feedback</h2>
			<Button handler={handleGood} text='good' />
			<Button handler={handleNeutral} text='neutral' />
			<Button handler={handleBad} text='bad' />
			<Statistics
				good={good}
				neutral={neutral}
				bad={bad}
				total={total}
				average={average}
				positivity={positivity}
			/>
		</>
	);
};

export default App;
