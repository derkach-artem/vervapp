<template>
  <v-app>
    <v-navigation-drawer
      fixed
      v-model="drawer"
      app
    >
      <v-list>
        <v-subheader>Tabs</v-subheader>
        <v-list-tile :style="{'cursor': 'pointer'}"
          v-for="(item, i) in getAllTabs"
          :key="i"
        >
          <v-list-tile-content
            @click="_changeTab(item)"
            :class="item.isCurrent ? 'red--text': false "
            >
            <v-list-tile-title v-text="item.name"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar fixed app color="primary">
      <v-toolbar-side-icon class="white--text" @click.stop="drawer = !drawer"></v-toolbar-side-icon>

      <v-tooltip bottom>
        <v-btn icon class="white--text" slot="activator" @click="dialog = true">
          <v-icon>tab</v-icon>
        </v-btn>
        <span>Add new Tab</span>
      </v-tooltip>

      <v-spacer></v-spacer>
      <img src="/public/header-logo.png" alt="Vuetify.js" class="" />
    </v-toolbar>
    <v-content>
      <v-container fluid grid-list-lg>
        <Form
          v-on:snackEmit='snackBarEmit($event)'
        ></Form>
        <Table
        ></Table>
      </v-container>
    </v-content>
    <v-footer :fixed="fixed" app>
      <v-container fluid>
        <span>DERKACH ARTEM 2018</span>
      </v-container>
    </v-footer>
      <v-layout row justify-center>
      <v-dialog v-model="dialog" persistent max-width="330">
        <v-card>
          <v-card-title class="headline">Create new Tab</v-card-title>
          <v-card-text>
            <v-text-field
              required
              v-validate="'required'"
              :error-messages="errors.collect('tabName')"
              name="tabName"
              label="Tab name"
              v-model="newTabsName"
            ></v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn round outline color="primary" flat @click.native="saveNewTab">Save</v-btn>
            <v-btn round outline color="red" flat @click.native="cancel">cancel</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-snackbar
        :timeout="1500"
        :bottom="true"
        v-model="snackbar"
        >
        {{ snackbarText }}
        <v-btn flat color="pink" @click.native="snackbar = false">Close</v-btn>
      </v-snackbar>
    </v-layout>
  </v-app>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Form from "./components/Form";
import Table from "./components/Table";
  export default {
    $_veeValidate: {
      validator: 'new'
    },
    created() {
      this.loadTabs();
    },
    data () {
      return {
        snackbar: false,
        snackbarText: '',
        newTabsName: '',
        dialog: false,
        drawer: false,
        fixed: false,
        items: [
          { icon: 'bubble_chart', title: 'Inspire' },
          { icon: 'star', title: 'Inspire' }
        ],
        title: 'VERV APP',
        tabs: '',
        currentTab: '',
      }
    },
    methods: {
      ...mapActions({
        setTabs: 'setTabs',
        setCurrentTab: 'setCurrentTab',
        setNewTab: 'setNewTab',
      }),
      _changeTab(data) {
        data.isCurrent = true;
        this.setCurrentTab(data);
        
        let allTabs = [];
        allTabs.splice(0, 0, ...this.getAllTabs);
        allTabs.forEach((item) => {
          item.name == data.name ? item.isCurrent = true : item.isCurrent = false;
        })
        this.setTabs(allTabs);
        this.drawer = false;
        this.snackbarText = 'Tab was changed';
        this.snackbar = true;
      },
      snackBarEmit(evt) {
        this.snackbarText = evt.text;
        this.snackbar = true;
      },
      loadTabs() {
        this.tabs = JSON.parse(localStorage.getItem('tables'));
        if (this.tabs) {
          this.findCurrentTab();
        }
        this.tabs ? this.setTabs(this.tabs) : this.createNewTab();
      },
      checkEmptyData() {
        return localStorage.getItem('tables') ? true : false;
      },
      createNewTab() {
        let tab = [{
          name: 'First tab',
          isCurrent: true,
          tabItems: [],
        }];
        localStorage.setItem('tables', JSON.stringify(tab));
        this.tabs = tab;
        this.setTabs(this.tabs);
        this.setCurrentTab(tab[0]);
      },
      findCurrentTab() {
        this.currentTab = this.tabs.find((tab) => {
          return tab.isCurrent === true ? tab : false;
        });
        if (this.currentTab) {
          this.setCurrentTab(this.currentTab);
        } else {
          console.error('[ERROR - CAN NOT FIND CURRENT TAB]');
        }
      },
      saveNewTab() {
        this.$validator.validateAll();
        this.$nextTick(() => {
          if (!this.errors.any()) {
            let tempTab = Object.assign({}, this.getCuttentTab);
            tempTab.name = this.newTabsName;
            tempTab.isCurrent = false;
            this.setNewTab(tempTab);
            localStorage.setItem('tables', JSON.stringify(this.getAllTabs));
            this.newTabsName = '';
            this.$validator.reset();
            this.dialog = false;
            this.snackBarEmit({text: 'New tab was created'});
          } else {
            console.error('[ERROR VALIDATE]');
          }
        })
      },
      cancel() {
        this.newTabsName = '';
        this.dialog = false;
      }
    },
    computed: {
      ...mapGetters({
        getAllTabs: 'getAllTabs',
        getCuttentTab: 'getCuttentTab'
      })
    },
    components: {
      Form,
      Table
    }
  }
</script>