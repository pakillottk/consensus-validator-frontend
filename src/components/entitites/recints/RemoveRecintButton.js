import RemoveEntityButton from '../RemoveEntityButton'
import { crud } from '../../../redux/actions/recints'

export default RemoveEntityButton( crud.delete )