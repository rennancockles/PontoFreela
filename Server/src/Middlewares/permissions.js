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
        deleteReport: authRequired,
        setActive: authRequired,
        upsertReport: authRequired
    }
}
