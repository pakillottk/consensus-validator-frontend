import RemoveEntityButton from '../RemoveEntityButton'
import { crud } from '../../../redux/actions/sessions'

export default RemoveEntityButton( crud.delete )