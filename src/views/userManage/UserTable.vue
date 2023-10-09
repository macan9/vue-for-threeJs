<template>
    <div class="home-view-page user-table">

        <div class="user-header">
            <el-button size="small" type="success" @click="handleAdd(scope.$index, scope.row)">Add</el-button>
        </div>

        <div class="user-main">
            <el-table :data="filterTableData" style="width: 100%">
                <el-table-column label="用户名" prop="username" />
                <el-table-column label="昵称" prop="nickname" />
                <el-table-column label="邮箱" prop="email" />
                <el-table-column label="手机号" prop="mobile" />
                <el-table-column label="性别" prop="sex" />
                <el-table-column label="个性签名" prop="description" />
                <el-table-column align="right">
                    <template #header>
                        <el-input v-model="search" size="small" placeholder="输入用户名过滤" />
                    </template>
                    <template #default="scope">
                        <el-button size="small" @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
                        <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">Delete
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>

        <div class="user-bottom"></div>
        
    </div>
    
</template>

<script lang="js" setup>
    import { userListGet } from "@/apis/userApis.js"
    import { computed, ref } from 'vue'


    const search = ref('')
    const filterTableData = computed(() =>
        tableData.value.filter(
            (data) =>
                !search.value ||
                data.username.toLowerCase().includes(search.value.toLowerCase())
        )
    )

    const getUserData = async () => {
        const  { data } = await userListGet()
        tableData.value = data
    }
    const tableData = ref([]);
    getUserData()

    const handleEdit = (index, row) => {
        console.log(index, row)
    }
    const handleDelete = (index, row) => {
        console.log(index, row)
    }

    
</script>
<style lang="scss">
.user-table{
    padding: 10px;
}
</style>
