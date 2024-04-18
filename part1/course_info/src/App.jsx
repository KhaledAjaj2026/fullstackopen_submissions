const Header = ({ course }) => <h1>{course}</h1>;
const Part = ({ part, exercise }) => (
	<p>
		{part} {exercise}
	</p>
);
const Content = ({
	part1,
	part2,
	part3,
	exercises1,
	exercises2,
	exercises3,
}) => (
	<>
		<Part part={part1} exercise={exercises1} />
		<Part part={part2} exercise={exercises2} />
		<Part part={part3} exercise={exercises3} />
	</>
);
const Total = ({ exercise1, exercise2, exercise3 }) => (
	<p>Number of exercises {exercise1 + exercise2 + exercise3}</p>
);

const App = () => {
	const course = 'Half Stack application development';
	const part1 = 'Fundamentals of React';
	const exercises1 = 10;
	const part2 = 'Using props to pass data';
	const exercises2 = 7;
	const part3 = 'State of a component';
	const exercises3 = 14;

	return (
		<>
			<Header course={course} />
			<Content
				part1={part1}
				part2={part2}
				part3={part3}
				exercises1={exercises1}
				exercises2={exercises2}
				exercises3={exercises3}
			/>
			<Total
				exercise1={exercises1}
				exercise2={exercises2}
				exercise3={exercises3}
			/>
		</>
	);
};

export default App;
