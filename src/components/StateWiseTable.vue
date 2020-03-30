<template>
  <div>
    <el-table
      :data="stateWiseData"
      max-height="640">
      <el-table-column type="expand">
        <template slot-scope="scope">
          <div v-for="(data, district) in scope.row.districtData" :key="district" class="district-info-list">
            <el-row :gutter="20" @click.native="showPatientDetails(scope.row.state, district, data.patients)">
              <el-col :span="8">
                {{district}}
              </el-col>
              <el-col :span="8">
                <span class="text-warning ml-20">{{ data.confirmed }}</span>
              </el-col>
            </el-row>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        width="150">
        <template slot="header">
          <div class="table-header text-left">State</div>
        </template>
        <template slot-scope="scope">
          <div class="state-count text-left bold wrap-word">{{ scope.row.state }}</div>
        </template>
      </el-table-column>
      <el-table-column>
        <template slot="header">
          <div class="table-header">Confirmed</div>
        </template>
        <template slot-scope="scope">
          <div class="state-count text-warning bold">{{ scope.row.confirmed }}</div>
        </template>
      </el-table-column>
      <el-table-column>
        <template slot="header">
          <div class="table-header">Active</div>
        </template>
        <template slot-scope="scope">
          <div class="state-count text-danger bold">{{ scope.row.active }}</div>
        </template>
      </el-table-column>
      <el-table-column>
        <template slot="header">
          <div class="table-header">Recovered</div>
        </template>
        <template slot-scope="scope">
          <div class="state-count text-success bold">{{ scope.row.recovered }}</div>
        </template>
      </el-table-column>
      <el-table-column>
        <template slot="header">
          <div class="table-header">Deaths</div>
        </template>
        <template slot-scope="scope">
          <div class="state-count text-info bold">{{ scope.row.deaths }}</div>
        </template>
      </el-table-column>
    </el-table>
    <!-- Pateints dialog -->
    <el-dialog
      :title="`Patients - ${dialogStateName}/${dialogDistrictName} (${dialogPatientsData.length})`"
      :visible.sync="patientsDialogVisibility">
      <el-table
        :data="dialogPatientsData"
        max-height="600"
        width="100%">
        <el-table-column label="Status" sortable prop="status">
          <template slot-scope="scope">
            <div class="patient-text text-success" v-if="scope.row.status === 'Recovered'">{{scope.row.status}}</div>
            <div class="patient-text text-warning" v-else-if="scope.row.status === 'Hospitalized'">{{scope.row.status}}</div>
            <div class="patient-text" v-else>{{scope.row.status}}</div>
          </template>
        </el-table-column>
        <el-table-column label="Age" sortable prop="ageEstimate" :sort-method="sortAge">
          <template slot-scope="scope">
            {{scope.row.ageEstimate?scope.row.ageEstimate:'-'}}
          </template>
        </el-table-column>
        <el-table-column label="Travel" width="150">
          <template slot-scope="scope">
            <div v-for="place in scope.row.travel" :key="place" class="patient-text">
              {{place}}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="Nationality" width="150">
          <template slot-scope="scope">
            <div v-for="country in scope.row.nationality" :key="country" class="patient-text text-warning">
              {{country}}
            </div>
            <div v-if="scope.row.nationality.length === 0" class="patient-text">
              Indian
            </div>
          </template>
        </el-table-column>
        <el-table-column label="Notes">
          <template slot-scope="scope">
            <div class="patient-text wrap-word">{{scope.row.notes}}</div>
          </template>
        </el-table-column>
        <el-table-column label="Sources">
          <template slot-scope="scope">
            <a v-for="source in scope.row.sources" :key="source" :href="source" target="_blank" class="patient-text">
              {{getURLHost(source)}}
            </a>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
  import store from "../store";
  import _ from 'lodash';

  export default {
    name: "StateWiseTable",
    data() {
      return {
        patientsDialogVisibility: false,
        dialogPatientsData: [],
        dialogStateName: '',
        dialogDistrictName: '',
      }
    },
    computed: {
      stateWiseData() {
        let stateWiseData = store.getters.getStateWiseData;
        const districtWiseData = store.getters.getDistrictWiseData;
        const patientData = store.getters.getPatientData;
        stateWiseData = stateWiseData.map( stateData => {
          stateData.districtData = districtWiseData[stateData.state]?.districtData;
          if (stateData.districtData) {
            Object.keys(stateData.districtData).map(dist => {
              stateData.districtData[dist].patients = patientData.filter(({district}) => district === dist);
            })
          }
          return stateData
        })
        return _.sortBy(stateWiseData,
          data => {
            return -+data.confirmed;
          }
        );
      },
    },
    methods: {
      showPatientDetails(state, district, patientsData) {
        this.dialogPatientsData = patientsData;
        this.dialogStateName = state;
        this.dialogDistrictName = district;
        this.patientsDialogVisibility = true;
      },
      getURLHost(url) {
        return new URL(url).hostname;
      },
      sortAge(row) {
        return -+row.ageEstimate;
      }
    }
  };
</script>

<style scoped lang="less">
  .state-heading {
    font-size: 1.4em;
  }
  .state-count {
    font-size: 1.1em;
    text-align: center;
  }
  .table-header {
    text-align: center;
    color: #333 !important;
  }
  .wrap-word {
    word-break: normal !important;
  }
  .district-info {
    font-weight: 600;
  }
  .district-info-list {
    font-weight: 600;
    padding: 0.5em 5em;
    background-color: #eee;
    cursor: pointer;
  }
  .district-info-list:hover {
    font-weight: 600;
    background-color: #ddd;
  }
  /deep/ .el-table__expanded-cell {
    background-color: #eee !important;
  }
  /deep/ .el-table__expanded-cell:hover {
    background-color: #eee !important;
  }
  /deep/ .gender-icon {
    font-size: 2em;
  }
  /deep/ .patient-text {
    font-size: 0.9em;
    font-weight: 600;
  }
</style>
