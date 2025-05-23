const Header = ({ course }) => {
	return <h1>{course}</h1>;
};

const Part = ({ part }) => {
	return (
		<p>
			{part.name} {part.exercises}
		</p>
	);
};

const Content = ({ parts }) => parts.map((part) => <Part key={part.id} part={part} />);

const Total = ({ parts }) => {
    const total = parts.reduce((accum, part) => accum += part.exercises, 0);

	return (
		<p>
			<strong>
                Total of {total} exercises
            </strong>
		</p>
	);
};

function Course({course}) {
    return (
		<div>
			<Header course={course.name} />
			<Content parts={course.parts} />
			<Total parts={course.parts} />
		</div>
    );
}

export default Course;