<template>
	<div>
		<v-layout>
			<v-flex>
				<v-card v-if="getCuttentTab.tabItems.length > 0">
					<v-card-title>
						<span class="headline primary--text">{{ getCuttentTab.name }}</span>
        			</v-card-title>
					<v-container fluid>
						<v-layout row wrap align-center>
							<v-flex >

								<table class="datatable table elevation-1">
									<thead>
										<tr>
											<th class="text-xs-left">s/n</th><th class="text-xs-left">Number of month</th><th class="text-xs-left">Sum</th><th class="text-xs-left">Additional summ</th>
										</tr>
									</thead>
									<tbody>
										<tr v-for="(item, index) in getCuttentTab.tabItems" :key="index">

											<td>{{index + 1}}</td>

											<td>{{ item.month }}</td>

											<td>
												<span class="primary--text">Current sum: {{ item.currentSumm }}</span><br>
												<span class="green--text">Totlal sum: {{ item.totalSumm }}</span><br>
											</td>

											<td>
												<v-text-field
													label="Additional summ"
													v-model="item.addSumm"
													@input="setDdataInCurrentTab({item, index})"
												></v-text-field>
											</td>
										</tr>
									</tbody>
								</table>
							</v-flex>
						</v-layout>
					</v-container>
				</v-card>
			</v-flex>
		</v-layout>
	</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
export default {
	created() {},
	data() {
		return {};
	},
	methods: {
		...mapActions({
			setTabs: 'setTabs',
			setDdataInCurrentTab: 'setDdataInCurrentTab'
		}),
	},
	computed: {
		...mapGetters({
			getCuttentTab: 'getCuttentTab'
		})
	}
};
</script>
