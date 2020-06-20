const functions = require('firebase-functions')
const admin = require('firebase-admin')
const algoliasearch = require('algoliasearch')
admin.initializeApp()

const db = admin.firestore()
const auth = admin.auth()

const ALGOLIA_INDEX_NAME = 'Users_dev'
const ALGOLIA_ID = functions.config().algolia.appid;
const ALGOLIA_ADMIN_KEY = functions.config().algolia.apikey
const ALGOLIA_SEARCH_KEY = functions.config().algolia.searchkey

const client = algoliasearch(ALGOLIA_ID, ALGOLIA_ADMIN_KEY)



// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!")
// });

const K_init = (elo) => {
  // + K = 25 dành cho kỳ thủ mới có cường số dưới 1600
  if (elo < 1600) return 25

  // + K = 20 dành cho kỳ thủ mới có cường số dưới 2000
  if (elo < 2000) return 20

  // + K = 15 dành cho kỳ thủ có cường số dưới 2400.
  if (elo < 2400) return 15

  // + K = 10 dành cho kỳ thủ có cường số trên 2400
  if (elo >= 2400) return 10
}

exports.onUserCreated = functions.firestore
  .document('users/{userId}')
  .onCreate((snap, context) => {
    const user = snap.data();

    user.objectID = context.params.userId;

    const index = client.initIndex(ALGOLIA_INDEX_NAME);
    return index.saveObject(user);
  })

exports.onDeleteUser = functions.auth
  .user()
  .onDelete((user) => {
    console.log(`💔${user.uid}`)
    db.collection('users').doc(user.uid).delete()
  })

exports.onCreateHistoryMatch = functions.firestore
  .document('historyMatches/{matchID}')
  .onCreate((snap, context) => {
    const matchData = snap.data()
    const { users, winner } = matchData
    const user0Ref = db.collection('users').doc(users[0])
    const user1Ref = db.collection('users').doc(users[1])
    const matchRef = db.collection('historyMatches').doc(snap.id)
    db.runTransaction((transaction) => {
      return Promise.all([transaction.get(user0Ref), transaction.get(user1Ref)])
        .then(([user0, user1]) => {
          console.log('📖Historing')
          if (user0.exists && user1.exists) {
            let ELO = [user0.data().elo, user1.data().elo]
            const oldELO = [...ELO]
            let K = ELO.map(elo => K_init(elo))

            const q = [10 ** (ELO[0] / 400), 10 ** (ELO[1] / 400)]
            const E = [q[0] / (q[0] + q[1]), q[1] / (q[0] + q[1])]
            const loser = 1 - winner

            ELO[winner] = Math.floor(ELO[winner] + K[winner] * (1 - E[winner]))
            ELO[loser] = Math.floor(ELO[loser] + K[loser] * (0 - E[loser]))

            const points = oldELO.map((u, i) => - u + ELO[i])

            transaction.update(user0Ref, { elo: ELO[0], matches: user0.data().matches + 1, wins: winner === 0 ? user0.data().wins + 1 : user0.data().wins })
            transaction.update(user1Ref, { elo: ELO[1], matches: user1.data().matches + 1, wins: winner === 1 ? user1.data().wins + 1 : user1.data().wins })
            transaction.update(matchRef, { points: points })
            return { ELO, users }
          }

          return Error('Users are not existed!')
        })
    })
  })

exports.orderRanks = functions.https.onCall((data, context) => {
  const allUsersRef = db.collection('users').orderBy('elo', 'desc')
  return db.runTransaction((transaction) => {
    return transaction.get(allUsersRef)
      .then((users) => {
        let index = 1
        console.log('🏆Ranking')
        users.forEach(function (userDoc) {
          transaction.update(userDoc.ref, { rank: index })
          console.log(`${userDoc.id}\t\t${index}`)
          // increasing index
          index += 1
        })
        return true
      })
  })
})

exports.deleteAllUsers = functions.https.onCall(async (data, context) => {
  const usersList = await auth.listUsers()
  const usersUID = []
  usersList.users.forEach(u => usersUID.push(u.uid))
  console.log(usersUID);


  // admin.auth().deleteUsers(usersUID)
  //   .then(function (deleteUsersResult) {
  //     console.log('Successfully deleted ' + deleteUsersResult.successCount + ' users');
  //     console.log('Failed to delete ' + deleteUsersResult.failureCount + ' users');
  //     deleteUsersResult.errors.forEach(function (err) {
  //       console.log(err.error.toJSON());
  //     });
  //     return
  //   })
  //   .catch(function (error) {
  //     console.log('Error deleting users:', error);
  //   });
})
