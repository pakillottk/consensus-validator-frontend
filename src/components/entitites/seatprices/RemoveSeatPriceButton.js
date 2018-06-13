import RemoveEntityButton from '../RemoveEntityButton'
import { crud } from '../../../redux/actions/seatprices'

export default RemoveEntityButton( crud.delete )