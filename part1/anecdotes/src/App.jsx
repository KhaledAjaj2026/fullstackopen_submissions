import { useState } from "react";

const App = () => {
	/*************** CONSTANTS ***************/
	/** CONSTANT anecdotes
	 *
	 * Collection of anecdotes from famous and noteworthy
	 * programmers of history.
	 */
	const anecdotes = [
		"If it hurts, do it more often.",
		"Adding manpower to a late software project makes it later!",
		"The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
		"Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
		"Premature optimization is the root of all evil.",
		"Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
		"Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
		"The only way to go fast, is to go well.",
	];

	/* STATEFUL VARIABLES */
	const [selected, setSelected] = useState(0);
	const [votes, setVotes] = useState(Array(8).fill(0));
	const [mostVotes, setMostVotes] = useState(0);

	/*************** FUNCTIONS ***************/
	/** FUNCTION handleSelected
	 *
	 * Set value of stateful variable 'selected' to a random
	 * value using Math.random().
	 */
	const handleSelected = () => {
		setSelected(Math.floor(Math.random() * 7));
	};

	/** FUNCTION voteAnecdote
	 *
	 * Update vote of each anecdote by creating a copy of the original
	 * array, then incrementing the value at votes[selected] by 1.
	 *
	 * Then, update the index of the anecdote with the most votes
	 * by comparing the vote counts at votes[selected] and
	 * votes[mostVotes]. If the former is greater than the latter,
	 * set mostVotes to 'selected'.
	 */
	const voteAnecdote = () => {
		// update vote count for selected anecdote
		const copy = [...votes];
		copy[selected] += 1;
		setVotes(copy);

		// update mostVoted index if vote count exceeds
		// current largest
		if (votes[selected] >= votes[mostVotes]) {
			setMostVotes(selected);
		}
	};

	return (
		<>
			<div>
				<h2>Anecdote of the Day</h2>
				<p>{anecdotes[selected]}</p>
			</div>
			<div>
				<p>Votes: {votes[selected]}</p>
				<button onClick={() => handleSelected()}>Next Anecdote</button>
				<button onClick={() => voteAnecdote()}>Vote</button>
			</div>
			<div>
				<h2>Anecdote with Most Votes</h2>
				<p>{anecdotes[mostVotes]}</p>
			</div>
		</>
	);
};

export default App;
