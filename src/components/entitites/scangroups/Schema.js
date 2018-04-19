const schema = [
    {
        name: 'group',
        label: 'GRUPO',
        defaultValue: '',
        type: 'input',
        tooltip:'Para que un escáner pueda acceder a la sesión, debe pertenecer a un grupo. El grupo'+ 
        ' tendrá asociado unos tipos de entrada. El escáner solo podrá trabajar con los tipo de su grupo.'
    },
    {
        name: 'session_id',
        label: '',
        type: 'input',
    },
]
export default schema