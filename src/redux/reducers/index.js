import auth from './auth'
import companies from './companies'
import roles from './roles'
import users from './users'
import sessions from './sessions'
import types from './types'
import codes from './codes'
import deliveries from './deliveries'
import sales from './sales'
import scangroups from './scangroups'
import scantypes from './scantypes'
import userscangroups from './userscangroups'
import logentries from './logentries'
import windows from './windows'
import csv from './csv'

const reducers = {
    auth,
    companies,
    roles,
    users,
    sessions,
    types,
    codes,
    deliveries,
    sales,
    scangroups,
    scantypes,
    userscangroups,
    logentries,
    windows,
    csv
}

export default reducers