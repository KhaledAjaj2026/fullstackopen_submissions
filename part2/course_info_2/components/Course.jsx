const Header = ({ course }) => <h2>{course.name}</h2>;
const Part = ({ part }) => (
	<p>
		{part.name} {part.exercises}
	</p>
);
const Content = ({ course }) =>
	course.parts.map((part) => <Part key={part.id} part={part} />);

const Total = ({ course }) => (
	<p>
		<strong>
			Total of{' '}
			{course.parts.reduce((total, num) => (total += num.exercises), 0)}{' '}
			exercises
		</strong>
	</p>
);

const Course = ({ course }) => {
	return (
		<>
			<Header course={course} />
			<Content course={course} />
			<Total course={course} />
		</>
	);
};

export default Course;
