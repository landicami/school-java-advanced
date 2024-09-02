<template>
	<div>
		<h2>Counter: {{ counter }}</h2>
		<button class="btn btn-primary" @click="incrementCounter">
			Click meeeeee!! <span class="smol-text">You know you want to 🤩</span>
		</button>
	</div>
</template>

<script lang="ts">
import { ref } from "vue";

export default {
	setup() {
		// Create the reactive variable `counter`
		const counter = ref(42);

		// Function to increase the value in counter by click
		const incrementCounter = () => {
			counter.value++;
		};
		console.log(counter.value);

		return {
			counter,
			incrementCounter,
		};
	},
};
</script>
