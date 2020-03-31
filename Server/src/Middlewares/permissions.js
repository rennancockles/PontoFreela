import authRequired from './auth'

export default {
    Query: {
        user: authRequired,
        report: authRequired,
        reports: authRequired
    },
    Mutation: {
        updateUser: authRequired,
        upsertAccount: authRequired,
        deleteAccount: authRequired,
        setActive: authRequired,
        addNow: authRequired,
        upsertReport: authRequired,
        deleteReport: authRequired
    }
}
