export const menu_left_config = [
    {
        pid: '1',
        children: [
            {
                label: "我的主页",
                value: '1-1',
                path: "/blogMain",
                icon: "House",
                children:[
                    {
                        label: "我的简历",
                        value: '1-1-1',
                        path: "/blogMain",
                        icon: "House"
                    },{
                        label: "我的博客",
                        value: '1-1-2',
                        path: "/UserEdit",
                        icon: "House"
                    }
                ]
            },{
                label: "用户管理",
                value: '1-2',
                path: "/userTable",
                icon: "House"
            },
        ] 
    },{
        pid: '2',
        children: [
            {
                label: "地图展示",
                value: '2-1',
                path: "/LeafletMap",
                icon: "House"
            },{
                label: "点位添加",
                value: '2-2',
                path: "/UserEdit",
                icon: "House"
            }
        ] 
    },{
        pid: '3',
        children: [
            {
                label: "场景演示",
                value: '3-1',
                path: "/ThreeGuiBase",
                icon: "House"
            },{
                label: "行星示例",
                value: '3-2',
                path: "/ThreePlanet",
                icon: "House"
            },
        ] 
    },{
        pid: "4",
        children: [
            {
                label: "博客管理",
                value: "4-1",
                path: "/blogMain",
                icon: "House"
            }
        ] 
    },{
        pid: "5",
        children: [
            {
                label: "用户简历",
                value: "5-1",
                path: "/UserEdit",
                icon: "House"
            },
        ] 
    },{
        pid: "6",
        children: [
            {
                label: "聊天房间",
                value: "6-1",
                path: "/blogMain",
                icon: "House"
            }
        ] 
    },{
        pid: "7",
        children: [
            {
                label: "烟花",
                value: "7-1",
                path: "/UserEdit",
                icon: "House"
            },{
                label: "转盘",
                value: "8-1",
                path: "/UserEdit",
                icon: "House"
            },
        ] 
    }
]
    
