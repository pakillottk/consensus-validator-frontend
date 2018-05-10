import auth from './auth'
import companies from './companies'
import roles from './roles'
import users from './users'
import sessions from './sessions'
import types from './types'
import codes from './codes'
import deliveries from './deliveries'
import sales from './sales'
import payments from './payments'
import comissions from './comissions'
import scangroups from './scangroups'
import scantypes from './scantypes'
import userscangroups from './userscangroups'
import logentries from './logentries'
import windows from './windows'
import csv from './csv'
import imgcache from './imgcache'

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
    payments,
    comissions,
    scangroups,
    scantypes,
    userscangroups,
    logentries,
    windows,
    csv,
    imgcache
}

export default reducers