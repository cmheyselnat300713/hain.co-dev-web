export function load({ url }) {
  return {
    no: url.searchParams.get('no'),
    agent: url.searchParams.get('agent'),
    description: url.searchParams.get('desc'),
    amount: url.searchParams.get('amount'),
    type: url.searchParams.get('type'),
    date: url.searchParams.get('date')
  }
}