const addMatchBtn = document.querySelector("#add_another_match");
const resultValue = document.querySelector(".lws-singleResult");
const incrementBtn = document.querySelector(".lws-increment");
const decrementBtn = document.querySelector(".lws-decrement");

const initialState = {
	id: 1,
	score: 0,
};

// redux action

const INCREMENT = "increment";
const DECREMENT = "decrement";
const ADD_MATCH = "add-match";
const RESET = "input-reset";

// actions
const increment = (value) => {
	return {
		type: INCREMENT,
		payload: value,
	};
};
const decrement = (value) => {
	return {
		type: DECREMENT,
		payload: value,
	};
};

// create reducer
// reducer function
function matchReducer(state = initialState, action) {
	console.log(state);
	switch (action.type) {
		case INCREMENT:
			console.log(typeof action.payload);
			return {
				...state,
				score: state.score + action.payload,
			};
		case DECREMENT:
			if (action.payload > 0 && state.score < action.payload) {
				return {
					...state,
					score: (state.score = 0),
				};
			} else {
				return {
					...state,
					score: state.score - action.payload,
				};
			}

		case RESET:
			return {
				...state,
				score: 0,
			};

		default:
			return state;
	}
}

// create store
const store = Redux.createStore(matchReducer);

const render = () => {
	const state = store.getState();
	resultValue.textContent = Number(state.score);
};

//  update ui initially
render();
store.subscribe(render);

// input type listener
incrementBtn.addEventListener("keypress", (e) => {
	if (e.key === "Enter") {
		e.preventDefault();
		let number = parseInt(e.target.value);
		store.dispatch(increment(number));
		e.target.value = "";
	}
});

decrementBtn.addEventListener("keypress", (e) => {
	if (e.key === "Enter") {
		e.preventDefault();
		store.dispatch(decrement(e.target.value));
		e.target.value = "";
	}
});
// reset forms
function resetForms() {
	const state = store.getState();
	const data = (state.score = 0);
	resultValue.textContent = Number(data);
}

const resetButton = document.querySelector(".lws-reset");

resetButton.addEventListener("click", resetForms);

function newId() {
	let id = 1;
	return ++id;
}

// button click event listener to add new match
let id = 2;
document.getElementById("add_another_match").addEventListener("click", () => {
	const newStore = Redux.createStore(matchReducer, { id: id++, score: 0 });
	newStore.subscribe(() =>
		renderMatch(newStore, `Match ${newStore.getState().id}`)
	);
	renderMatch(newStore, `Match ${newStore.getState().id}`);
});

// helper function to render each match
function renderMatch(store, name) {
	const match = document.createElement("div");
	match.className = "match";

	const wrapper = document.createElement("div");
	wrapper.className = "wrapper";
	match.appendChild(wrapper);

	const deleteButton = document.createElement("button");
	deleteButton.className = "lws-delete";
	deleteButton.innerHTML = `<img src="./image/delete.svg" alt="" />`;
	deleteButton.addEventListener("click", () => {
		match.remove();
	});
	wrapper.appendChild(deleteButton);

	const matchName = document.createElement("h3");
	matchName.className = "lws-matchName";
	matchName.textContent = name;
	wrapper.appendChild(matchName);

	const incDec = document.createElement("div");
	incDec.className = "inc-dec";
	match.appendChild(incDec);

	const incForm = document.createElement("form");
	incForm.className = "incrementForm";
	incDec.appendChild(incForm);

	const incLabel = document.createElement("h4");
	incLabel.textContent = "Increment";
	incForm.appendChild(incLabel);

	const incInput = document.createElement("input");
	incInput.type = "number";
	incInput.name = "increment";
	incInput.className = "lws-increment";
	incForm.appendChild(incInput);

	const decForm = document.createElement("form");
	decForm.className = "decrementForm";
	incDec.appendChild(decForm);

	const decLabel = document.createElement("h4");
	decLabel.textContent = "Decrement";
	decForm.appendChild(decLabel);

	const decInput = document.createElement("input");
	decInput.type = "number";
	decInput.name = "decrement";
	decInput.className = "lws-decrement";
	decForm.appendChild(decInput);

	const numbers = document.createElement("div");
	numbers.className = "numbers";
	match.appendChild(numbers);

	const singleResult = document.createElement("h2");
	singleResult.className = "lws-singleResult";
	singleResult.textContent = store.getState().score;
	numbers.appendChild(singleResult);

	document.getElementById("all_matches").appendChild(match);

	//

	// const store2 = Redux.createStore(matchReducer);

	// Create a function to render the score board
	function renderScoreBoard() {
		const state = store.getState();
		console.log(state);

		// Remove all existing matches
		const allMatchesDiv = document.querySelector("#all_matches");
		allMatchesDiv.innerHTML = "";

		// Render each match
		state.matches.forEach((match, index) => {
			const matchDiv = document.createElement("div");
			matchDiv.className = "match";

			const wrapperDiv = document.createElement("div");
			wrapperDiv.className = "wrapper";

			const deleteButton = document.createElement("button");
			deleteButton.className = "lws-delete";
			deleteButton.addEventListener("click", () => {
				store2.dispatch(deleteMatch(index));
			});

			const deleteImg = document.createElement("img");
			deleteImg.src = "./image/delete.svg";
			deleteImg.alt = "";
			deleteButton.appendChild(deleteImg);

			const matchName = document.createElement("h3");
			matchName.className = "lws-matchName";
			matchName.textContent = `Match ${index + 1}`;

			wrapperDiv.appendChild(deleteButton);
			wrapperDiv.appendChild(matchName);
			matchDiv.appendChild(wrapperDiv);

			const incDecDiv = document.createElement("div");
			incDecDiv.className = "inc-dec";

			const incrementForm = document.createElement("form");
			incrementForm.className = "incrementForm";

			const incrementHeader = document.createElement("h4");
			incrementHeader.textContent = "Increment";
			const incrementInput = document.createElement("input");
			incrementInput.type = "number";
			incrementInput.name = "increment";
			incrementInput.className = "lws-increment";
			incrementInput.value = match.increment;
			incrementInput.addEventListener("keypress", (e) => {
				if (e.key === "Enter") {
					e.preventDefault();
					let number = parseInt(e.target.value);
					store.dispatch(increment(number));
					e.target.value = "";
				}
			});

			incrementForm.appendChild(incrementHeader);
			incrementForm.appendChild(incrementInput);

			const decrementForm = document.createElement("form");
			decrementForm.className = "decrementForm";

			const decrementHeader = document.createElement("h4");
			decrementHeader.textContent = "Decrement";
			const decrementInput = document.createElement("input");
			decrementInput.type = "number";
			decrementInput.name = "decrement";
			decrementInput.className = "lws-decrement";
			decrementInput.value = match.decrement;
			decrementInput.addEventListener("change", (e) => {
				// if (e.key === "Enter") {
				e.preventDefault();
				let number = parseInt(e.target.value);
				store.dispatch(increment(number));
				console.log(number);
				e.target.value = "";
				// }
			});

			decrementForm.appendChild(decrementHeader);
			decrementForm.appendChild(decrementInput);

			incDecDiv.appendChild(incrementForm);
			incDecDiv.appendChild(decrementForm);
			matchDiv.appendChild(incDecDiv);

			const numbersDiv = document.createElement("div");
			numbersDiv.className = "numbers";

			const singleResult = document.createElement("h2");
			singleResult.className = "lws-singleResult";
			singleResult.textContent = match.total;

			numbersDiv.appendChild(singleResult);
			matchDiv.appendChild(numbersDiv);

			allMatchesDiv.appendChild(matchDiv);
		});

		// Update total score
		const totalScore = document.querySelector(".total");
		totalScore.textContent = `Total: ${state.total}`;
	}

	// Render initial score board

	const render = () => {
		// store.subscribe(renderScoreBoard);
		const state = store.getState();
		resultValue.textContent = Number(state.score);
	};

	//  update ui initially
	render();
	store.subscribe(render);
}
