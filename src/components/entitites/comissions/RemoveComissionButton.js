import RemoveEntityButton from '../RemoveEntityButton'
import { crud } from '../../../redux/actions/comissions'

export default RemoveEntityButton( crud.delete )