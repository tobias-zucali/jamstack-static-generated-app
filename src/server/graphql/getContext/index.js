import db from 'server/fakeDatabase'


export default function getContext(/* request */) {
  return {
    db,
  }
}
