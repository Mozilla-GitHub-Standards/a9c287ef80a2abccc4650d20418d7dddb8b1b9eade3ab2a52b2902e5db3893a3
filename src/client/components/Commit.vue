<template>
  <div class="container">
    <el-table
      :data="tableData"
      :default-sort="{prop: 'committerDate', order: 'descending'}"
      style="width: 100%"
    >
      <el-table-column type="expand">
        <template slot-scope="props">
          <p>Id: {{ props.row._id }}</p>
          <p>Hash: {{ props.row.hash }}</p>
          <p>Author: {{ props.row.authorEmail }}</p>
        </template>
      </el-table-column>

      <el-table-column prop="subject" label="Subject" width="400" sortable>
        <template slot-scope="scope">{{ scope.row.subject }}</template>
      </el-table-column>

      <el-table-column prop="committerDate" label="Date" width="250" sortable>
        <template slot-scope="scope">{{ scope.row.committerDate }}</template>
      </el-table-column>

      <el-table-column prop="files" label="Files" width="180" sortable>
        <template slot-scope="scope">{{ scope.row.files }}</template>
      </el-table-column>

      <el-table-column prop="status" label="Status" width="180" sortable>
        <template slot-scope="scope">{{ scope.row.status }}</template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
/** @format */

import axios from 'axios'

export default {
  name: 'Commit',
  props: ['auth', 'authenticated'],
  data() {
    return {
      tableData: [{}]
    }
  },
  methods: {},
  created() {
    axios
      .get(`/api/v1/repo/${this.$route.params.id}/${this.$route.params.commit}`, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Bearer ${this.auth.getUserAccessToken()}`
        }
      })
      .then(response => {
        this.tableData = response.data
      })
  }
}
</script>

<style>
/** @format */
</style>
