import RemoveEntityButton from '../RemoveEntityButton'
import { crud } from '../../../redux/actions/companies'

export default RemoveEntityButton( crud.delete )