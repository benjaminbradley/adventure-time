const userDef = {
    label: 'User',
    id_field: 'user_id',
    fields: [
        {
            id: 'user_id',
            label: 'ID',
            table_display: true
        },
        {
            id: 'email_address',
            label: 'Email',
            html_input_type: 'email',
            table_display: true
        },
        {
            id: 'password',
            label: 'Password',
            html_input_type: 'password',
            table_display: false
        }
    ],
    endpoints: {
        getMultipleByQuery: '/users',
        create: '/users'
    }
};
export default userDef;
