<template>
    <div class="home-view-page user-log">
        <div class="home-view-title">
            <div class="page-title">用户日志</div>
        </div>
       
        <div class="user-main">
            <div class="user-header">
                <el-button size="small" type="success" @click="UpDateInfo()">UpDate</el-button>
                <div style="margin-left:20px">
                    <span>时间筛选：</span>
                    <el-date-picker
                        v-model="time_values"
                        type="datetimerange"
                        start-placeholder="Start Date"
                        end-placeholder="End Date"
                        :default-time="defaultTime"
                        size="small"
                    />
                </div>
            </div>
            <el-table :data="filterTableData" style="width: 100%">
                <el-table-column label="用户名" prop="username" width="100" />
                <el-table-column label="ip" prop="ip" width="180" />
                <el-table-column label="登录状态" prop="status" width="150">
                    <template #default="scope">
                        {{scope.row.status?"登录成功":"登录失败"}}
                    </template>
                </el-table-column>
                <el-table-column label="失败理由" prop="fail_reason">
                    <template #default="scope">
                        {{scope.row.fail_reason?scope.row.fail_reason:"--"}}
                    </template>
                </el-table-column>
            </el-table>
        </div>

        <div class="user-bottom">
            <el-pagination 
                :v-model="currentPage"
                :page-size="pageSize"
                :total="total"
                layout="prev, pager, next" 
                @current-change="handleCurrentChange" 
            />
        </div>

    </div>
    
</template>

<script lang="js" setup>
    import { userLogGet } from "@/apis/userApis.js"
    import { computed, ref } from 'vue'
    import { ElMessage } from 'element-plus'
    import { DailyTimeFormat } from '@/utils/utils.js'
    
    const tableData = ref([]);

    const currentDate = new Date();
    // 获取当前日期时间的年份
    const currentYear = currentDate.getFullYear();
    const oneYearAgoYear = currentYear - 1;
    const oneYearAgoDate = new Date(oneYearAgoYear,
        currentDate.getMonth(), currentDate.getDate(), 
        currentDate.getHours(), currentDate.getMinutes(),
        currentDate.getSeconds()
    );
    const defaultTime  = [
        oneYearAgoDate,
        currentDate,
    ]
    const time_values = ref(defaultTime)

    // 分页逻辑
    const total = ref(1)
    const currentPage = ref(1)
    const pageSize = ref(10)

    const filterTableData = computed(() =>
        tableData.value
    )

    const getUserLogData = async () => {
        const params = {
            currentPage:currentPage.value,
            pageSize:pageSize.value,
            start_time: DailyTimeFormat(time_values.value[0]),
            end_time: DailyTimeFormat(time_values.value[1]),
        }
        const  { data, code, count } = await userLogGet(params)
        tableData.value = data
        total.value = count
        return code 
    }

    const UpDateInfo = async () =>{
        const code = await getUserLogData()
        if(code == 0) {
            ElMessage({
                message: '刷新成功',
                type: 'success',
            })
        }
    }
    const handleCurrentChange = (val) => {
        currentPage.value = val
        getUserLogData()
    }

    getUserLogData()

    
</script>
<style lang="scss">
.user-log{
    // padding: 10px;
    .user-main{
        padding: 15px;
    }
    .user-header{
        display: flex;
        align-items: center;
        padding-left: 15px;
        height: 40px;
    }
    .user-bottom{
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
}
</style>
