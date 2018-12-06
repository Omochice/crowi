const utils = require('../utils.js')

describe('Notification', () => {
  const Notification = utils.models.Notification
  const mongoose = utils.mongoose
  const ObjectId = mongoose.Types.ObjectId

  describe('.upsertByActivity', () => {
    describe('valid parameters', () => {
      it('should create', () => {
        const userId1 = ObjectId()
        const userId2 = ObjectId()
        const targetId = ObjectId()
        const activity = { _id: ObjectId(), user: userId1, targetModel: 'Page', target: targetId, action: 'COMMENT' }
        return Notification.upsertByActivity(userId2, activity)
          .then(notification => {
            expect(notification.user.toString()).toBe(userId2.toString())
            expect(notification.targetModel).toBe('Page')
            expect(notification.target.toString()).toBe(targetId.toString())
            expect(notification.action).toBe('COMMENT')
            expect(notification.status).toBe(Notification.STATUS_UNREAD)
            expect(notification.activities).toHaveLength(1)
          })
          .catch(err => {
            throw new Error(err)
          })
      })
    })

    describe('invalid parameters', () => {
      it('should create', () => {
        const user = ObjectId()
        const activity = {
          user: ObjectId(),
          targetModel: 'Page2', // invalid
          target: ObjectId(),
          action: 'COMMENT',
        }

        return Notification.upsertByActivity(user, activity)
          .then(() => {
            throw new Error('validation not work')
          })
          .catch(err => {
            expect(err.message).toBe('Validation failed')
          })
      })
    })

    describe('A week later', () => {
      const user = ObjectId()
      const target = ObjectId()

      beforeEach(async () => {
        await Notification.remove({})
        const activity = { _id: ObjectId(), user: ObjectId(), targetModel: 'Page', target, action: 'COMMENT' }
        await Notification.upsertByActivity(user, activity, new Date(2018, 10, 10).getTime())
      })

      it('is 1', async () => {
        const activity = { _id: ObjectId(), user: ObjectId(), targetModel: 'Page', target, action: 'COMMENT' }
        await Notification.upsertByActivity(user, activity, new Date(2018, 10, 16).getTime())
        const count = await Notification.count({})
        expect(count).toBe(1)
      })

      it('is 2', async () => {
        const activity = { _id: ObjectId(), user: ObjectId(), targetModel: 'Page', target, action: 'COMMENT' }
        await Notification.upsertByActivity(user, activity, new Date(2018, 10, 17).getTime())
        const count = await Notification.count({})
        expect(count).toBe(2)
      })
    })
  })

  describe('.read', () => {
    const user = ObjectId()
    let notificationId

    beforeAll(async () => {
      await Notification.remove({})
      const activity = { _id: ObjectId(), user: ObjectId(), targetModel: 'Page', target: ObjectId(), action: 'COMMENT' }
      const notification = await Notification.upsertByActivity(user, activity)
      notificationId = notification._id
    })

    it('status is changed correctly', async () => {
      const result = await Notification.read(user)
      expect(result).toEqual({ n: 1, nModified: 1, ok: 1 })
    })
  })

  describe('.open', () => {
    const user = ObjectId()
    let notificationId

    beforeAll(async () => {
      await Notification.remove({})
      const activity = { _id: ObjectId(), user: ObjectId(), targetModel: 'Page', target: ObjectId(), action: 'COMMENT' }
      const notification = await Notification.upsertByActivity(user, activity)
      notificationId = notification._id
    })

    it('status is changed correctly', async () => {
      const notification = await Notification.open({ _id: user }, notificationId)
      expect(notification.status).toBe(Notification.STATUS_OPENED)
    })
  })

  describe('.getUnreadCountByUser', () => {
    const user = ObjectId()

    describe('initially', () => {
      beforeAll(async () => {
        await Notification.remove({})
      })

      it('is zero', async () => {
        const count = await Notification.getUnreadCountByUser(user)
        expect(count).toBe(0)
      })
    })

    describe('after created', () => {
      beforeAll(async () => {
        const activity = { _id: ObjectId(), user: ObjectId(), targetModel: 'Page', target: ObjectId(), action: 'COMMENT' }
        await Notification.upsertByActivity(user, activity)
      })

      it('is count correctly', async () => {
        const count = await Notification.getUnreadCountByUser(user)
        expect(count).toBe(1)
      })
    })
  })
})