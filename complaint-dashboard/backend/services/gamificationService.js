const User = require('../models/User');
const Badge = require('../models/Badge');
const Achievement = require('../models/Achievement');

class GamificationService {
  async checkBadgeAchievements(userId) {
    try {
      const user = await User.findById(userId);
      if (!user) return;

      const badges = await Badge.find({ isActive: true });

      for (const badge of badges) {
        if (user.badges.includes(badge.name)) continue; // Already earned

        let earned = false;
        switch (badge.criteria.type) {
          case 'complaints_submitted':
            earned = user.complaintsSubmitted >= badge.criteria.value;
            break;
          case 'complaints_resolved':
            earned = user.complaintsResolved >= badge.criteria.value;
            break;
          case 'points_earned':
            earned = user.points >= badge.criteria.value;
            break;
          case 'level_reached':
            earned = user.level >= badge.criteria.value;
            break;
        }

        if (earned) {
          user.badges.push(badge.name);
          user.points += badge.points || 0;
          await user.save();

          // Could emit event for real-time notification
          console.log(`User ${user.name} earned badge: ${badge.name}`);
        }
      }
    } catch (error) {
      console.error('Error checking badge achievements:', error);
    }
  }

  async checkAchievements(userId) {
    try {
      const user = await User.findById(userId);
      if (!user) return;

      const achievements = await Achievement.find({ isActive: true });

      for (const achievement of achievements) {
        if (user.achievements.includes(achievement.name)) continue;

        let earned = false;
        switch (achievement.criteria.type) {
          case 'first_complaint':
            earned = user.complaintsSubmitted >= 1;
            break;
          case 'complaints_submitted':
            earned = user.complaintsSubmitted >= achievement.criteria.value;
            break;
          case 'complaints_resolved':
            earned = user.complaintsResolved >= achievement.criteria.value;
            break;
          case 'points_earned':
            earned = user.points >= achievement.criteria.value;
            break;
        }

        if (earned) {
          user.achievements.push(achievement.name);
          user.points += achievement.reward.points || 0;
          if (achievement.reward.badge) {
            if (!user.badges.includes(achievement.reward.badge)) {
              user.badges.push(achievement.reward.badge);
            }
          }
          await user.save();

          console.log(`User ${user.name} unlocked achievement: ${achievement.name}`);
        }
      }
    } catch (error) {
      console.error('Error checking achievements:', error);
    }
  }

  async updateUserLevel(userId) {
    try {
      const user = await User.findById(userId);
      if (!user) return;

      // Simple leveling system: every 100 points = 1 level
      const newLevel = Math.floor(user.points / 100) + 1;

      if (newLevel > user.level) {
        user.level = newLevel;
        await user.save();

        // Check for level-based achievements
        await this.checkBadgeAchievements(userId);
        await this.checkAchievements(userId);

        console.log(`User ${user.name} reached level ${newLevel}`);
      }
    } catch (error) {
      console.error('Error updating user level:', error);
    }
  }

  async awardPoints(userId, points, reason) {
    try {
      const user = await User.findByIdAndUpdate(
        userId,
        { $inc: { points: points } },
        { new: true }
      );

      if (user) {
        await this.updateUserLevel(userId);
        console.log(`Awarded ${points} points to ${user.name} for: ${reason}`);
      }
    } catch (error) {
      console.error('Error awarding points:', error);
    }
  }

  async getLeaderboard(limit = 10) {
    try {
      return await User.find({ status: 'active' })
        .select('name points level badges complaintsSubmitted complaintsResolved')
        .sort({ points: -1, level: -1 })
        .limit(limit);
    } catch (error) {
      console.error('Error getting leaderboard:', error);
      return [];
    }
  }

  async getUserStats(userId) {
    try {
      const user = await User.findById(userId)
        .select('points level badges achievements complaintsSubmitted complaintsResolved');

      if (!user) return null;

      const rank = await User.countDocuments({
        points: { $gt: user.points },
        status: 'active'
      }) + 1;

      return {
        ...user.toObject(),
        rank,
        nextLevelPoints: (user.level) * 100,
        progressToNextLevel: user.points % 100
      };
    } catch (error) {
      console.error('Error getting user stats:', error);
      return null;
    }
  }
}

module.exports = new GamificationService();
