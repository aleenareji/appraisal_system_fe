let data = [
    {
        department:"Delivery", deptId:1,
            roles:{
                roleId:2, position:"Software Engineer",
                 levels:{
                    levelId:3, grade:"L1",
                     questions:[
                         { questionId:1, title:"What programming languages have you used in the past? What are your top two programming languages?",name:"What programming languages have you used in the past? What are your top two programming languages?",isRequired: true,},
                         {questionId:2, title:"How much are you coding on a daily basis? If you do not code on a daily basis, what is typical in your role?",name:"How much are you coding on a daily basis? If you do not code on a daily basis, what is typical in your role?",isRequired:true},
                         { questionId:3, title:"How comfortable are you in a startup environment, or do you prefer working in a more established company?",name:"How comfortable are you in a startup environment, or do you prefer working in a more established company?",isRequired:true},
                         { questionId:4, title:"What distinguishes a great software engineer from a good one? Do you feel you have those qualities?",name:"What distinguishes a great software engineer from a good one? Do you feel you have those qualities?",isRequired:true}
                        ]

                 }
            }},
            {
            department:"Business and Development", deptId:2,
            roles:{
                roleId:2, position:"BA",
                 levels:{
                    levelId:3, grade:"L4",
                    questions:[
                        { questionId:1, title:"How would you handle changes to the scope of a project if a client or manager wanted to add a major feature?",name:"How would you handle changes to the scope of a project if a client or manager wanted to add a major feature?",isRequired:true},
                        {questionId:2, title:"How would you update or improve a critical process that was initially formed around out-of-date technology?",name:"How would you update or improve a critical process that was initially formed around out-of-date technology?",isRequired:true},
                        { questionId:3, title:"Your team is falling behind an important project. How do you get them back on track?",name:"Your team is falling behind an important project. How do you get them back on track?",isRequired:true},
                        { questionId:4, title:"What software, tools and frameworks do you use to keep track of a project?",name:"What software, tools and frameworks do you use to keep track of a project?",isRequired:true},
                    ]
                 }
                }
            }
        ]
    export default data;