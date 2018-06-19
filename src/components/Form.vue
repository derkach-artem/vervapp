<template>
    <div>
        <v-layout>
            <v-flex xs12>
                <v-card>
                    <v-form ref="form" @submit.prevent="submit">
                    <v-container fluid>
                        <v-layout row wrap>
                            <v-flex xs12 sm4>
                                <v-text-field
                                    required
                                    v-validate="'required:false|numeric'"
                                    :error-messages="errors.collect('amount')"
                                    id="testing1"
                                    name="amount"
                                    label="Amount"
                                    v-model="form.amount"
                                ></v-text-field>
                            </v-flex>

                            <v-flex xs12 sm4>
                                <v-text-field
                                    required
                                    v-validate="'required:false|numeric'"
                                    :error-messages="errors.collect('percentage')"
                                    id="testing2"
                                    name="percentage"
                                    label="Percentage"
                                    v-model="form.percentage"
                                ></v-text-field>
                            </v-flex>

                            <v-flex xs12 sm4>
                                <v-text-field
                                    required
                                    v-validate="'required:false|numeric'"
                                    :error-messages="errors.collect('duration')"
                                    id="testing3"
                                    name="duration"
                                    label="Duration"
                                    v-model="form.duration"
                                ></v-text-field>
                            </v-flex>
                        </v-layout>
                    </v-container>
                    </v-form>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                            <v-btn round  color="primary" class="white--text" @click="submit">
                                <v-icon >add</v-icon>
                            </v-btn>
                    </v-card-actions>
                </v-card>
            </v-flex>
        </v-layout>
    </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
    $_veeValidate: {
      validator: 'new'
    },
    data() {
        return {
            form: {
                amount: '',
                percentage: '',
                duration: '',
            }
        }
    },
    methods: {
        ...mapActions({
            setNewItem: 'setNewItem'
        }),
        submit() {
            this.$validator.validateAll()
            this.$nextTick(() => {
                if (!this.errors.any()) {
                    let obj = {
                        month: new Date().getMonth() + 1,
                        amount: +this.form.amount,
                        currentSumm: '',
                        totalSumm: '',
                        addSumm: '',
                        percentage: +this.form.percentage,
                        duration: +this.form.duration,
                    }
                    this.setNewItem(obj);
                    this.$validator.reset();
                    this.$emit('snackEmit', {
                        text: 'The item was added!',
                    })
                } else {
                    this.$emit('snackEmit', {
                        text: 'OOPS! Some error!',
                    })
                    console.log('ERR ');
                }
            });
        },
        addData(){

        }
    }
}
</script>
