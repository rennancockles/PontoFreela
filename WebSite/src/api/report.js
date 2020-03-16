import $http from '@/config/http'

export default {
    upsert: ({ id, date, obs, times }) => {
        return $http.post('', {
            query: `
                mutation ($report: ReportInput!) {
                    report: upsertReport (report: $report) {
                        id,
                        date,
                        obs,
                        times
                    }
                }
            `,
            variables: {
                report: {
                    id,
                    date,
                    obs,
                    times
                }
            }
        })
    }
}
