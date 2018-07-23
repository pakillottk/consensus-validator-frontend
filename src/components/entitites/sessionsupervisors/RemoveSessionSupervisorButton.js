import RemoveEntityButton from '../RemoveEntityButton'
import { crud } from '../../../redux/actions/sessionsupervisors'

export default RemoveEntityButton( crud.delete )