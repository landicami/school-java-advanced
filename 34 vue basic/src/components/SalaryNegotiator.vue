<template>
	<div>
		<h2>Salary: {{ salary }}</h2>
		<button class="btn btn-primary" @click="increaseSalary(5)">Increase by 5</button>
		<button class="btn btn-warning" @click="decreaseSalary(5)">Decrease by 5</button>
	</div>
</template>

<script lang="ts">
import { ref } from "vue";

export default {
	setup() {
		const salary = ref(42);

		const increaseSalary = (amount: number) => {
			salary.value += amount;
		};

		const decreaseSalary = (amount: number) => {
			salary.value -= amount;
		};

		return {
			salary,
			increaseSalary,
			decreaseSalary,
		};
	},
};
</script>
