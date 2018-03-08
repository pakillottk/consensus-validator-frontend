import RemoveEntityButton from '../RemoveEntityButton'
import { crud } from '../../../redux/actions/scangroups'

export default RemoveEntityButton( crud.delete )