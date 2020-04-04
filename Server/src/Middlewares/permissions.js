import authRequired from './auth'

export default {
    Query: {
        user: authRequired,
        report: authRequired,
        reports: authRequired,
        closings: authRequired
    },
    Mutation: {
        updateUser: authRequired,
        updatePassword: authRequired,
        upsertAccount: authRequired,
        deleteAccount: authRequired,
        setActive: authRequired,
        addNow: authRequired,
        upsertReport: authRequired,
        deleteReport: authRequired,
        createClosing: authRequired
    }
}
