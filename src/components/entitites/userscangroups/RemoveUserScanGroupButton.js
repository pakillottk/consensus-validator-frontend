import RemoveEntityButton from '../RemoveEntityButton'
import { crud } from '../../../redux/actions/userscangroups'

export default RemoveEntityButton( crud.delete )