<template>
	<div id="app" class="container">
		<h1>Vue 3 Basics</h1>
		<h2>How you like them Vue's?</h2>

		<hr class="my-4" />

		<ClickCounter />

		<hr class="my-4" />
		<ParrotParrow />

		<hr class="my-4" />
		<SalaryNegotiator />
	</div>
</template>

<script lang="ts">
import ClickCounter from "./components/ClickCounter.vue";
import ParrotParrow from "./components/ParrotParrow.vue";
import SalaryNegotiator from "./components/SalaryNegotiator.vue";
export default {
	components: {
		ClickCounter,
		ParrotParrow,
		SalaryNegotiator,
	},
};
</script>
