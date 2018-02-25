users: [{
    id: "1231241343",
    expenses: ["/expenses/asdfkjh23314534a"]
}]

groups: [
    {
        id: "groupid",
        name: "Group name",
        users: [
            '/users/1231241343',
            '/users/9878970987'
        ]
    }
]


expenses: [
    {
        title: "Expense1",
        date: "2017-09-12",
        totalAmount: "1200.00",
        creator: '/users/1231241343',
        users: [
            {
                userRef: '/users/1231241343',
                payed: true
            },
            {
                userRef: '/users/9878970987',
                payed: false
            }
        ]
    }
]