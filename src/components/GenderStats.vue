<template>
  <div>
    <el-row type="flex" align="middle">
        <el-col :span="8" :offset="8" class="">
          <div class="gender-heading male-stat text-center"><i class="el-icon-male"></i> MALE</div>
        </el-col>
        <el-col :span="8" class="">
          <div class="gender-heading female-stat text-center"><i class="el-icon-female"></i> FEMALE</div>
        </el-col>
    </el-row>
    <el-row type="flex" align="middle" class="mt-10">
        <el-col :span="8" class="">
          <div class="stat-info text-warning info-heading">CONFIRMED</div>
        </el-col>
        <el-col :span="8" class="text-center">
          <div class="stat-info text-warning">{{ confirmedPercentage.male }}%</div>
        </el-col>
        <el-col :span="8" class="text-center">
          <div class="stat-info text-warning">{{ confirmedPercentage.female }}%</div>
        </el-col>
    </el-row>
    <el-row type="flex" align="middle">
        <el-col :span="8" class="">
          <div class="stat-info info-heading text-success">RECOVERED</div>
        </el-col>
        <el-col :span="8" class="text-center">
          <div class="stat-info text-success">{{ recoveredPercentage.male }}%</div>
        </el-col>
        <el-col :span="8" class="text-center">
          <div class="stat-info text-success">{{ recoveredPercentage.female }}%</div>
        </el-col>
    </el-row>
    <el-row type="flex" align="middle">
        <el-col :span="8" class="">
          <div class="stat-info info-heading text-info">DEATHS</div>
        </el-col>
        <el-col :span="8" class="text-center">
          <div class="stat-info text-info">{{ deceasedPercentage.male }}%</div>
        </el-col>
        <el-col :span="8" class="text-center">
          <div class="stat-info text-info">{{ deceasedPercentage.female }}%</div>
        </el-col>
    </el-row>
    <el-row type="flex" align="middle">
        <el-col :span="8" class="">
          <div class="stat-info info-heading text-info">AVERAGE AGE</div>
        </el-col>
        <el-col :span="8" class="text-center">
          <div class="stat-info text-info">{{ averageAge.male }} yrs</div>
        </el-col>
        <el-col :span="8" class="text-center">
          <div class="stat-info text-info">{{ averageAge.female }} yrs</div>
        </el-col>
    </el-row>
  </div>
</template>

<script>
import store from "../store";

export default {
  name: "GenderStats",
  computed: {
    patientData() {
      return store.getters.getPatientData;
    },
    femalePatients() {
      return this.patientData.filter(({ gender }) => gender === 'female');
    },
    malePatients() {
      return this.patientData.filter(({ gender }) => gender === 'male');
    },
    confirmedPercentage() {
      const totalPatients = this.patientData.length;
      return {
          male: Math.round(this.malePatients.length*100/totalPatients),
          female: Math.round(this.femalePatients.length*100/totalPatients),
      }
    },
    recoveredPercentage() {
      const totalPatients = this.patientData.length;
      const maleCount = this.malePatients.map(({status}) => status === 'Recovered').filter(Boolean).length;
      const femaleCount = this.femalePatients.map(({status}) => status === 'Recovered').filter(Boolean).length;
      return {
          male: Math.round(maleCount*100/totalPatients),
          female: Math.round(femaleCount*100/totalPatients),
      }
    },
    deceasedPercentage() {
      const totalPatients = this.patientData.length;
      const maleCount = this.malePatients.map(({status}) => status === 'Deceased').filter(Boolean).length;
      const femaleCount = this.femalePatients.map(({status}) => status === 'Deceased').filter(Boolean).length;
      return {
          male: Math.round(maleCount*100/totalPatients),
          female: Math.round(femaleCount*100/totalPatients),
      }
    },
    averageAge() {
      const maleAges = this.malePatients.map(({ageEstimate}) => +ageEstimate).filter(Boolean);
      const femaleAges = this.femalePatients.map(({ageEstimate}) => +ageEstimate).filter(Boolean);
      return {
          male: this.getAverage(maleAges),
          female: this.getAverage(femaleAges),
      }
    },
  },
  data() {
    return {
    }
  },
  methods: {
    getAverage(array) {
      let sum = 0;
      array.forEach(element => {
        sum += +element;
      });
      return Math.round(sum/array.length);
    }
  }
};
</script>

<style scoped lang="less">
  .gender-heading {
    font-size: 0.7em;
  }
  .el-icon-male, .el-icon-female {
    font-size: 1.2em;
  }
  .male-stat {
    color: #228FD6;
  }
  .female-stat {
    color: #D168B9;
  }
  .stat-info {
    font-size: 0.7em;
  }
  .info-heading {
    font-size: 0.5em;
  }
</style>
