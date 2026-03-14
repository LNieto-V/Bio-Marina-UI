import gql from 'graphql-tag'

export const GENERATE_REPORT_MUTATION = gql`
  mutation GenerateReport($input: ReportGenerationInput!) {
    generateReport(input: $input) {
      success
      reportUrl
      downloadSize
      generatedAt
    }
  }
`

export const GET_RECENT_REPORTS = gql`
  query GetRecentReports($limit: Int) {
    recentReports(limit: $limit) {
      id
      title
      format
      size
      createdAt
      downloadUrl
    }
  }
`
