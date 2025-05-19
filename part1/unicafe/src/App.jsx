import { useState } from "react";
import Statistics from "./Statistics";
import Button from "./Button";

const App = () => {
	const [good, setGood] = useState(0);
	const [neutral, setNeutral] = useState(0);
	const [bad, setBad] = useState(0);

	return (
		<>
			<h2>Give Feedback</h2>
			<div className="buttons-container">
				<Button typeName={"good"} type={good} setType={setGood} />
				<Button typeName={"neutral"} type={neutral} setType={setNeutral} />
				<Button typeName={"bad"} type={bad} setType={setBad} />
			</div>
			<Statistics good={good} neutral={neutral} bad={bad} />
		</>
	);
};

export default App;
