import UserSelector from '../../forms/Controls/UserSelector/UserSelector'
const schema = [
    {
        name: 'session_id',
        label:'SESION',
        component:'input',
        type:'hidden'
    },
    {
        name:'user_id',
        label:'USUARIO',
        component:UserSelector
    },
    {
        name:'user',
        label:'USUARIO',
        displayFormat: ( user ) => {
            return user.username
        }
    }
]
export default schema