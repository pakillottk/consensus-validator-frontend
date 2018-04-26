import RemoveEntityButton from '../RemoveEntityButton'
import { crud } from '../../../redux/actions/payments'

export default RemoveEntityButton( crud.delete )