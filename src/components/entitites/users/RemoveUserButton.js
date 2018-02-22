import RemoveEntityButton from '../RemoveEntityButton'
import { crud } from '../../../redux/actions/users'

export default RemoveEntityButton( crud.delete )