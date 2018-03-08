import RemoveEntityButton from '../RemoveEntityButton'
import { crud } from '../../../redux/actions/deliveries'

export default RemoveEntityButton( crud.delete )