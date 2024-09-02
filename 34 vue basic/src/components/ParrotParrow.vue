<template>
	<div>
		<form @submit.prevent>
			<div class="mb-3">
				<label for="parrotInput" class="form-label">Say something</label>
				<input
					type="text"
					class="form-control"
					id="parrotInput"
					aria-describedby="emailHelp"
					v-model="parrotInput"
				/>
			</div>
		</form>

		<p>You typed: {{ parrotInput }}</p>
	</div>
</template>

<script lang="ts">
import { ref } from "vue";

export default {
	setup() {
		// Reactive variable that we'll bind to the input-field
		const parrotInput = ref("");

		return {
			parrotInput,
		};
	},
};
</script>
