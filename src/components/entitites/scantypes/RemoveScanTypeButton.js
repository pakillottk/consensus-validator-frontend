import RemoveEntityButton from '../RemoveEntityButton'
import { crud } from '../../../redux/actions/scantypes'

export default RemoveEntityButton( crud.delete )