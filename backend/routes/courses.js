const express = require('express');
const router = express.Router();
const { inMemoryStore, coursesData } = require('../data/initialData');
const { getIsConnected } = require('../config/db');
const { authenticateToken, optionalAuth } = require('../middleware/auth');

// GET /api/courses — public catalog (hides lesson video URLs for non-free lessons)
router.get('/', optionalAuth, (req, res) => {
  try {
    const publicCourses = coursesData.map(course => ({
      id: course.id,
      title: course.title,
      tagline: course.tagline,
      badge: course.badge,
      category: course.category,
      level: course.level,
      duration: course.duration,
      totalLessons: course.totalLessons,
      totalHours: course.totalHours,
      rating: course.rating,
      ratingCount: course.ratingCount,
      instructor: course.instructor,
      summary: course.summary,
      learningOutcomes: course.learningOutcomes,
      prerequisites: course.prerequisites,
      // Show module structure and duration but not video URLs for locked lessons
      modules: course.modules.map(mod => ({
        id: mod.id,
        title: mod.title,
        duration: mod.duration,
        lessonCount: mod.lessons.length,
        lessons: mod.lessons.map(l => ({
          id: l.id,
          title: l.title,
          duration: l.duration,
          isFreePreview: l.isFreePreview,
          description: l.isFreePreview ? l.description : '🔒 Enroll to unlock this lesson'
        }))
      }))
    }));

    res.json({ success: true, data: publicCourses });
  } catch (err) {
    console.error('[Courses/List]', err);
    res.status(500).json({ success: false, message: 'Failed to load courses.' });
  }
});

// GET /api/courses/:id — PROTECTED: full lesson content for authorized users
router.get('/:id', authenticateToken, (req, res) => {
  try {
    const courseId = req.params.id;
    const course = coursesData.find(c => c.id === courseId);

    if (!course) {
      return res.status(404).json({ success: false, message: 'Course not found.' });
    }

    // Get user's progress for this course
    const user = req.user;
    const enrollment = (user.enrolledCourses || []).find(e => e.courseId === courseId);

    // All enrolled users or admins get full course content
    // For this LMS, registration = enrollment (all registered users can access all courses)
    const completedLessons = enrollment ? enrollment.completedLessons : [];
    const progress = enrollment ? enrollment.progress : 0;
    const lastAccessedLesson = enrollment ? enrollment.lastAccessedLesson : null;

    res.json({
      success: true,
      data: course,
      userProgress: {
        enrolled: true,
        progress,
        completedLessons,
        lastAccessedLesson,
        isCompleted: enrollment ? enrollment.isCompleted : false
      }
    });
  } catch (err) {
    console.error('[Courses/Detail]', err);
    res.status(500).json({ success: false, message: 'Failed to load course content.' });
  }
});

// POST /api/courses/:id/progress — update lesson progress
router.post('/:id/progress', authenticateToken, (req, res) => {
  try {
    const { lessonId } = req.body;
    const courseId = req.params.id;
    const user = req.user;

    const course = coursesData.find(c => c.id === courseId);
    if (!course) return res.status(404).json({ success: false, message: 'Course not found.' });

    // Work with in-memory store for simplicity
    const storeUser = inMemoryStore.users.find(u =>
      (u.id === (user.id || user._id?.toString())) ||
      (u._id === (user.id || user._id?.toString())) ||
      (u.email === user.email)
    );

    if (storeUser) {
      let enrollment = storeUser.enrolledCourses.find(e => e.courseId === courseId);
      if (!enrollment) {
        enrollment = { courseId, enrolledAt: new Date(), progress: 0, completedLessons: [], lastAccessedLesson: '', isCompleted: false };
        storeUser.enrolledCourses.push(enrollment);
      }

      if (lessonId && !enrollment.completedLessons.includes(lessonId)) {
        enrollment.completedLessons.push(lessonId);
        enrollment.lastAccessedLesson = lessonId;
      }

      // Calculate total lessons
      const totalLessons = course.modules.reduce((sum, mod) => sum + mod.lessons.length, 0);
      enrollment.progress = Math.round((enrollment.completedLessons.length / totalLessons) * 100);

      if (enrollment.progress >= 100) {
        enrollment.isCompleted = true;
        enrollment.completedAt = new Date();
      }

      const progressData = {
        enrolled: true,
        progress: enrollment.progress,
        completedLessons: enrollment.completedLessons,
        lastAccessedLesson: enrollment.lastAccessedLesson,
        isCompleted: enrollment.isCompleted
      };

      return res.json({
        success: true,
        message: 'Progress saved! Keep going 🚀',
        data: progressData,
        progress: enrollment.progress,
        completedLessons: enrollment.completedLessons,
        isCompleted: enrollment.isCompleted
      });
    }

    res.json({ 
      success: true, 
      message: 'Progress noted.', 
      data: { enrolled: false, progress: 0, completedLessons: [], isCompleted: false },
      progress: 0, 
      completedLessons: [] 
    });
  } catch (err) {
    console.error('[Courses/Progress]', err);
    res.status(500).json({ success: false, message: 'Failed to save progress.' });
  }
});

module.exports = router;
